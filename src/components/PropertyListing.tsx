import React,{ Suspense } from 'react';
import { IPropertyListingCard,PropertyListingCard } from "./PropertyListingCard";
import Pagination from './Pagination';
import { PropertyFilter } from './filter-section/PropertyFilter';
import { FilterProvider } from '@/providers/FilterProvider';

export interface IPropertyListing {
	propertyList: IPropertyListingCard[];
	totalPages: number;
}

export const PropertyListing: React.FC<IPropertyListing> = ({ propertyList,totalPages }) => {
	return (
		<>
			<Suspense fallback={"loading..."}>
				<FilterProvider>
					<PropertyFilter />
					<div className="h-full w-full grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-x-2 gap-y-5 -mt-9 mb-12">
						{propertyList.map((property) => (
							<PropertyListingCard key={property.id} {...property} />
						))}
					</div>
					<Pagination
						totalPages={totalPages}
						className=""
					/>
				</FilterProvider>
			</Suspense>
		</>
	);
};
