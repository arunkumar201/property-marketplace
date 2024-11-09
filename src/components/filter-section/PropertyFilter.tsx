import { LocationInput } from "./LocationInput";
import { PropertyTypeSelect,TypeSelect } from "./PropertyTypeSelect";
import { PriceRange } from "./PriceRange";
import { AreaRange } from "./AreaRange";
import { RoomsSelect } from "./RoomsSelect";
import { ApplyFilterButton } from "../ApplyFilterButton";

export const PropertyFilter: React.FC = () => {

	return (
		<div className="flex bg-white rounded-lg w-full gap-4 h-fit md:mt-2 mt-[12rem] flex-wrap mb-8 p-4 md:p-2 ">
			<div className="md:w-[28%] sm:w-full w-[70%]">
				<LocationInput />
			</div>
			<div className="md:w-[70%] w-full flex gap-3  md:flex-nowrap flex-wrap">
				<PropertyTypeSelect />
				<TypeSelect />
				<PriceRange />
				<AreaRange />
				<RoomsSelect />
				<ApplyFilterButton />
			</div>
		</div>
	);
};
