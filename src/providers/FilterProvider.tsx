/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import React,{ createContext,useEffect,useRef,useTransition } from "react";
import { useQueryState,parseAsFloat,parseAsArrayOf,parseAsString,parseAsInteger } from 'nuqs';

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
	isLoading: boolean;
}

export const FilterContext = createContext<FilterContextType | undefined>(
	undefined
);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const isMounted = useRef(false);
	const [isLoading,startTransition] = useTransition()
	const [location,setLocation] = useQueryState('location',{
		shallow: false,
		startTransition,
	});
	const [type,setType] = useQueryState('type',{
		shallow: false,
		startTransition,

	});
	const [saleType,setSaleType] = useQueryState('saleType',{
		shallow: false,
		startTransition
	});
	const [priceMin,setPriceMin] = useQueryState('priceMin',parseAsFloat.withDefault(10).withOptions({
		shallow: false,
		startTransition
	}));
	const [priceMax,setPriceMax] = useQueryState('priceMax',parseAsFloat.withDefault(Number.MAX_SAFE_INTEGER).withOptions({
		shallow: false,
		startTransition
	}));
	const [areaMin,setAreaMin] = useQueryState('areaMin',parseAsFloat.withDefault(10).withOptions({
		shallow: true,
		startTransition
	}));
	const [areaMax,setAreaMax] = useQueryState('areaMax',parseAsFloat.withDefault(Number.MAX_SAFE_INTEGER).withOptions({
		shallow: false,
		startTransition
	}));
	const [rooms,setRooms] = useQueryState('rooms',parseAsArrayOf(parseAsString,';').withOptions({ shallow: false }));

	const [currentPage,setCurrentPage] = useQueryState("currentPage",parseAsInteger.withDefault(1).withOptions({
		startTransition,
		shallow:false
	}))

	//set the  currentPage to 1 if  other filter change 
	useEffect(() => {
		if (!isMounted.current) {
			isMounted.current = true;
			return;
		}

		if (currentPage !== 1) {
			setCurrentPage(1);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[location,type,saleType,priceMin,priceMax,areaMin,areaMax,rooms]);


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
				console.log(value);
				setPriceMin(Number(value as string));
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
		rooms: rooms,
		currentPage: currentPage ?? 1,
		isLoading
	};

	return (
		<FilterContext.Provider value={{ ...filters,setFilter }}>
			{children}
		</FilterContext.Provider>
	);
};
