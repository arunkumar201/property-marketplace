'use client'

import { useFilter } from "@/hooks/useSearchFilter";
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from "../ui/select";
import { PROPERTY_TYPES } from "@/constants";
import { cn } from "@/lib/utils";
import { FilterKey } from "@/providers/FilterProvider";

export const TypeSelect: React.FC = () => {
	const { type,setFilter } = useFilter();
	return (
		<Select value={type ?? "Haus"} onValueChange={(value) => setFilter(FilterKey.Type,value)} >
			<SelectTrigger>
				<SelectValue placeholder="Typ" aria-label="Property Type" />
			</SelectTrigger>
			<SelectContent>
				{PROPERTY_TYPES.map((item,index) => {
					return <SelectItem
						aria-label={`property ${item} selected`}
						key={index} value={item} className={cn("mb-1",type === item && "bg-[#748790]")} > {item}</SelectItem>
				})}
			</SelectContent>
		</Select >
	);
};

export const PropertyTypeSelect: React.FC = () => {
	const { saleType,setFilter } = useFilter();
	return (
		<Select value={saleType ?? "BUY"
		} onValueChange={(value) => setFilter(FilterKey.SaleType,value)}>
			<SelectTrigger>
				<SelectValue placeholder="Verkauf oder Wohnung" aria-label="Sale Type" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem key="BUY" value="BUY" className={cn("mb-1",saleType == "BUY" && "bg-[#748790]")} aria-label="Buy">Kaufen</SelectItem>
				<SelectItem key="SELL" value="SELL" className={cn("mb-1",saleType == "SELL" && "bg-[#748790]")} aria-label="Sell"> Verkaufen</SelectItem>
			</SelectContent>
		</Select >
	)
}
