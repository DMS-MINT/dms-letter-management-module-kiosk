"use client";

import { useTranslations } from "next-intl";
// Import translation hook
import {
	Area,
	AreaChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

interface DataChartProps<T> {
	data: T[];
	xKey: keyof T; // The key used for X-axis
	yKeys: (keyof T)[]; // Array of keys used for Y-axis (multiple areas)
}

export function DataChart<T>({ data, xKey, yKeys }: DataChartProps<T>) {
	const t = useTranslations("LedgerForm.fields.track_letter.tableHeaders"); // ✅ Correct scope

	const colors = ["#4F46E5", "#10B981", "#EF4444", "#F59E0B"];

	const localizedYKeys = yKeys.map((key) => ({
		key: key as string,
		label: t(key), // ✅ Corrected translation lookup
	}));
	return (
		<div className="w-full h-80 border border-gray-300 rounded-lg shadow-md p-4">
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart data={data}>
					<CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />

					<XAxis
						dataKey={xKey as string}
						stroke="#6B7280" // light mode axis color
						tick={{ fill: "#6B7280" }} // light mode tick color
						className="dark:stroke-gray-300 dark:tick:text-gray-300" // dark mode axis color
						label={{
							value: t(String(xKey)),
							position: "insideBottom",
							dy: 10,
							className: "dark:text-white", // Dark mode label text color
						}}
					/>

					<YAxis
						stroke="#6B7280" // light mode axis color
						tick={{ fill: "#6B7280" }} // light mode tick color
						className="dark:stroke-gray-300 dark:tick:text-gray-300" // dark mode axis color
					/>
					<Tooltip
						contentStyle={{
							backgroundColor: "#FFFFFF", // light mode background
							border: "1px solid #E5E7EB", // light mode border
							borderRadius: "8px", // rounded corners
							boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // soft shadow
							fontSize: "14px", // text size
						}}
						wrapperClassName="dark:bg-gray-800 dark:border-gray-600 dark:text-white" // dark mode classes for wrapper
						formatter={(value, name) => [value, t(name)]} // formatted content
					/>

					<Legend
						wrapperStyle={{ paddingTop: "10px" }}
						className="dark:text-white" // Dark mode legend text color
						formatter={(value) => (
							<span className="text-sm text-gray-700 dark:text-gray-300">
								{t(value)}
							</span>
						)} // ✅ Fixed
					/>

					{localizedYKeys.map(({ key, label }, index) => (
						<Area
							key={key}
							type="monotone"
							dataKey={key}
							stroke={colors[index % colors.length]}
							strokeWidth={2}
							fill={`url(#gradient-${index})`}
							fillOpacity={0.3}
							dot={{
								r: 6,
								fill: colors[index % colors.length],
								stroke: "#FFFFFF",
								strokeWidth: 2,
							}}
							activeDot={{
								r: 8,
								fill: colors[index % colors.length],
								stroke: "#FFFFFF",
								strokeWidth: 2,
							}}
							name={key} // ✅ Correct localized label
						/>
					))}

					{localizedYKeys.map((_, index) => (
						<defs key={index}>
							<linearGradient
								id={`gradient-${index}`}
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="5%"
									stopColor={colors[index % colors.length]}
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor={colors[index % colors.length]}
									stopOpacity={0}
								/>
							</linearGradient>
						</defs>
					))}
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}
