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
		<div className="flex bg-white rounded-lg w-full gap-2 p-2 h-fit -mb-3">
			<div className="w-[30%]">
				<LocationInput />
			</div>
			<div className="w-[70%] flex gap-2">
				<PropertyTypeSelect />
				<TypeSelect />
				<PriceRange />
				<AreaRange />
				<RoomsSelect />
				<div onClick={applyFilters} className="flex items-center justify-center gap-2 cursor-pointer border-2 p-2 rounded-lg hover:bg-gray-400 hover:border-gray-300">
					<Image
						src={iconPro}
						alt="icon-prop"
						width={60}
						height={60}
						className="text-gray-50"
					/>
				</div>
			</div>
		</div>
	);
};
