import { type Metadata } from "next";
import { redirect } from "next/navigation";

import { getTranslations } from "next-intl/server";

import { siteConfig } from "@/app";
import { LoginForm } from "@/components/screen/auth/LoginForm";
// import SampleForm from "@/components/module/";
import { ModeToggle } from "@/components/ui/custom/modeToggle";

export async function generateMetadata() {
	// useTranslations works both on the server and client;
	// we only need the getTranslations on async functions.
	const t = await getTranslations();

	const metadata: Metadata = {
		title: `${t("metadata.title.home")} - ${siteConfig.appNameDesc}`,
	};

	return metadata;
}

export default function HomePage() {
	// const t = useTranslations();

	return (
		<div>
			<ModeToggle />
			{/* <SampleForm /> */}
			{/* <LoginForm /> */}
		</div>
	);
	// redirect("/auth/sign-in");
}
// import { redirect } from "next/navigation";

// // This page only renders when the app
// // is built statically (output: "export")
// export default function RootPage() {
// 	redirect("/auth/sign-in");
// }
