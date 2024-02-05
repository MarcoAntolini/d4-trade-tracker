"use client";

import { useEffect } from "react";

export default function Home() {
	useEffect(() => {
		if ("Notification" in window) {
			Notification.requestPermission().then((result) => {
				if (result === "granted") {
					const interval = setInterval(() => {
						new Notification("Hello, world!");
					}, 10000);
					return () => clearInterval(interval);
				}
			});
		}
	}, []);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1 className="text-4xl font-bold">Hello, world!</h1>
		</main>
	);
}
