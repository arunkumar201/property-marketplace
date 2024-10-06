import "server-only";

import { Property } from "@/models";

export const getPropertyLocations = async (searchTerm: string) => {
	try {
		const locations = await Property.distinct("location", {
			location: { $regex: searchTerm, $options: "i" },
		}).lean();
		return locations.slice(0, 10);
	} catch (error) {
		console.error("Error fetching property locations", error);
		return [];
	}
};
