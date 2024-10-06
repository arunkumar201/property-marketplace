/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from "react";

function useThrottled(callback: any, delay: number = 1000) {
	const lastCalled = useRef<number>(0);

	return useCallback(
		(...args: any) => {
			const now = Date.now();

			if (now - lastCalled.current >= delay) {
				lastCalled.current = now;
				callback(...args);
			}
		},
		[callback, delay]
	);
}

export default useThrottled;
