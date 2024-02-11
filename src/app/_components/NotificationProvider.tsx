"use client";

import { useState } from "react";

type NotificationSettings = {
	[key: string]: {
		enabled: boolean;
		priceLimit: number;
	};
};

export default function NotificationProvider({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({});

	return <>{children}</>;
}
