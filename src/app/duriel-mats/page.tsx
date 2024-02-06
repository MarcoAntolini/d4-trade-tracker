"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

type Material = {
	_id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
	price: number;
	quantity: number;
	userId: {
		_id: string;
		name: string;
	} & {};
} & {};

// TODO:
// fare una lista con tutti i boss o i summon set
// l'user sceglie quale boss vuole monitorare (pulsante + per aggiungere nuovo)

export default function Page() {
	const refreshRate = 10000;
	const [priceLimit, setPriceLimit] = useState<number>(10000000);
	const [response, setResponse] = useState<Material[]>([]);
	const [oldMatchingMaterials, setOldMatchingMaterials] = useState<Material[]>([]);
	const [newMatchingMaterials, setNewMatchingMaterials] = useState<Material[]>([]);

	useEffect(() => {
		const intervalId = setInterval(fetchData, refreshRate);
		return () => clearInterval(intervalId);
	}, [priceLimit]);

	useEffect(() => {
		checkMaterials();
		if (newMatchingMaterials.length > 0) {
			sendNotification();
		}
	}, [response]);

	async function fetchData() {
		const response = await fetch("/api/boss-mats/duriel");
		const data: Material[] = await response.json();
		setResponse(data);
	}

	function checkMaterials() {
		console.log("1", { response, oldMatchingMaterials, newMatchingMaterials });
		const filteredNewMatchingMaterials = response.filter(
			(material) =>
				material.price <= priceLimit &&
				!oldMatchingMaterials.some(
					(oldMaterial) => oldMaterial._id === material._id && oldMaterial.price === material.price
				)
		);

		setNewMatchingMaterials(filteredNewMatchingMaterials);
		const updatedOldMatchingMaterials = response.filter((material) => material.price <= priceLimit);
		setOldMatchingMaterials(updatedOldMatchingMaterials);
		console.log("2", { response, oldMatchingMaterials, newMatchingMaterials });
	}

	function sendNotification() {
		if ("Notification" in window) {
			Notification.requestPermission().then((result) => {
				if (result === "granted") {
					newMatchingMaterials.forEach((material) => {
						const notification = new Notification("New item found", {
							body: `${material.quantity} ${material.name} are available for ${material.price} gold each at https://diablo.trade/user/${material.userId._id}/items.\n`,
							icon: "/logo.png",
							requireInteraction: true,
						});
						notification.onclick = () => {
							window.open(`https://diablo.trade/user/${material.userId._id}/items.\n`);
						};
					});
				}
			});
		}
	}

	return (
		<div className="flex flex-col items-center gap-10 p-10">
			<h1 className="text-3xl font-bold">Duriel Mats</h1>
			<p className="text-sm text-center">Choose a price limit to receive notifications for items below that price.</p>
			<div>
				<p className="text-center">
					Current price limit: <span className="font-bold">{priceLimit.toLocaleString("en")}</span>
				</p>
			</div>
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Input
					type="text"
					id="price-limit"
					placeholder="Price limit"
					min="0"
					onChange={(e) => {
						// if (e.target.value.startsWith("0") && e.target.value.length > 1) {
						// 	e.target.value = e.target.value.slice(1);
						// }
						e.target.value = e.target.value.replace(/[^0-9]/g, "");
						e.target.value = e.target.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
					}}
					className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
				/>
				<Button
					onClick={() => {
						const input = document.getElementById("price-limit") as HTMLInputElement;
						const value = input.value.replace(/,/g, "");
						setPriceLimit(Number(value));
					}}
				>
					Confirm
				</Button>
			</div>
		</div>
	);
}
