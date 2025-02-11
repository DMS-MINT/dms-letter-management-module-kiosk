"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";

import { DataChart } from "@/components/tables/TrackingGraph";
import { DataTable } from "@/components/tables/TrackingTable";
// Adjusted for the new DataTable component
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@/components/ui/select";

// Static mock data for demonstration (replace with actual backend API)
const mockData = [
	{
		letter_id: "L123456",
		issued_date: "2025-01-20",
		current_recipient: "John Doe, HR Department, +251912345678",
		date_received: "2025-01-21",
		shared_with: "Jane Smith, Finance Department",
		forwarded_to: "Mike Johnson, Admin Office",
	},
	{
		letter_id: "L654321",
		issued_date: "2025-01-18",
		current_recipient: "Alice Brown, Record Office, +251987654321",
		date_received: "2025-01-19",
		shared_with: "Tom White, Legal Department",
		forwarded_to: "Eve Davis, Procurement Office",
	},
];

export default function LetterTracking() {
	const [trackingNumber, setTrackingNumber] = useState(""); // For the letter ID input
	const [resultFormat, setResultFormat] = useState("Table"); // For the result format selection (Table/Graph)
	const [results, setResults] = useState(mockData); // Placeholder for fetched tracking data
	const [filteredResults, setFilteredResults] = useState(mockData); // State for filtered results
	const t = useTranslations("LedgerForm.fields.track_letter");
	// Define columns for the tracking result table
	const trackingTableColumns = [
		{
			id: "letter_id",
			header: t("tableHeaders.letter_id"),
			cell: ({ row }: { row: any }) => row.letter_id, // Dynamic rendering
		},
		{
			id: "issued_date",
			header: t("tableHeaders.issued_date"),
			cell: ({ row }: { row: any }) => row.issued_date,
		},
		{
			id: "current_recipient",
			header: t("tableHeaders.current_recipient"),
			cell: ({ row }: { row: any }) => row.current_recipient || "N/A", // Optional field
		},
		{
			id: "date_received",
			header: t("tableHeaders.date_received"),
			cell: ({ row }: { row: any }) => row.date_received || "N/A",
		},
		{
			id: "shared_with",
			header: t("tableHeaders.shared_with"),
			cell: ({ row }: { row: any }) => row.shared_with || "N/A",
		},
		{
			id: "forwarded_to",
			header: t("tableHeaders.forwarded_to"),
			cell: ({ row }: { row: any }) => row.forwarded_to || "N/A",
		},
	];

	// Function to simulate fetching data for the tracking number
	const fetchResultsForTrackingNumber = (trackingNumber: string) => {
		console.log(`Fetching results for tracking number: ${trackingNumber}`);

		// Simulate the process of fetching data (mock data in this case)
		const filtered = mockData.filter((item) =>
			item.letter_id.toLowerCase().includes(trackingNumber.toLowerCase())
		);

		if (filtered.length === 0) {
			console.log("No results found for this letter ID.");
		}

		setFilteredResults(filtered); // Update the state with filtered data
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = e.target.value;
		setTrackingNumber(searchTerm);

		// Trigger the simulated fetch when the user types
		fetchResultsForTrackingNumber(searchTerm);
	};

	const handleTrackLetter = () => {
		// Trigger search when the button is clicked
		fetchResultsForTrackingNumber(trackingNumber);
	};

	// Get the current recipient/location for the first result (if available)
	const currentRecipient =
		filteredResults.length > 0 ? filteredResults[0].current_recipient : "N/A";
	return (
		<div className="p-6 mx-80 bg-gray-50 dark:bg-gray-900  rounded-lg shadow-md">
			<h1 className="text-2xl font-bold mb-4">{t("title")}</h1>
			{/* Centered Input Fields, Dropdown, and Button */}
			<div className="flex flex-col items-center gap-4 mb-6">
				{/* Tracking Number Input */}
				<div className="flex flex-row ">
					<Input
						placeholder={t("placeholder")}
						value={trackingNumber}
						onChange={handleSearch}
						className="w-full md:w-/2 text-lg px-4 py-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					{/* Result Format Dropdown */}
					<Select value={resultFormat} onValueChange={setResultFormat}>
						<SelectTrigger className="max-w-[80px]">
							{resultFormat}
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Table">{t("resultFormat.table")}</SelectItem>
							<SelectItem value="Graph">{t("resultFormat.graph")}</SelectItem>
						</SelectContent>
					</Select>
					<Button className="ml-3 mr-2" onClick={handleTrackLetter}>
						{t("followButton")}
					</Button>
				</div>
			</div>

			{/* Display "Your letter is at" with better styling & animation */}
			{trackingNumber && filteredResults.length > 0 && (
				<div className="mt-4 p-4 bg-blue-100 dark:bg-blue-900 border border-blue-400 dark:border-blue-600 rounded-lg shadow-md text-center transition-all duration-300">
					<p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
						{t("currentLocation")}
					</p>
					<span className="text-xl font-bold text-blue-600 dark:text-blue-400 block mt-1">
						{filteredResults[0].current_recipient}
					</span>
				</div>
			)}

			{/* Display Results */}
			<div>
				{resultFormat === "Table" ? (
					<DataTable columns={trackingTableColumns} data={filteredResults} />
				) : (
					// Inside the LetterTracking component
					<DataChart
						data={filteredResults}
						xKey="issued_date" // Keep the key as is
						yKeys={["current_recipient", "shared_with", "forwarded_to"]} // Only string keys
					/>
				)}
			</div>
		</div>
	);
}
