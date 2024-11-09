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
			<div className="h-fit w-full grid grid-cols-[repeat(auto-fit,minmax(w-[100px],1fr))] md:grid-cols-[repeat(auto-fit,minmax(w-[220px],1fr))] lg:grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-x-2 gap-y-5 mt-[2rem] md:-mt-4 auto-rows-fr">
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
