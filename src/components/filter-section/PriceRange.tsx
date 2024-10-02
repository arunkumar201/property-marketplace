'use client'

import React,{ useState } from 'react';
import { useFilter } from "@/hooks/useSearchFilter";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Popover,PopoverContent,PopoverTrigger } from "../ui/popover";
import { ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

export const PriceRange: React.FC = () => {
	const { priceMin,priceMax,setFilter } = useFilter();
	const [isOpen,setIsOpen] = useState(false);

	const handleChange = (key: 'priceMin' | 'priceMax',value: string) => {
		const numericValue = parseFloat(value);
		if (key === 'priceMin' && numericValue > parseFloat(priceMax)) {
			toast.error("Min price cannot be greater than max price");
			return;
		}
		if (key === 'priceMax' && numericValue < parseFloat(priceMin)) {
			toast.error("Max price cannot be less than min price");
			return;
		}
		setFilter(key,value);
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
								value={priceMin}
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
								value={priceMax}
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
