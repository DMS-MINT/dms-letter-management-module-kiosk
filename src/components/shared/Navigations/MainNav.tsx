"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

// import { IMAGES } from "@/constants/files";
import { CircleUserRound } from "lucide-react";
import { useTranslations } from "next-intl";

import { useLogout } from "@/actions/Query/auth_Query/request";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/custom/modeToggle";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IMAGES } from "@/constants/files";
import { useAppSelector } from "@/hooks/storehooks";

import LocaleSwitcher from "../DropDown/LocaleSwitcher";

const MainNav = () => {
	// 	const t = useTranslations();
	const { mutate: logOut } = useLogout();
	const data = useAppSelector((state) => state.users.currentUser);

	const route = useRouter();
	const handleLogout = () => {
		logOut();
	};
	const t = useTranslations("LedgerForm.fields.nav_bar");
	return (
		<nav className="bg-background z-50 w-full">
			<div className=" mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-14">
					<div className="flex items-center gap-2">
						<Image
							src={IMAGES.mint}
							height={60}
							width={70}
							alt={t("logoAlt")}
							onClick={() => route.push("/home")}
						/>
						<div
							className="text-md font-bold border border-blue-500 hover:border-blue-700 hover:bg-blue-100 transition-colors duration-200 cursor-pointer p-2 rounded-md"
							onClick={() => route.push("/trackletter" as `/${string}`)}
						>
							{t("trackLetter")}
						</div>
						<div
							className="text-md  font-bold  hover:cursor-pointer"
							onClick={() => route.push("/home" as `/${string}`)}
						>
							{t("electronicLetterSystem")}
						</div>
					</div>
					{/* <NavigationMenuConf /> */}

					<div className="mr-0 flex items-center gap-2 md:mr-2">
						<ModeToggle />
						<LocaleSwitcher />
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="secondary"
									size="icon"
									className="rounded-full h-[45px] w-[45px] overflow-hidden "
								>
									<CircleUserRound />
									<span className="sr-only">{t("toggleUserMenu")}</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56">
								<DropdownMenuLabel className="flex gap-2 text-sm text-customOrange">
									{data.user_profile.full_name_en}
								</DropdownMenuLabel>
								{/* <DropdownMenuSeparator />
								<DropdownMenuItem className="cursor-pointer">
									My Account
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem className="cursor-pointer">
									Settings
								</DropdownMenuItem>
								<DropdownMenuItem className="cursor-pointer">
									Support
								</DropdownMenuItem> */}
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={() => handleLogout()}>
									{t("logout")}
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default MainNav;
