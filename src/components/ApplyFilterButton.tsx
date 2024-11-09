'use client'

import Image from "next/image"
import iconPro from "@/../public/IconlyPro.png"
import toast from "react-hot-toast";


export const ApplyFilterButton = () => {

	const applyFilters = () => {
		toast.success("Changes have been applied.")
	};

	return (
		<>
			<div
				onClick={applyFilters}
				className="flex items-center justify-center gap-2 cursor-pointer border-2 p-2 rounded-lg hover:bg-gray-400 hover:border-gray-300"
			>
				<Image
					src={iconPro}
					alt="icon-prop"
					width={60}
					height={50}
					className="text-gray-50 w-4 h-4 lg:w-10 lg:h-4"
				/>
			</div>
		</>
	)
}
