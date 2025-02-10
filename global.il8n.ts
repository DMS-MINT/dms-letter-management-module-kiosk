import type { LocalePrefix, Pathnames } from "next-intl/routing";

// @see i18n-ally.localesPaths in settings.json
export const i18nTheme = "default" as "default";

// Define the supported locales: Amharic and English
export const locales: string[] = ["am", "en-US", "or"];

export const localePrefix: LocalePrefix<typeof locales> = "always";

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en-US";

export const pathnames: Pathnames<typeof locales> = {
	"/": "/",
	"/donate": {
		"en-US": "/donate",
		am: "/ለመችላት",
		or: "/kennaa",
	},
	"/pathnames": {
		"en-US": "/pathnames",
		am: "/መንገዶች",
		or: "/kennaa",
	},
};

export const labels = {
	"en-US": "English",
	am: "Amharic",
	or: "Oromiffa",
};

export const localeFlags: {
	[key in Locale]: string;
} = {
	"en-US": "🇺🇸",
	am: "🇪🇹",
	or: "🇪🇹",
};
