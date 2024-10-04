'use client'

import React,{ useState,useEffect } from 'react';
import { ChevronLeft,ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
	totalPages: number;
	currentPage: number;
	onPageChange: (page: number) => void;
	className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
	totalPages,
	currentPage,
	onPageChange,
	className = '',
}) => {
	const [visiblePages,setVisiblePages] = useState<number[]>([]);

	useEffect(() => {
		const calculateVisiblePages = () => {
			let pages: number[] = [];
			const maxVisiblePages = window.innerWidth >= 1024 ? 12 : window.innerWidth >= 768 ? 9 : 6;

			if (totalPages <= maxVisiblePages) {
				pages = Array.from({ length: totalPages },(_,i) => i + 1);
			} else {
				const leftOffset = Math.floor((maxVisiblePages - 3) / 2);
				const rightOffset = maxVisiblePages - 3 - leftOffset;

				if (currentPage <= leftOffset + 1) {
					pages = [...Array(maxVisiblePages - 2).keys()].map(i => i + 1);
					pages.push(0,totalPages);
				} else if (currentPage >= totalPages - rightOffset) {
					pages = [1,0];
					pages.push(...Array(maxVisiblePages - 2).keys().map(i => totalPages - maxVisiblePages + 3 + i));
				} else {
					pages = [1,0];
					for (let i = currentPage - leftOffset; i <= currentPage + rightOffset; i++) {
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
		<nav className={`flex items-center justify-center space-x-2 ${className}`}>
			<Button
				variant="outline"
				className='w-fit p-3 flex justify-between items-center'
				size="icon"
				onClick={() => onPageChange(Math.max(1,currentPage - 1))}
				disabled={currentPage === 1}
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
						variant={currentPage === page ? "default" : "outline"}
						size="icon"
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
				onClick={() => onPageChange(Math.min(totalPages,currentPage + 1))}
				disabled={currentPage === totalPages}
			>
				<span className='text-[#31393D]'>Weiter</span>
				<ChevronRight className="h-6 w-6 text-gray-700" />
				<span className="sr-only">Next page</span>
			</Button>
		</nav>
	);
};

export default Pagination;
