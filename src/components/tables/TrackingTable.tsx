"use client";

import {
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	Table as UITable,
} from "@/components/ui/table";

interface ColumnDef<T> {
	id: string; // Unique identifier for the column
	header: string; // Header text
	cell?: (props: { row: T }) => React.ReactNode; // Custom render function for cell content
}

interface DataTableProps<T> {
	columns: ColumnDef<T>[]; // Array of column definitions
	data: T[]; // Array of data objects
}

export function DataTable<T>({ columns, data }: DataTableProps<T>) {
	return (
		<UITable className="w-full border border-gray-300 rounded-lg shadow-md">
			<TableHeader>
				<TableRow>
					{columns.map((column) => (
						<TableHead key={column.id}>{column.header}</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.length > 0 ? (
					data.map((row, rowIndex) => (
						<TableRow key={rowIndex}>
							{columns.map((column) => (
								<TableCell key={column.id}>
									{/* Use `column.cell` for custom rendering */}
									{column.cell
										? column.cell({ row })
										: (row as Record<string, any>)[column.id]}
								</TableCell>
							))}
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell colSpan={columns.length} className="text-center">
							No data available.
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</UITable>
	);
}
