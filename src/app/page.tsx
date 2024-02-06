"use client";

import Image from "next/image";

export default function Page() {
	return (
		<div className="flex flex-col items-center gap-10 p-10">
			<Image
				src="/logo.png"
				alt="Diablo 4 Logo"
				width={160}
				height={160}
			/>
			<h1 className="text-2xl font-bold text-center">Diablo 4 Trade Tracker</h1>
			<p className="text-center">
				Welcome to Diablo 4 Trade Tracker!
				<br />
				This is a simple web application that will track the prices of items in the market of Diablo 4. You can set a
				price limit and the application will notify whenever an item is available for purchase below that price.
				<br />
				<br />
				More features will be added in the future, so stay tuned!
			</p>
		</div>
	);
}
