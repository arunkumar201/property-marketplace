import React from 'react';
import { Card,CardContent,CardFooter,CardHeader,CardTitle } from "@/components/ui/card"
import { Heart,Eye } from 'lucide-react';
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

export const PropertyListingCard: React.FC<IPropertyListingCard> = ({
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
	return (
		<Card className="w-[360px] mx-auto overflow-hidden shadow-lg">
			<CardHeader className="p-0">
				<div className="relative">
					<BlurImage
						url={imageUrl}
						name={title}
					/>
					<HardIcon />
				</div>
			</CardHeader>
			<CardContent className="p-4 w-full">
				<CardTitle className="text-[15px] font-bold mb-2">{title}</CardTitle>
				<p className="text-sm text-gray-800 mb-1">{`ID: ${id} | ${type} | ${location}`}</p>
				<p className="text-sm text-gray-800 ">{`${rooms} Zimmer | ${bathrooms} Bad | ${area}  m²`}</p>
			</CardContent>
			<CardFooter className="bg-inherit p-4 flex justify-between items-center -mt-2">
				<p className="text-[24px] font-bold text-[#31393D]">{formatCurrency('de-DE',price,'EUR')}</p>
				<div className="flex items-center text-[#748790] gap-2 mt-2">
					<span className="text-base">{views}</span>
					<Eye className="h-6 w-6  mr-1" />
				</div>
			</CardFooter>
		</Card>
	);
};
