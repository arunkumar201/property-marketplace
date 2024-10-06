/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import "server-only";
import { IFilterParams } from "@/app/page";
import { unstable_cache } from "next/cache";
import { Property } from "@/models";
import { ITEM_PER_PAGE, ROOM_OPTIONS } from "@/constants";

interface IGetFilterProperties {
	params: IFilterParams;
}

export const getFilterProperties = async ({ params }: IGetFilterProperties) => {
	console.log("Received params service:", params);
	const itemsPerPage = ITEM_PER_PAGE;

	return unstable_cache(
		async () => {
			try {
				if (!params.rooms || params.rooms.length === 0) {
					params.rooms = ROOM_OPTIONS;
				}

				const {
					location = "",
					type,
					priceMin = "100",
					priceMax = String(Number.MAX_SAFE_INTEGER),
					areaMin = "10",
					areaMax = String(Number.MAX_SAFE_INTEGER),
					rooms = ROOM_OPTIONS,
					saleType = "BUY",
					currentPage = "1",
				} = params;

				const selectedRooms = Array.isArray(rooms)
					? rooms
					: rooms.split(",").map((room) => room.trim());
				const hasSixPlus = selectedRooms.includes("6+");
				const finiteRooms = hasSixPlus
					? []
					: selectedRooms
							.map((room) => parseInt(room, 10))
							.filter(Number.isFinite);

				const filterConditions: Record<string, any>[] = [];

				const locationFilter =
					location && location.length > 0 ? new RegExp(location, "i") : null;

				if (locationFilter && locationFilter.source !== "") {
					filterConditions.push({ location: locationFilter });
				}
				if (type) {
					filterConditions.push({ type: new RegExp(type, "i") });
				}
				filterConditions.push({
					rooms: hasSixPlus ? { $gte: 6 } : { $in: finiteRooms },
				});
				filterConditions.push({
					price: {
						$gte: parseInt(priceMin),
						$lte: parseInt(priceMax) || Number.MAX_SAFE_INTEGER,
					},
				});
				filterConditions.push({ saleType: { $eq: saleType } });
				filterConditions.push({
					area: {
						$gte: parseFloat(areaMin),
						$lte: parseFloat(areaMax) || Number.MAX_SAFE_INTEGER,
					},
				});

				const query =
					filterConditions.length > 0 ? { $and: filterConditions } : {};

				const totalCount = await Property.countDocuments(query);
				const skip = (parseInt(currentPage) - 1) * itemsPerPage;
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
					currentPage: parseInt(currentPage),
					totalPages,
					itemsPerPage,
				};
			} catch (err) {
				console.error("Error in getFilterProperties:", err);
				throw new Error("Failed to get filtered properties");
			}
		},
		[`getFilterProperties-${JSON.stringify(params)}`],
		{
			tags: [`property-${JSON.stringify(params)}`],
			revalidate: 1,
		}
	)();
};
