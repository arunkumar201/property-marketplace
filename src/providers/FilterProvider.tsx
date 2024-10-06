'use client'

import { ROOM_OPTIONS } from "@/constants";
import useThrottled from "@/hooks/useThrottle";
import { useRouter,useSearchParams } from "next/navigation";
import React,{ createContext,useEffect,useState } from "react";

export interface FilterContextType {
	location: string;
	type: string;
	saleType: string; // propertyOn means - BUY or SELL 
	priceMin: string;
	priceMax: string;
	areaMin: string;
	areaMax: string;
	rooms: string[];
	currentPage: string;
	setFilter: (key: string,value: string | string[]) => void;
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const searchParams = useSearchParams();
	const router = useRouter();


	const [filters,setFilters] = useState({
		location: searchParams.get('location') ?? "",
		type: searchParams.get('type') ?? "Haus",
		saleType: searchParams.get('saleType') ?? "BUY",
		priceMin: searchParams.get('priceMin') ?? "10",
		priceMax: searchParams.get('priceMax') ?? "4000000",
		areaMin: searchParams.get('areaMin') ?? "10",
		areaMax: searchParams.get('areaMax') ?? "2000000",
		rooms: searchParams.get('rooms')?.split(',') ?? ROOM_OPTIONS,
		currentPage: searchParams.get('currentPage') ?? "1",
	});

	const setFilter = (key: string,value: string | string[]) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			[key]: value,
		}));
	};

	const applyFilters = useThrottled(() => {
		const params = new URLSearchParams();

		if (filters.location || filters.location === "") params.set('location',filters.location);
		if (filters.type) params.set('type',filters.type);
		if (filters.saleType) params.set('saleType',filters.saleType);
		if (filters.priceMin) params.set('priceMin',filters.priceMin);
		if (filters.priceMax) params.set('priceMax',filters.priceMax);
		if (filters.areaMin) params.set('areaMin',filters.areaMin);
		if (filters.areaMax) params.set('areaMax',filters.areaMax);
		if (filters.rooms) params.set('rooms',filters.rooms.join(','));
		if (filters.currentPage) params.set('currentPage',filters.currentPage);

		router.push(`?${params.toString()}`);
	},1000);

	useEffect(() => {
		applyFilters();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[filters]);

	useEffect(() => {
		const newFilters = {
			location: searchParams.get('location') ?? "",
			type: searchParams.get('type') ?? "Haus",
			saleType: searchParams.get('saleType') ?? "SELL",
			priceMin: searchParams.get('priceMin') ?? "100",
			priceMax: searchParams.get('priceMax') ?? "40000000",
			areaMin: searchParams.get('areaMin') ?? "10",
			areaMax: searchParams.get('areaMax') ?? "20000000",
			rooms: searchParams.get('rooms')?.split(',') ?? ROOM_OPTIONS,
			currentPage: searchParams.get('currentPage') ?? "1",
		};

		setFilters(newFilters);
	},[searchParams]);

	return (
		<FilterContext.Provider value={{ ...filters,setFilter }}>
			{children}
		</FilterContext.Provider>
	);
};
