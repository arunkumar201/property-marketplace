import { dbConnect } from "./lib/db";

//this function will be called when the server starts - only once
export async function register() {
	await dbConnect();
}
