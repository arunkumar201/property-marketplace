'use client'

import { useFilter } from "@/hooks/useSearchFilter";
import { MapPin } from "lucide-react";
import { Input } from "../ui/input";

export const LocationInput: React.FC = () => {
	const { location,setFilter } = useFilter();
	return (
		<div className="relative">
			<MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
			<Input
				placeholder="Bundesland, Ort oder Postleitzahl"
				value={location}
				onChange={(e) => setFilter('location',e.target.value)}
				className="pl-8"
			/>
		</div>
	);
};
