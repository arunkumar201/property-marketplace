/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React,{ useEffect,useState } from 'react';
import { useFilter } from "@/hooks/useSearchFilter";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Popover,PopoverContent,PopoverTrigger } from "../ui/popover";
import { ChevronDown } from 'lucide-react';
import { useDebounce } from '@/hooks';

export const AreaRange: React.FC = () => {
	const { areaMin,areaMax,setFilter } = useFilter();
	const [localAreaMin,setLocalAreaMin] = useState(areaMin);
	const [localAreaMax,setLocalAreaMax] = useState(areaMax);

	const debouncedAreaMax = useDebounce(localAreaMax,600);
	const debouncedAreaMin = useDebounce(localAreaMin,600);

	const [isOpen,setIsOpen] = useState(false);

	useEffect(() => {
		if (debouncedAreaMin) {
			setFilter('areaMin',debouncedAreaMin);
		}
	},[debouncedAreaMin]);

	useEffect(() => {
		if (debouncedAreaMax) {
			setFilter("areaMax",debouncedAreaMax);
		}
	},[debouncedAreaMax]);

	const handleChange = (key: 'areaMin' | 'areaMax',value: string) => {
		const numericValue = parseFloat(value);
		if (key === 'areaMin' && numericValue > parseFloat(localAreaMax)) {
			alert("Min area cannot be greater than max area");
			return;
		}
		if (key === 'areaMax' && numericValue < parseFloat(localAreaMin)) {
			alert("Max area cannot be less than min area");
			return;
		}
		if (key === 'areaMin') {
			setLocalAreaMin(value);
		} else {
			setLocalAreaMax(value);
		}
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" className="w-[200px] justify-between">
					{"Fläche"}
					<ChevronDown className="ml-2" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[300px] p-2">
				<div className="flex flex-row items-center justify-center h-full w-full gap-x-3">
					<div className="flex items-center justify-center gap-2">
						<div className="relative flex-1">
							<Input
								placeholder="Min"
								value={localAreaMin}
								onChange={(e) => handleChange('areaMin',e.target.value)}
								className="pr-7"
								type="number"
							/>
							<span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400">m²</span>
						</div>
					</div>
					<div className="flex items-center justify-center gap-2">
						<div className="relative flex-1">
							<Input
								placeholder="Max"
								value={localAreaMax}
								onChange={(e) => handleChange('areaMax',e.target.value)}
								className="pr-7"
								type="number"
							/>
							<span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400">m²</span>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};
