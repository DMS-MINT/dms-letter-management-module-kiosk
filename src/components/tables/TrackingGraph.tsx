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
						stroke="#6B7280"
						tick={{ fill: "#6B7280" }}
						label={{
							value: t(String(xKey)), // ✅ Corrected
							position: "insideBottom",
							dy: 10,
						}}
					/>

					<YAxis stroke="#6B7280" tick={{ fill: "#6B7280" }} />

					<Tooltip
						contentStyle={{
							backgroundColor: "#FFFFFF",
							border: "1px solid #E5E7EB",
							borderRadius: "8px",
							boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
							fontSize: "14px",
						}}
						formatter={(value, name) => [value, t(name)]} // ✅ Fixed
					/>

					<Legend
						wrapperStyle={{ paddingTop: "10px" }}
						formatter={(value) => (
							<span className="text-sm text-gray-700">{t(value)}</span>
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
