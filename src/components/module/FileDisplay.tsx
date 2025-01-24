import Image from "next/image";
import { useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { GlobalWorkerOptions } from "pdfjs-dist";
import { version as pdfjsVersion } from "pdfjs-dist/package.json";
// Import version for the workerSrc
import { Document, Page } from "react-pdf";

// Set the workerSrc for pdf.js
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`;

interface FileDisplayProps {
	files: File[];
	initialIndex: number;
}

function FileDisplay({ files, initialIndex }: FileDisplayProps) {
	const [currentIndex, setCurrentIndex] = useState(initialIndex);

	const currentFile = files[currentIndex];
	const fileExtension = currentFile.name.split(".").pop()?.toLowerCase();
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

	// Navigation Handlers
	const handleNext = () => {
		if (currentIndex < files.length - 1) {
			setCurrentIndex(currentIndex + 1);
			setPageNumber(1); // Reset PDF page if navigating to a new file
		}
	};

	const handlePrev = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
			setPageNumber(1); // Reset PDF page if navigating to a new file
		}
	};

	if (isImage) {
		return (
			<div className="flex flex-col items-center justify-center">
				<div className="flex flex-col items-center">
					<Image
						src={URL.createObjectURL(currentFile)}
						alt={currentFile.name}
						width={600}
						height={600}
						className="object-contain w-full h-auto sm:w-96 lg:w-[600px] lg:h-[600px] xl:w-[800px] xl:h-[520px]"
					/>
				</div>
				<div className="flex justify-between w-full items-center bg-background mt-4">
					<button
						onClick={handlePrev}
						disabled={currentIndex === 0}
						className="flex rounded-full w-10 h-10 bg-primary items-center justify-center disabled:opacity-50"
					>
						<ChevronLeft size={20} className="text-white" />
					</button>
					<p className="text-center text-md font-semibold">
						{currentFile.name}
					</p>
					<button
						onClick={handleNext}
						disabled={currentIndex === files.length - 1}
						className="flex rounded-full w-10 h-10 bg-primary items-center justify-center disabled:opacity-50"
					>
						<ChevronRight size={20} className="text-white" />
					</button>
				</div>
			</div>
		);
	}

	if (isPdf) {
		return (
			<div className="flex flex-col items-center">
				<Document
					file={URL.createObjectURL(currentFile)}
					onLoadSuccess={onLoadSuccess}
					className="pdf-preview"
				>
					<Page pageNumber={pageNumber} width={600} />
				</Document>
				<div className="mt-4 text-center">
					<p className="text-lg font-semibold">{currentFile.name}</p>
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
				<div className="flex justify-between w-full items-center bg-background mt-4">
					<button
						onClick={handlePrev}
						disabled={currentIndex === 0}
						className="flex rounded-full w-10 h-10 bg-primary items-center justify-center disabled:opacity-50"
					>
						<ChevronLeft size={20} className="text-white" />
					</button>
					<p className="text-center text-lg font-semibold">
						{currentFile.name}
					</p>
					<button
						onClick={handleNext}
						disabled={currentIndex === files.length - 1}
						className="flex rounded-full w-10 h-10 bg-primary items-center justify-center disabled:opacity-50"
					>
						<ChevronRight size={20} className="text-white" />
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center">
			<p>{currentFile.name}</p>
		</div>
	);
}

export default function FileDisplayList({ files }: { files: File[] }) {
	return (
		<div className="space-y-4">
			{files.length > 0 ? (
				<FileDisplay files={files} initialIndex={0} />
			) : (
				<p>No files attached.</p>
			)}
		</div>
	);
}
