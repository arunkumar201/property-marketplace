'use client'
import React from 'react';
import { IPropertyListingCard,PropertyListingCard } from "./PropertyListingCard";
import Pagination from './Pagination';

export interface IPropertyListing {
	propertyList: IPropertyListingCard[];
	totalPages: number;
}

export const PropertyListing: React.FC<IPropertyListing> = ({ propertyList,totalPages }) => {
	return (
		<>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-x-2 gap-y-5">
				{propertyList.map((property) => (
					<PropertyListingCard key={property.id} {...property} />
				))}
			</div>
			<Pagination
				totalPages={totalPages}
				currentPage={3}
				onPageChange={() => 4}
				className="mt-8"
			/>
		</>
	);
};
