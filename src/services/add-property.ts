import { Property } from "@/models";
import { TProperty } from "@/schema";

export async function addProperty(propertyData: TProperty): Promise<TProperty> {
	try {
		const data = await Property.create(propertyData);
		return data;
	} catch (error) {
		console.log(`Failed to add property: ${error}`);
		if (JSON.stringify(error).includes("E11000")) {
			throw new Error("Duplicate property id");
		}

		throw new Error("Failed to add property");
	}
}
