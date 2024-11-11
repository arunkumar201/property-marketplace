import "server-only";

import { ROOM_OPTIONS } from "@/constants";

const escapeRegex = (string: string) =>
	string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getSelectedRooms = (rooms: string[] | undefined) => {
	if (!rooms || rooms.length === 0) {
		return ROOM_OPTIONS;
	}
	return rooms;
};

const getFiniteRooms = (selectedRooms: string[]) => {
	const hasSixPlus = selectedRooms.includes("6+");
	if (hasSixPlus) {
		return [];
	}
	return selectedRooms
		.map((room: string) => parseInt(room, 10))
		.filter(Number.isFinite);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const buildFilterConditions = (parsedParams: Record<string, any>) => {
	const selectedRooms = getSelectedRooms(parsedParams.rooms);
	const finiteRooms = getFiniteRooms(selectedRooms);

	const filterConditions: Record<string, unknown>[] = [];

	if (parsedParams.location && typeof parsedParams.location === "string") {
		filterConditions.push({
			location: new RegExp(escapeRegex(parsedParams.location), "i"),
		});
	}
	if (parsedParams.type && typeof parsedParams.type === "string") {
		filterConditions.push({
			type: new RegExp(escapeRegex(parsedParams.type), "i"),
		});
	}
	filterConditions.push({
		rooms: selectedRooms.includes("6+") ? { $gte: 6 } : { $in: finiteRooms },
	});

	const minPrice = parseFloat(parsedParams.minPrice);
	const maxPrice = parseFloat(parsedParams.maxPrice);
	filterConditions.push({
		price: {
			$gte: !isNaN(minPrice) ? minPrice : 0,
			$lte: !isNaN(maxPrice) ? maxPrice : Number.MAX_SAFE_INTEGER,
		},
	});

	if (parsedParams.saleType && typeof parsedParams.saleType === "string") {
		filterConditions.push({
			saleType: parsedParams.saleType.trim().toUpperCase(),
		});
	}

	const minArea = parseFloat(parsedParams.minArea);
	const maxArea = parseFloat(parsedParams.maxArea);
	filterConditions.push({
		area: {
			$gte: !isNaN(minArea) ? minArea : 0,
			$lte: !isNaN(maxArea) ? maxArea : Number.MAX_SAFE_INTEGER,
		},
	});

	return filterConditions;
};
