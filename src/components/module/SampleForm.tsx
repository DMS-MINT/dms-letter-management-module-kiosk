"use client";

import { useState } from "react";

import { Progress } from "@/components/ui/progress";
import { Toaster } from "@/components/ui/toaster";

import FileUploadStep from "./FileUploadStep";
import MetadataStep from "./MetadataStep";

export default function SampleForm() {
	const [currentStep, setCurrentStep] = useState(1);
	const [files, setFiles] = useState<File[]>([]);
	const [metadata, setMetadata] = useState({
		title: "",
		author: "",
		date: "",
	});

	const handleFileUpload = (uploadedFiles: File[]) => {
		setFiles(uploadedFiles);
		// Simulate OCR processing
		setTimeout(() => {
			setCurrentStep(2);
			// Simulate OCR results
			setMetadata({
				title: "Extracted Document Title",
				author: "John Doe",
				date: "2023-05-15",
			});
		}, 3000);
	};

	const handleMetadataSubmit = (updatedMetadata: typeof metadata) => {
		// Here you would typically send the final data to your backend
		console.log("Final submission:", { files, metadata: updatedMetadata });
		// Reset the form or navigate to a success page
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6 text-center">
				Document Upload and Processing
			</h1>
			<Progress value={(currentStep / 2) * 100} className="mb-6" />
			<div className="bg-white shadow-md rounded-lg p-6">
				{currentStep === 1 && <FileUploadStep onUpload={handleFileUpload} />}
				{currentStep === 2 && (
					<MetadataStep
						initialMetadata={metadata}
						onBack={() => setCurrentStep(1)}
						onSubmit={handleMetadataSubmit}
					/>
				)}
			</div>
			<Toaster />
		</div>
	);
}
