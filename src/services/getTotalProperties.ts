import { Property } from "@/models";
import { unstable_cache } from "next/cache";
import "server-only";
import { DEFAULT_CACHE_TIME } from ".";

export const getTotalProperties = async () => {
	return unstable_cache(
		async () => {
			try {
				const totalProperties = await Property.countDocuments({});
				return totalProperties;
			} catch (error) {
				console.error(error);
				throw new Error("Failed to get total properties");
			}
		},
		[`getTotalProperties`],
		{
			tags: ["getTotalProperties", "total-properties"],
			revalidate: DEFAULT_CACHE_TIME, // 1 hour
		}
	)();
};
