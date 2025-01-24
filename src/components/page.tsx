"use client";

import { useState } from "react";

import { Progress } from "@/components/ui/progress";
import { Toaster } from "@/components/ui/toaster";

import DocumentUploadStep from "./module/DocumentUploadStep";
import SenderInfoStep from "./module/InfoStep";
import ReviewStep from "./module/ReviewStep";

export interface LedgerType {
	letters?: File[];
	attachments?: File[];
	sender_name?: string;
	sender_phone_number?: string;
	sender_email?: string;
	carrier_person_first_name?: string;
	carrier_person_middle_name?: string;
	carrier_phone_number?: string;
	ledger_subject?: string;
	ledger_description?: string;
	tracking_number?: string;
	ledger_status?:
		| "PENDING"
		| "IN_REVIEW"
		| "APPROVED"
		| "DELIVERED"
		| "ARCHIVED";
	recipient_name?: string;
	recipient_phone_number?: string;
	job_title?: string;
	department?: string;
	sector?: string;
	received_at?: string;
	priority?: "LOW" | "MEDIUM" | "HIGH";
	metadata_title?: string;
	metadata_content?: string;
	metadata_author?: string;
	metadata_dateCreated?: string;
	metadata_lastModified?: string;
	metadata_keywords?: string;
	metadata_tags?: string;
	metadata_fileType?: string;
	metadata_language?: string;
	metadata_confidentiality?:
		| "PUBLIC"
		| "INTERNAL"
		| "CONFIDENTIAL"
		| "RESTRICTED";
}

export default function LedgerFormStepper() {
	const [currentStep, setCurrentStep] = useState(1);
	const [ledgerData, setLedgerData] = useState<LedgerType>({});

	const totalSteps = 4;

	const updateLedgerData = (newData: Partial<LedgerType>) => {
		setLedgerData((prevData) => ({ ...prevData, ...newData }));
	};

	const handleNext = () => {
		setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
	};

	const handleBack = () => {
		setCurrentStep((prev) => Math.max(prev - 1, 1));
	};

	const handleSubmit = () => {
		// Here you would typically send the final data to your backend
		console.log("Final submission:", ledgerData);
		// Reset the form or navigate to a success page
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6 text-center">Ledger Form</h1>
			<Progress value={(currentStep / totalSteps) * 100} className="mb-6" />
			<div className="bg-white shadow-md rounded-lg p-6">
				{currentStep === 1 && (
					<DocumentUploadStep
						data={ledgerData}
						updateData={updateLedgerData}
						onNext={handleNext}
					/>
				)}
				{currentStep === 2 && (
					<SenderInfoStep
						data={ledgerData}
						updateData={updateLedgerData}
						onNext={handleNext}
						onBack={handleBack}
					/>
				)}
				{currentStep === 3 && (
					<ReviewStep
						data={ledgerData}
						onSubmit={handleSubmit}
						onBack={handleBack}
					/>
				)}
			</div>
			<Toaster />
		</div>
	);
}
