/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import React,{ createContext } from "react";
import { useQueryState,parseAsFloat,parseAsArrayOf,parseAsString } from 'nuqs';

export interface FilterContextType {
	location: string | null;
	type: string | null;
	saleType: string | null; // propertyOn means - BUY or SELL
	priceMin: number | null;
	priceMax: number | null;
	areaMin: number | null;
	areaMax: number | null;
	rooms: string[] | null;
	currentPage: number | null;
	setFilter: (key: string,value: string | string[]) => void;
}

export const FilterContext = createContext<FilterContextType | undefined>(
	undefined
);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [location,setLocation] = useQueryState('location',{
		shallow: false
	});
	const [type,setType] = useQueryState('type',{
		shallow: false
	});
	const [saleType,setSaleType] = useQueryState('saleType',{
		shallow:false
	});
	const [priceMin,setPriceMin] = useQueryState('priceMin',parseAsFloat.withDefault(10),);
	const [priceMax,setPriceMax] = useQueryState('priceMax',parseAsFloat.withDefault(Number.MAX_SAFE_INTEGER));
	const [areaMin,setAreaMin] = useQueryState('areaMin',parseAsFloat.withDefault(10));
	const [areaMax,setAreaMax] = useQueryState('areaMax',parseAsFloat.withDefault(Number.MAX_SAFE_INTEGER));
	const [rooms,setRooms] = useQueryState('rooms',parseAsArrayOf(parseAsString,';'));
	const [currentPage,setCurrentPage] = useQueryState('currentPage',parseAsFloat.withDefault(1));

	const setFilter = (key: string,value: string | string[]) => {
		switch (key) {
			case 'location':
				setLocation(value as string);
				break;
			case 'type':
				setType(value as string);
				break;
			case 'saleType':
				setSaleType(value as string);
				break;
			case 'priceMin':
				setPriceMin(Number(value));
				break;
			case 'priceMax':
				setPriceMax(Number(value));
				break;
			case 'areaMin':
				setAreaMin(Number(value));
				break;
			case 'areaMax':
				setAreaMax(Number(value));
				break;
			case 'rooms':
				setRooms(Array.isArray(value) ? value : value.split(','));
				break;
			case 'currentPage':
				setCurrentPage(Number(value));
				break;
			default:
				break;
		}
	};

	const filters = {
		location,
		type,
		saleType,
		priceMin,
		priceMax,
		areaMin,
		areaMax,
		rooms,
		currentPage,
	};

	return (
		<FilterContext.Provider value={{ ...filters,setFilter }}>
			{children}
		</FilterContext.Provider>
	);
};
