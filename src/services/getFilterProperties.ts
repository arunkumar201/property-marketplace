import "server-only";
import { unstable_cache } from "next/cache";
import { Property } from "@/models";
import { ITEM_PER_PAGE } from "@/constants";
import { DEFAULT_CACHE_TIME } from ".";
import { searchParamsCache } from "@/utils/searchParams";
import { buildFilterConditions } from "@/utils/buildFilterConditionsForProperty";

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
				const filterConditions = buildFilterConditions(parsedParams);
				console.log("filterConditions", filterConditions);
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
