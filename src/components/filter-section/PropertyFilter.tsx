'use client'

import { useFilter } from "@/hooks/useSearchFilter";
import { useRouter,useSearchParams } from "next/navigation";
import { LocationInput } from "./LocationInput";
import { PropertyTypeSelect,TypeSelect } from "./PropertyTypeSelect";
import { PriceRange } from "./PriceRange";
import { AreaRange } from "./AreaRange";
import { RoomsSelect } from "./RoomsSelect";
import iconPro from "@/../public/IconlyPro.png"
import Image from "next/image";
export const PropertyFilter: React.FC = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { location,type,priceMin,priceMax,areaMin,areaMax,rooms } = useFilter();

	const applyFilters = () => {
		const params = new URLSearchParams(searchParams.toString());

		if (location) params.set('location',location);
		if (type) params.set('type',type);
		if (priceMin) params.set('priceMin',priceMin);
		if (priceMax) params.set('priceMax',priceMax);
		if (areaMin) params.set('areaMin',areaMin);
		if (areaMax) params.set('areaMax',areaMax);
		if (rooms) params.set('rooms',rooms.toString());

		router.push(`?${params.toString()}`);
	};

	return (
		<div className="flex bg-white rounded-lg w-full gap-4 h-fit md:mt-2 mt-[12rem] flex-wrap mb-8 p-4 md:p-2 ">
			<div className="md:w-[28%] sm:w-full w-[70%]">
				<LocationInput />
			</div>
			<div className="md:w-[70%] w-full flex gap-3  md:flex-nowrap flex-wrap">
				<PropertyTypeSelect />
				<TypeSelect />
				<PriceRange />
				<AreaRange />
				<RoomsSelect />
				<div
					onClick={applyFilters}
					className="flex items-center justify-center gap-2 cursor-pointer border-2 p-2 rounded-lg hover:bg-gray-400 hover:border-gray-300"
				>
					<Image
						src={iconPro}
						alt="icon-prop"
						width={60}
						height={50}
						className="text-gray-50 w-4 h-4 lg:w-10 lg:h-4"
					/>
				</div>
			</div>
		</div>
	);
};
