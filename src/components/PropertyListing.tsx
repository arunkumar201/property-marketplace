import React,{ Suspense } from 'react';
import { IPropertyListingCard,PropertyListingCard } from './PropertyListingCard';
import Pagination from './Pagination';
import { PropertyFilter } from './filter-section/PropertyFilter';
import { FilterProvider } from '@/providers/FilterProvider';
import { PropertyListSkeleton } from './PropertyListingSkeleton';
import NoSearchResults from './NoSearchResults';

export interface IPropertyListing {
	propertyList: IPropertyListingCard[];
	totalPages: number;
	params: string;
}

export const PropertyListing: React.FC<IPropertyListing> = ({ params,propertyList,totalPages }) => {
	return (
		<FilterProvider>
			<PropertyFilter />
			<div className="h-fit  w-full grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-x-4 gap-y-5 mt-[10rem] md:-mt-10">
				<Suspense fallback={<PropertyListSkeleton />} key={params}>
					{propertyList.length > 0 ? propertyList.map((property) => (
							<PropertyListingCard key={property.id} {...property} />
					)) : <NoSearchResults />}
				</Suspense>
			</div>
			<Pagination
				totalPages={totalPages}
				className="mt-12"
			/>
		</FilterProvider>
	);
};
