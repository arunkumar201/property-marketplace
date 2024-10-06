import { TProperty } from "@/schema";
import mongoose, { Model, Schema } from "mongoose";

export type IPropertyModel = TProperty & Document;

const propertySchema = new Schema<IPropertyModel>({
	id: { type: String, required: true, unique: true },
	title: { type: String, required: true },
	location: { type: String, required: true },
	type: { type: String, required: true },
	rooms: { type: Number, required: true },
	bathrooms: { type: Number, required: true },
	area: { type: Number, required: true },
	price: { type: Number, required: true },
	imageUrl: { type: String, required: true },
	views: { type: Number, required: true },
	saleType: { type: String, default: "BUY" },
});

propertySchema.index({
	location: "text",
	type: "text",
	rooms: 1,
	area: 1,
	price: 1,
});


const PropertyModel: Model<IPropertyModel> =
	mongoose.models.Property ??
	mongoose.model<IPropertyModel>("Property", propertySchema);

export { PropertyModel as Property };
