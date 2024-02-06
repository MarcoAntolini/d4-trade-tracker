import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

export const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "D4 Trade Tracker",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
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
			</body>
		</html>
	);
}
