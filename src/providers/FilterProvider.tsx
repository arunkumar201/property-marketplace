/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import React,{ createContext,useEffect,useRef,useTransition } from "react";
import { useQueryState,parseAsFloat,parseAsArrayOf,parseAsString,parseAsInteger } from 'nuqs';
import toast from "react-hot-toast";

export interface FilterContextType {
	location: string | null;
	type: string | null;
	saleType: string | null; // propertyOn means - BUY or SELL
	minPrice: number | null;
	maxPrice: number | null;
	minArea: number | null;
	maxArea: number | null;
	rooms: string[] | null;
	currentPage: number | null;
	setFilter: (key: FilterKey,value: string | string[]) => void;
	isLoading: boolean;
}

export enum FilterKey {
	Location = "location",
	Type = "type",
	SaleType = "saleType",
	MinPrice = "minPrice",
	MaxPrice = "maxPrice",
	MinArea = "minArea",
	MaxArea = "maxArea",
	Rooms = "rooms",
	CurrentPage = "currentPage",
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
	const [minPrice,setPriceMin] = useQueryState('minPrice',parseAsFloat.withDefault(10).withOptions({
		shallow: false,
		startTransition
	}));
	const [maxPrice,setPriceMax] = useQueryState('maxPrice',parseAsFloat.withDefault(Number.MAX_SAFE_INTEGER).withOptions({
		shallow: false,
		startTransition
	}));
	const [minArea,setAreaMin] = useQueryState('minArea',parseAsFloat.withDefault(10).withOptions({
		shallow: false,
		startTransition
	}));
	const [maxArea,setAreaMax] = useQueryState('maxArea',parseAsFloat.withDefault(Number.MAX_SAFE_INTEGER).withOptions({
		shallow: false,
		startTransition
	}));
	const [rooms,setRooms] = useQueryState('rooms',parseAsArrayOf(parseAsString,';').withOptions({ shallow: false }));

	const [currentPage,setCurrentPage] = useQueryState("currentPage",parseAsInteger.withDefault(1).withOptions({
		startTransition,
		shallow: false,
		scroll: true,
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
	},[location,type,saleType,minPrice,maxPrice,minArea,maxArea,rooms]);


	const setFilter = (key: FilterKey,value: string | string[]) => {
		switch (key) {
			case FilterKey.Location:
				setLocation(value as string);
				break;
			case FilterKey.Type:
				setType(value as string);
				break;
			case FilterKey.SaleType:
				setSaleType(value as string);
				break;
			case FilterKey.MinPrice:
				console.log(value);
				setPriceMin(Number(value as string));
				break;
			case FilterKey.MaxPrice:
				setPriceMax(Number(value));
				break;
			case FilterKey.MinArea:
				setAreaMin(Number(value));
				break;
			case FilterKey.MaxArea:
				setAreaMax(Number(value));
				break;
			case FilterKey.Rooms:
				setRooms(Array.isArray(value) ? value : value.split(','));
				break;
			case FilterKey.CurrentPage:
				setCurrentPage(Number(value));
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		// update query state when filters change
		let id: string | undefined;
		let timeoutId: string | number | NodeJS.Timeout | undefined;
		if (isLoading && isMounted.current) {
			id = toast.loading("Fetching properties...",{
				style: {
					backgroundColor: "#112D4E",
					color: "#F9F7F7",
					borderRadius: "9px",
					padding: "10px",
					fontSize: "14px",
					border: "3px solid #DBE2EF",
					zIndex: 99999999
				}
			});
		} else {
			timeoutId = setTimeout(() => {
				toast.remove(id);
			},400)
		}
		return () => clearTimeout(timeoutId);
	},[isLoading])


	const filters = {
		location,
		type,
		saleType,
		minPrice,
		maxPrice,
		minArea,
		maxArea,
		rooms: rooms,
		currentPage: currentPage ?? 1,
		isLoading,
		setFilter
	};

	return (
		<FilterContext.Provider value={filters}>
			{children}
		</FilterContext.Provider>
	);
};
