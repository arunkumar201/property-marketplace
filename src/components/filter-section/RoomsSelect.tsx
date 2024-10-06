'use client'

import React,{ useState } from 'react';
import { ROOM_OPTIONS } from "@/constants";
import { useFilter } from "@/hooks/useSearchFilter";
import { Button } from "../ui/button";
import { Popover,PopoverContent,PopoverTrigger } from "../ui/popover";
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export const RoomsSelect: React.FC = () => {
	const { rooms,setFilter } = useFilter();
	const [isOpen,setIsOpen] = useState(false);

	const handleRoomClick = (value: string) => {
		let updatedRooms;
		if (rooms && rooms.includes(value)) {
			updatedRooms = rooms.filter((room: string) => room !== value);
		} else {
			updatedRooms = [...(rooms || []),value];
		}
		setFilter('rooms',updatedRooms || []);
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" className="w-[200px] justify-between">
					{"Zimmer"}
					<ChevronDown className="ml-2" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[330px] p-2">
				<div className="grid grid-cols-6 gap-2">
					{ROOM_OPTIONS.map((value: string) => (
						<Button
							className={cn('m-0 w-[3rem] p-1 md:p-1',rooms && rooms.includes(value) && "bg-[#748790]")}
							key={value}
							variant={rooms && rooms.includes(value) ? "default" : "outline"}
							onClick={() => handleRoomClick(value)}
						>
							{value}
						</Button>
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
};
