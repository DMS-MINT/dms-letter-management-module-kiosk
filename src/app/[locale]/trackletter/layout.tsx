"use client";

import { ReactNode } from "react";

import MainNav from "@/components/shared/Navigations/MainNav";
import { GeneralShell } from "@/components/shared/Wrappers/GeneralShell";

interface LetterTrackingLayoutProps {
	children: ReactNode;
}

export default function LetterTrackingLayout({
	children,
}: LetterTrackingLayoutProps) {
	return (
		<GeneralShell>
			<div className="flex flex-col min-h-screen">
				{/* Top Navigation */}
				<div className="sticky top-0 z-50">
					<MainNav />
				</div>
				{/* Main Content */}
				<main className="flex-grow p-6 mx-auto w-full bg-white shadow-lg rounded-lg">
					{children}
				</main>
			</div>
		</GeneralShell>
	);
}
