import React from 'react';
import { Card,CardContent,CardFooter,CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Eye } from "lucide-react"
import { ITEM_PER_PAGE } from '@/constants';

export const PropertyListingSkeleton = () => {
	return (
		<Card className="w-[360px] h-[430px] overflow-hidden">
			<CardHeader className="p-0">
				<Skeleton className="h-[200px] w-full" />
			</CardHeader>
			<CardContent className="p-4">
				<Skeleton className="h-4 w-3/4 mb-2" />
				<Skeleton className="h-3 w-full mb-2" />
				<Skeleton className="h-3 w-2/3 mb-4" />
				<div className="flex justify-between items-center">
					<Skeleton className="h-3 w-1/4" />
					<Skeleton className="h-3 w-1/4" />
				</div>
			</CardContent>
			<CardFooter className="flex justify-between items-center p-4 border-t">
				<Skeleton className="h-6 w-1/2" />
				<div className="flex items-center space-x-1">
					<Skeleton className="h-4 w-8" />
					<Eye size={16} className="text-gray-400" />
				</div>
			</CardFooter>
		</Card>
	);
};


export const PropertyListSkeleton = () => {

	return (
		<div className="h-fit w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(230px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] xl:grid-cols-[repeat(auto-fit,minmax(330px,1fr))] gap-x-2 gap-y-4 mt-[2rem] md:-mt-4 auto-rows-fr">
			{
				Array(ITEM_PER_PAGE).fill(null).map((_,index) => (
					<PropertyListingSkeleton key={index} />
				))
			}
		</div >

	);
}
