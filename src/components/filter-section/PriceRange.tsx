'use client'

import React,{ useEffect,useState } from 'react';
import { useFilter } from "@/hooks/useSearchFilter";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Popover,PopoverContent,PopoverTrigger } from "../ui/popover";
import { ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDebounce } from '@/hooks';
import { FilterKey } from '@/providers/FilterProvider';

export const PriceRange: React.FC = () => {
	const { minPrice: priceMin,maxPrice: priceMax,setFilter } = useFilter();
	const [localPriceMin,setLocalPriceMin] = useState(priceMin!);
	const [localPriceMax,setLocalPriceMax] = useState(priceMax!);

	const debouncedPriceMax = useDebounce(localPriceMax.toString(),600);
	const debouncedPriceMin = useDebounce(localPriceMin.toString(),600);

	const [isOpen,setIsOpen] = useState(false);

	useEffect(() => {
		if (debouncedPriceMin) {
			setFilter(FilterKey.MinPrice,debouncedPriceMin);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[debouncedPriceMin]);

	useEffect(() => {
		if (debouncedPriceMax) {
			setFilter(FilterKey.MaxPrice,debouncedPriceMax);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[debouncedPriceMax]);

	const handleChange = (key: 'priceMin' | 'priceMax',value: string) => {
		const numericValue = parseFloat(value);
		if (key === 'priceMin' && numericValue > localPriceMax) {
			toast.error("Min price cannot be greater than max price");
			return;
		}
		if (key === 'priceMax' && numericValue < localPriceMin) {
			toast.error("Max price cannot be less than min price");
			return;
		}
		if (key === 'priceMin') {
			setLocalPriceMin(Number(value));
		} else {
			setLocalPriceMax(Number(value));
		}
	};


	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" className="w-[200px] justify-between text-gray-800">
					{"Preis"}
					<ChevronDown className="ml-2" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[300px] p-2">
				<div className="flex flex-row items-center justify-center h-full w-full gap-x-3">
					<div className="flex items-center space-x-2">
						<div className="relative flex-1">
							<Input
								placeholder="von"
								value={localPriceMin}
								onChange={(e) => handleChange('priceMin',e.target.value)}
								className="pr-6"
								type="number"
							/>
							<span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">€</span>
						</div>
					</div>
					<div className="flex items-center space-x-2">
						<div className="relative flex-1">
							<Input
								placeholder="bis"
								value={localPriceMax}
								onChange={(e) => handleChange('priceMax',e.target.value)}
								className="pr-6"
								type="number"
							/>
							<span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">€</span>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};
