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
		rooms: selectedRooms.includes("6+") ? { $gte: 6 } : { $in: finiteRooms },
	});
	console.log("parsedParams in buildFilterConditions", parsedParams);
	filterConditions.push({
		price: {
			$gte: parsedParams.minPrice,
			$lte: parsedParams.maxPrice,
		},
	});
	if (parsedParams.saleType) {
		filterConditions.push({ saleType: parsedParams.saleType });
	}
	
	filterConditions.push({
		area: {
			$gte: parsedParams.minArea,
			$lte: parsedParams.maxArea,
		},
	});

	return filterConditions;
};
