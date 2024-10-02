// Importing mongoose library along with Connection type from it
import { env } from "@/env";
import mongoose, { Connection } from "mongoose";

// variable to store the cached database connection
let cachedConnection: Connection | null = null;

export async function dbConnect() {
	if (cachedConnection) {
		console.log("Using cached mongodb connection");
		return cachedConnection;
	}

	try {
		const cnx = await mongoose.connect(env.MONGODB_URI);
		cachedConnection = cnx.connection;
		console.log("New mongodb connection established");
		return cachedConnection;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
