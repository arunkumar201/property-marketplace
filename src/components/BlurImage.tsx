"use client";

import Image from "next/image";
import { useState } from "react";

export function BlurImage({
	url,
	name,
}: {
	url: string;
	name: string;
}) {
	const [isLoading,setLoading] = useState(true);

	return (
		<Image
			src={url}
			alt={name}
			quality={90}
			objectFit="cover"
			width={300}
			height={300}
			className={`h-[240px] w-[360px] rounded-t-xl object-fill
              duration-700 ease-in-out group-hover:opacity-75 hover:scale-105 hover:shadow-xl
              ${isLoading ? "blur-xl backdrop" : "blur-0 grayscale-0"})`
			}
			onLoad={() => setLoading(false)}
		/>
	);
}