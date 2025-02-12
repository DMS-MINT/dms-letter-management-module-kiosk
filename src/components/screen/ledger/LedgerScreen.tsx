"use client";

import { useEffect, useState } from "react";

import { useUpdateLedger } from "@/actions/Query/ledger_Query/request";
import DocumentUploadStep from "@/components/module/DocumentUploadStep";
import SenderInfoStep from "@/components/module/InfoStep";
import ReviewStep from "@/components/module/ReviewStep";
import Success from "@/components/shared/modal/SuccessModal";
import { Progress } from "@/components/ui/progress";
import { Toaster } from "@/components/ui/toaster";
// import { toast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/hooks/storehooks";
import { type LedgerType } from "@/types/ledger";

export default function LedgerScreen() {
	const [currentStep, setCurrentStep] = useState(1);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const submitedLedger = useAppSelector(
		(state) => state.submitted.submitedData
	);
	const { mutate: UpdateLedger } = useUpdateLedger();
	const totalSteps = 3;

	const [ledgerData, setLedgerData] = useState<Partial<LedgerType>>({
		letters: [],
		attachments: [],
		sender_name: "",
		sender_phone_number: "",
		sender_email: "",
		carrier_person_first_name: "",
		carrier_person_middle_name: "",
		carrier_phone_number: "",
		ledger_subject: "",
		tracking_number: "",
		ledger_status: "PENDING",
		recipient_name: "",
		recipient_phone_number: "",
		job_title: "",
		department: "",
		written_at: "",
		priority: "LOW",
		metadata_keywords: "",
		metadata_tags: "",
		metadata_file_type: "",
		metadata_language: "",
		metadata_confidentiality: "PUBLIC",
	});

	// Prefill ledgerData from submitedLedger
	useEffect(() => {
		if (submitedLedger) {
			setLedgerData((prev) => ({
				...prev,
				sender_name: submitedLedger?.sender_name || "",
				ledger_subject: submitedLedger?.ledger_subject || "",
				recipient_name: submitedLedger?.recipient_name || "",
				metadata_keywords: submitedLedger?.metadata_keywords || "",
			}));
		}
	}, [submitedLedger]);

	const updateLedgerData = (newData: Partial<LedgerType>) => {
		setLedgerData((prev) => ({ ...prev, ...newData }));
	};

	const handleNext = () =>
		setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
	const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
	const handleSubmit = () => setIsDialogOpen(true);

	const handleSuccessAction = async () => {
		// toast({
		// 	title: "Success",
		// 	// description: "Successfully downloaded.",
		// 	variant: "default",
		// });

		const {
			id,
			attachments,
			letters,
			metadata_confidentiality,
			metadata_language,
			tracking_number,
			job_title, // you can remove this line
			department, // you can remove this line
			written_at,
			...sendData
		} = ledgerData;

		console.log(
			"send remove data",
			id,
			attachments,
			job_title,
			department,
			letters,
			tracking_number,
			metadata_confidentiality,
			metadata_language,
			written_at
		);
		// TODO this is the submission
		// I have remove the job Titile and department if it is the problem gen aleseram
		await UpdateLedger(
			{
				ledger_id: submitedLedger?.id,
				SendData: sendData,
			},
			{
				onSuccess: async () => {
					if (submitedLedger?.ledger_pdf) {
						const printWindow = window.open(
							`${process.env.NEXT_PUBLIC_API_BASE_URL}/${submitedLedger?.ledger_pdf}`
						);
						console.log(
							"pdf",
							`${process.env.NEXT_PUBLIC_API_BASE_URL}/${submitedLedger?.ledger_pdf}`
						);
						if (printWindow) {
							printWindow.onload = () => {
								printWindow.print();
							};
						}
					}
				},
			}
		);
	};

	return (
		<>
			<div className="container mx-auto px-4 py-8 max-w-6xl">
				<h1 className="text-2xl font-bold mb-6 text-center">
					Letter Submission Form
				</h1>
				<Progress value={(currentStep / totalSteps) * 100} className="mb-6" />
				<div className="bg-background shadow-md rounded-lg p-6">
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

			<Success
				open={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
				message={`Your operation was successful! Your Tracking number will be ${submitedLedger?.tracking_number}`}
				actionLabel="Download Tracker"
				onAction={handleSuccessAction}
			/>
		</>
	);
}
