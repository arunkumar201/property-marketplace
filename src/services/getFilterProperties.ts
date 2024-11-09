import "server-only";
import { unstable_cache } from "next/cache";
import { Property } from "@/models";
import { ITEM_PER_PAGE, ROOM_OPTIONS } from "@/constants";
import { DEFAULT_CACHE_TIME } from ".";
import { searchParamsCache } from "@/utils/searchParams";

interface IGetFilterProperties {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	params: Record<string, any>;
}

export const getFilterProperties = async ({ params }: IGetFilterProperties) => {
	console.log("Received params service:", params);
	const parsedParams = searchParamsCache.parse(params);

	const itemsPerPage = ITEM_PER_PAGE;

	return unstable_cache(
		async () => {
			try {
				const selectedRooms =
					parsedParams.rooms && parsedParams.rooms.length === 0
						? ROOM_OPTIONS
						: parsedParams.rooms;
				const hasSixPlus = selectedRooms && selectedRooms.includes("6+");
				const finiteRooms = hasSixPlus
					? []
					: selectedRooms &&
					  selectedRooms
							.map((room: string) => parseInt(room, 10))
							.filter(Number.isFinite);

				const filterConditions: Record<string, unknown>[] = [];
				const escapeRegex = (string: string) =>
					string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

				if (parsedParams.location) {
					filterConditions.push({
						location: new RegExp(escapeRegex(parsedParams.location), "i"),
					});
				}
				if (parsedParams.type) {
					filterConditions.push({
						type: new RegExp(escapeRegex(parsedParams.type), "i"),
					});
				}
				filterConditions.push({
					rooms: hasSixPlus ? { $gte: 6 } : { $in: finiteRooms },
				});
				filterConditions.push({
					price: {
						$gte: parsedParams.minPrice,
						$lte: parsedParams.maxPrice,
					},
				});
				filterConditions.push({ saleType: parsedParams.saleType });
				filterConditions.push({
					area: {
						$gte: parsedParams.minArea,
						$lte: parsedParams.maxArea,
					},
				});

				const query =
					filterConditions.length > 0 ? { $and: filterConditions } : {};

				const totalCount = await Property.countDocuments(query);
				const skip = (parsedParams.currentPage - 1) * itemsPerPage;
				const properties = await Property.find(query)
					.skip(skip)
					.sort({ price: 1, area: 1 })
					.limit(itemsPerPage)
					.lean();

				console.log("Retrieved properties count:", properties.length);
				const totalPages = Math.ceil(totalCount / itemsPerPage);

				return {
					properties,
					totalCount,
					currentPage: parsedParams.currentPage,
					totalPages,
					itemsPerPage,
				};
			} catch (err) {
				console.error("Error in getFilterProperties:", err);
				throw new Error("Failed to get filtered properties");
			}
		},
		[`getFilterProperties-${JSON.stringify(parsedParams)}`],
		{
			tags: [`property-${JSON.stringify(parsedParams)}`, "get-properties"],
			revalidate: DEFAULT_CACHE_TIME,
		}
	)();
};
