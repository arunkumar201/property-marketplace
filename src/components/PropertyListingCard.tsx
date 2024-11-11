import React from 'react';
import { Card,CardContent,CardFooter,CardHeader,CardTitle } from "@/components/ui/card"
import { Eye } from 'lucide-react';
import { formatCurrency } from '@/utils';
import { BlurImage } from './BlurImage';
import { HardIcon } from './HardIcon';

export interface IPropertyListingCard {
	id: string;
	title: string;
	location: string;
	type: string;
	rooms: number;
	bathrooms: number;
	area: number;
	price: number;
	imageUrl: string;
	views: number;
}

export const PropertyListingCard: React.FC<IPropertyListingCard> = async ({
	id,
	title,
	location,
	type,
	rooms,
	bathrooms,
	area,
	price,
	imageUrl,
	views
}) => {
	// await new Promise(r => setTimeout(r,5));
	return (
		<Card className="md:max-w-[360px] w-full mx-auto overflow-hidden shadow-lg h-[430px] flex-1">
			<CardHeader className="p-0">
				<div className="relative">
					<BlurImage
						url={imageUrl}
						name={title}
					/>
					<HardIcon />
				</div>
			</CardHeader>
			<CardContent className="p-4 w-full max-h-[8rem] overflow-auto">
				<CardTitle className="text-[15px] font-bold mb-2">{title}</CardTitle>
				<p className="text-sm text-gray-800 mb-1">{`ID: ${id} | ${type} | ${location}`}</p>
				<p className="text-sm text-gray-800 ">{`${rooms} Zimmer | ${bathrooms} Bad | ${area}  m²`}</p>
			</CardContent>
			<CardFooter className="bg-inherit p-4 flex justify-between items-center -mb-1">
				<p className="text-sm lg:text-[20px] font-bold text-[#31393D]">{formatCurrency('de-DE',price,'EUR')}</p>
				<div className="flex items-center text-[#748790] gap-2">
					<span className="text-sm md:text-[20px]">{views}</span>
					<Eye className="h-6 w-6  mr-1" />
				</div>
			</CardFooter>
		</Card>
	);
};
