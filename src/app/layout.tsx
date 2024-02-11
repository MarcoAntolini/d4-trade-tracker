import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter as FontSans } from "next/font/google";
import NotificationProvider from "./_components/NotificationProvider";
import SessionProvider from "./_components/SessionProvider";
import "./globals.css";
import { auth } from "@/auth";

export const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "D4 Trade Tracker",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession();
	return (
		<html lang="en">
			<body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
				<SessionProvider session={session}>
					<NotificationProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>
							<Header />
							<main className="min-h-[calc(100vh-56px-56px)]">{children}</main>
							<Footer />
						</ThemeProvider>
					</NotificationProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
