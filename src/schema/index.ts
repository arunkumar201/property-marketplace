import * as z from "zod";

export const ZProperty = z.object({
	id: z.string(),
	title: z.string(),
	location: z.string(),
	type: z.string(),
	rooms: z.number(),
	bathrooms: z.number(),
	area: z.number(),
	price: z.number(),
	imageUrl: z.string(),
	views: z.number(),
});

export type TProperty = z.infer<typeof ZProperty>;
