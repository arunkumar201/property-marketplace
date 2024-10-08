import { ZProperty } from "@/schema";
import { addProperty } from "@/services";
import { validateInputs } from "@/utils/validate";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const data = await request.json();

	try {
		validateInputs([data, ZProperty]);
		const property = await addProperty(data);
		//revalidat the cache after adding a new property
		revalidateTag("total-properties");
		return NextResponse.json(
			{
				success: true,
				message: "Data Saves successfully",
				data: property,
			},
			{
				status: 200,
			}
		);
	} catch (err: unknown) {
		return NextResponse.json(
			{
				success: false,
				error: err instanceof Error ? err.message : "Failed to process data",
			},
			{
				status: 500,
			}
		);
	}
}
