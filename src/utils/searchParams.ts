import {
	createSearchParamsCache,
	parseAsArrayOf,
	parseAsInteger,
	parseAsString,
} from "nuqs/server";

export const searchParamsCache = createSearchParamsCache({
	rooms: parseAsArrayOf(parseAsString, ";"),
	currentPage: parseAsInteger.withDefault(1),
	minPrice: parseAsInteger.withDefault(0),
	maxPrice: parseAsInteger.withDefault(Number.MAX_SAFE_INTEGER),
	minArea: parseAsInteger.withDefault(0),
	maxArea: parseAsInteger.withDefault(Number.MAX_SAFE_INTEGER),
	location: parseAsString,
	type: parseAsString,
	saleType: parseAsString,
});
