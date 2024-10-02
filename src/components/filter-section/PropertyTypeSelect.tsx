import { useFilter } from "@/hooks/useSearchFilter";
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from "../ui/select";
import { PROPERTY_TYPES } from "@/constants";
import { cn } from "@/lib/utils";

export const TypeSelect: React.FC = () => {
	const { type,setFilter } = useFilter();
	return (
		<Select value={type} onValueChange={(value) => setFilter('type',value)}>
			<SelectTrigger>
				<SelectValue placeholder="Typ" />
			</SelectTrigger>
			<SelectContent>
				{PROPERTY_TYPES.map((item,index) => {
					return <SelectItem key={index} value={item} className={cn("",type === item && "bg-[#748790]")} > {item}</SelectItem>
				})}
			</SelectContent>
		</Select >
	);
};

export const PropertyTypeSelect: React.FC = () => {
	const { saleType,setFilter } = useFilter();
	return (
		<Select value={saleType} onValueChange={(value) => setFilter('saleType',value)}>
			<SelectTrigger>
				<SelectValue placeholder="Verkauf oder Wohnung" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem key="BUY" value="BUY" className={cn("",saleType == "BUY" && "bg-[#748790]")}>Kaufen</SelectItem>
				<SelectItem key="SELL" value="SELL" className={cn("",saleType == "SELL" && "bg-[#748790]")}> Verkaufen</SelectItem>
			</SelectContent>
		</Select >
	)
}
