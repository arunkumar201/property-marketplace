import { Property } from "@/models";
import "server-only";

export const getTotalProperties = async () => {
	try {
		const totalProperties = await Property.countDocuments({});
		return totalProperties;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to get total properties");
	}
};
