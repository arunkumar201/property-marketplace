'use client'

import React,{ useState,useEffect } from 'react';
import { useFilter } from "@/hooks/useSearchFilter";
import { MapPin } from "lucide-react";
import { useDebounce } from '@/hooks';
import { getSupportedLocationsAction } from '@/actions';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';
import { FilterKey } from '@/providers/FilterProvider';

export const LocationInput: React.FC = () => {
	const { location,setFilter } = useFilter();
	const [loading,setIsLoading] = useState(true);
	const [search,setSearch] = useState(location || null);

	const isUserInputRef = React.useRef(true);

	const [locations,setLocations] = useState<string[]>([]);
	const debouncedSearch = useDebounce(search!,300);
	const [isDropdownOpen,setIsDropdownOpen] = useState(false);

	useEffect(() => {
		const fetchLocations = async () => {
			setIsLoading(true);
			try {
				const fetchedLocations = await getSupportedLocationsAction(debouncedSearch);
				setLocations(fetchedLocations);
			} catch (error) {
				console.error('Failed to fetch locations:',error);
			} finally {
				setIsLoading(false);
			}
		};

		if (debouncedSearch?.trim() && isUserInputRef.current) {
			fetchLocations().then(() => {
				setIsDropdownOpen(true);
			});
		} else {
			setLocations([]);
			setIsDropdownOpen(false);
		}
		isUserInputRef.current = false;

	},[debouncedSearch]);

	useEffect(() => {
		if (debouncedSearch?.trim().length === 0) {
			setFilter(FilterKey.Location,"")
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[debouncedSearch])

	const handleSelect = (value: string) => {
		isUserInputRef.current = false;
		setSearch(value);
		setFilter(FilterKey.CurrentPage,value);
		setIsDropdownOpen(false);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsLoading(true);
		setSearch(e.target.value);
		isUserInputRef.current = true;
		if (!isDropdownOpen) {
			setIsDropdownOpen(true);
		}
	};

	return (
		<div className="relative">
			<div className="w-full px-3 py-[0.28rem] border rounded flex items-center">
				<MapPin className="mr-2 h-4 w-4 shrink-0 text-gray-400" />
				<input
					type="text"
					className="relative flex-1 outline-none bg-transparent w-full"
					placeholder="Bundesland, Ort oder Postleitzahl"
					value={search ?? ""}
					onChange={handleInputChange}
				/>
			</div>
			{isDropdownOpen && (
				<ul className="absolute z-10  bg-white border rounded shadow-lg mt-1 w-full">
					<ScrollArea className='max-h-30 relative overflow-scroll'>
						{locations.length > 0 ? (
							locations.map((loc) => (
								<li
									key={loc}
									className={cn("cursor-pointer px-3 py-2 hover:bg-[#748790]/60")}
									onClick={() => handleSelect(loc)} // Handle selection and close
								>
									{loc}
								</li>
							))
						) : (
							<li className="px-3 py-2">
								{loading ? "loading..." : "No locations found"}
							</li>
						)}
					</ScrollArea>
				</ul>
			)}
		</div>
	);
};
