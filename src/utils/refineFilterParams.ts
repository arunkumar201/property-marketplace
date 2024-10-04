import "server-only";

import { IFilterParams } from "@/app/page";

export const refineFilterParams = (params: IFilterParams) => {
	const refinedParams: IFilterParams = {
		location: "",
		type: "Haus",
		priceMin: "100",
		priceMax: "400",
		areaMin: "1",
		areaMax: "2",
		rooms: "3",
		saleType: "BUY",
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
		const rooms = params.rooms.split(",").map((room) => parseInt(room));
		if (rooms.every((room) => !isNaN(room))) {
			refinedParams.rooms = rooms.map((room) => room.toString()).join(",");
		}
	}

	if (params.saleType) {
		refinedParams.saleType = params.saleType.trim().toUpperCase();
	}

	return refinedParams;
};
