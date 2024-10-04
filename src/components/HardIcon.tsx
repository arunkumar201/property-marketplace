'use client'
import { Heart } from "lucide-react";
import { useState } from "react"
import { cn } from "@/lib/utils";

export const HardIcon = () => {
	const [liked,setLiked] = useState(false);

	return (
		<>
			<button className="absolute top-2 right-2 p-1 rounded-full" onClick={() => setLiked((prev: boolean) => !prev)}>
				<Heart className={cn("h-6 w-6 text-[#FAFAFA]",liked && "fill-[#ff2969]")} />
			</button >
		</>
	)

}
