import "server-only";

import { IFilterParams } from "@/app/page";
import { ROOM_OPTIONS } from "@/constants";

export const getRefineFilterParams = (params: IFilterParams) => {
	const refinedParams: IFilterParams = {
		location: "",
		type: "Haus",
		priceMin: "100",
		priceMax: "400000000",
		areaMin: "1",
		areaMax: "200000",
		rooms: ROOM_OPTIONS,
		saleType: "BUY",
		currentPage: "1",
	};

	if (params.location) {
		refinedParams.location = params?.location?.trim();
	}

	if (params.type) {
		refinedParams.type = params?.type?.trim();
	}

	if (params.priceMin) {
		const minPrice = parseFloat(params?.priceMin);
		if (!isNaN(minPrice)) {
			refinedParams.priceMin = minPrice?.toString();
		}
	}

	if (params.priceMax) {
		const maxPrice = parseFloat(params?.priceMax);
		if (!isNaN(maxPrice)) {
			refinedParams.priceMax = maxPrice.toString();
		}
	}

	if (params.areaMin) {
		const minArea = parseFloat(params.areaMin);
		if (!isNaN(minArea)) {
			refinedParams.areaMin = minArea.toString();
		}
	}

	if (params.areaMax) {
		const maxArea = parseFloat(params.areaMax);
		if (!isNaN(maxArea)) {
			refinedParams.areaMax = maxArea.toString();
		}
	}

	if (params.rooms) {
		const rooms =
			typeof params.rooms === "string"
				? params.rooms.split(",").map((room) => room)
				: Array.isArray(params.rooms)
				? params.rooms.map((room) => room)
				: [];
		refinedParams.rooms = rooms;
	}

	if (params.saleType) {
		refinedParams.saleType = params.saleType.trim().toUpperCase();
	}
	if (params.currentPage) {
		const currentPage = parseInt(params.currentPage);
		if (!isNaN(currentPage) && currentPage > 0) {
			refinedParams.currentPage = currentPage.toString();
		}
	}

	return refinedParams;
};
