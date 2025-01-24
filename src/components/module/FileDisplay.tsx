// Import icons for PDF files
import Image from "next/image";
import { useState } from "react";

import { Document, Page } from "react-pdf";

// Import react-pdf components

interface FileDisplayProps {
	file: File;
}
function FileDisplay({ file }: FileDisplayProps) {
	const fileExtension = file.name.split(".").pop()?.toLowerCase();
	const isImage =
		fileExtension === "jpg" ||
		fileExtension === "jpeg" ||
		fileExtension === "png" ||
		fileExtension === "gif" ||
		fileExtension === "webp";
	const isPdf = fileExtension === "pdf";

	// PDF Viewer State
	const [numPages, setNumPages] = useState<number | null>(null);
	const [pageNumber, setPageNumber] = useState(1);

	function onLoadSuccess({ numPages }: { numPages: number }) {
		setNumPages(numPages);
	}

	if (isImage) {
		return (
			<div className="flex flex-col items-center">
				<Image
					src={URL.createObjectURL(file)}
					alt={file.name}
					width={600} // Adjust as needed
					height={600} // Adjust as needed
					className="object-contain w-full h-auto sm:w-96 sm:h-96 lg:w-[600px] lg:h-[600px] xl:w-[800px] xl:h-[800px]"
				/>
				<p className="mt-4 text-center text-lg font-semibold">{file.name}</p>
			</div>
		);
	}

	if (isPdf) {
		return (
			<div className="flex flex-col items-center">
				{/* PDF Preview */}
				<Document
					file={URL.createObjectURL(file)}
					onLoadSuccess={onLoadSuccess}
					className="pdf-preview"
				>
					<Page pageNumber={pageNumber} width={600} />
				</Document>
				<div className="mt-4 text-center">
					<p className="text-lg font-semibold">{file.name}</p>
					<div className="mt-2">
						{numPages && (
							<p>
								Page {pageNumber} of {numPages}
							</p>
						)}
						<button
							disabled={pageNumber <= 1}
							onClick={() => setPageNumber(pageNumber - 1)}
							className="px-2 py-1 border"
						>
							Prev
						</button>
						<button
							disabled={pageNumber >= numPages!}
							onClick={() => setPageNumber(pageNumber + 1)}
							className="px-2 py-1 border ml-2"
						>
							Next
						</button>
					</div>
				</div>
			</div>
		);
	}

	// For unsupported file types
	return (
		<div className="flex flex-col items-center">
			<p>{file.name}</p>
		</div>
	);
}
// FileDisplayList component that maps over files and calls FileDisplay
export default function FileDisplayList({ files }: { files: File[] }) {
	return (
		<div className="space-y-4">
			{files.length > 0 ? (
				files.map((file, index) => (
					<div key={index} className="flex items-center space-x-2">
						<FileDisplay file={file} />
						<span>{file.name}</span>
					</div>
				))
			) : (
				<p>No files attached.</p>
			)}
		</div>
	);
}
