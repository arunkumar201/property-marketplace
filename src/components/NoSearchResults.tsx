import React from 'react';
import { SearchX } from 'lucide-react';
import { Card,CardContent,CardHeader,CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NoSearchResults = () => {
	return (
		<Card className="w-full max-w-md mx-auto mt-8 h-fit">
			<CardHeader className="text-center">
				<CardTitle className="text-2xl font-bold text-gray-800">No Results Found</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col items-center space-y-4">
					<SearchX className="w-16 h-16 text-gray-400" />
					<p className="text-center text-gray-600">
						{"We couldn't find any properties matching your search criteria. Try adjusting your filters or search terms."}
					</p>
					<Link href={"/"}>
						<Button variant="outline" className="mt-4">
							Reset Filters
						</Button>
					</Link>
				</div>
			</CardContent>
		</Card>
	);
};

export default NoSearchResults;
