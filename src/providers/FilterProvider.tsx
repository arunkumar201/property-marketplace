'use client'

import React,{ createContext,useState } from "react";

export interface FilterContextType {
	location: string;
	type: string;
	saleType: string; // propertyOn means - BUY or SELL 
	priceMin: string;
	priceMax: string;
	areaMin: string;
	areaMax: string;
	rooms: string[];
	setFilter: (key: string,value: string | string[]) => void;
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [filters,setFilters] = useState({
		location: "",
		type: "Haus",
		priceMin: "100",
		priceMax: "400",
		areaMin: "1",
		areaMax: "2",
		rooms: ["3"],
		saleType: "BUY",
	});

	const setFilter = (key: string,value: string | string[]) => {
		setFilters((prev) => ({ ...prev,[key]: value }));
	};

	return (
		<FilterContext.Provider value={{ ...filters,setFilter }}>
			{children}
		</FilterContext.Provider>
	);
};
