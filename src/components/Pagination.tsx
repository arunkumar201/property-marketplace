'use client'

import React,{ useState,useEffect } from 'react';
import { ChevronLeft,ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFilter } from '@/hooks';

interface PaginationProps {
	totalPages: number;
	className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
	totalPages,
	className = '',
}) => {
	const [visiblePages,setVisiblePages] = useState<number[]>([]);
	const { currentPage,setFilter,isLoading } = useFilter();

	const onPageChange = (page: number) => {
		if (page > 0 && page <= totalPages) {
			setFilter('currentPage',page.toString());
		}
	};

	useEffect(() => {
		const calculateVisiblePages = () => {
			let pages: number[] = [];
			const maxVisiblePages = window.innerWidth >= 1024 ? 12 : window.innerWidth >= 768 ? 9 : 6;

			if (totalPages <= maxVisiblePages) {
				pages = Array.from({ length: totalPages },(_,i) => i + 1);
			} else {
				const leftOffset = Math.floor((maxVisiblePages - 3) / 2);
				const rightOffset = maxVisiblePages - 3 - leftOffset;

				if (Number(currentPage) <= leftOffset + 1) {
					pages = Array.from({ length: maxVisiblePages - 2 },(_,i) => i + 1); pages.push(0,totalPages);
				} else if (Number(currentPage) >= totalPages - rightOffset) {
					pages = [1,0];
					pages.push(...Array.from(Array(maxVisiblePages - 2).keys()).map(i => totalPages - maxVisiblePages + 3 + i));
				} else {
					pages = [1,0];
					for (let i = Number(currentPage) - leftOffset; i <= Number(currentPage) + rightOffset; i++) {
						pages.push(i);
					}
					pages.push(0,totalPages);
				}
			}
			setVisiblePages(pages);
		};

		calculateVisiblePages();
		window.addEventListener('resize',calculateVisiblePages);
		return () => window.removeEventListener('resize',calculateVisiblePages);
	},[totalPages,currentPage]);

	return (
		<nav className={`flex flex-wrap gap-3 items-center justify-center space-x-2 ${className}`}>
			<Button
				variant="outline"
				className='w-fit p-3 flex justify-between items-center'
				size="icon"
				onClick={() => onPageChange(Math.max(1,Number(currentPage) - 1))}
				disabled={Number(currentPage) === 1 && isLoading}
			>
				<ChevronLeft className="h-6 w-6 text-gray-700 -ml-3" />
				<span className='text-[#31393D]'>Zurück</span>
				<span className="sr-only">Previous page</span>
			</Button>
			{visiblePages.map((page,index) =>
				page === 0 ? (
					<span key={`ellipsis-${index}`} className="px-2">...</span>
				) : (
					<Button
						key={page}
							variant={Number(currentPage) === page ? "default" : "outline"}
						size="icon"
							disabled={isLoading}
						onClick={() => onPageChange(page)}
					>
						{page}
					</Button>
				)
			)}
			<Button
				variant="outline"
				className='w-fit p-3 flex justify-between items-center'
				size="icon"
				onClick={() => onPageChange(Math.min(totalPages,Number(currentPage) + 1))}
				disabled={Number(currentPage) === totalPages || isLoading}
			>
				<span className='text-[#31393D]'>Weiter</span>
				<ChevronRight className="h-6 w-6 text-gray-700" />
				<span className="sr-only">Next page</span>
			</Button>
		</nav>
	);
};

export default Pagination;
