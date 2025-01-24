"use client";

import { useCallback, useState } from "react";

import { File, Upload, X } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

import type { LedgerType } from "../page";

interface DocumentUploadStepProps {
	data: LedgerType;
	updateData: (newData: Partial<LedgerType>) => void;
	onNext: () => void;
}

export default function DocumentUploadStep({
	data,
	updateData,
	onNext,
}: DocumentUploadStepProps) {
	const [isUploading, setIsUploading] = useState(false);

	const onDrop = useCallback(
		(acceptedFiles: File[], fileType: "letters" | "attachments") => {
			updateData({ [fileType]: [...(data[fileType] || []), ...acceptedFiles] });
		},
		[data, updateData]
	);

	const {
		getRootProps: getLetterRootProps,
		getInputProps: getLetterInputProps,
	} = useDropzone({
		onDrop: (files) => onDrop(files, "letters"),
		accept: {
			"application/pdf": [".pdf"],
			"image/*": [".png", ".jpg", ".jpeg"],
		},
		maxSize: 5 * 1024 * 1024, // 5MB
	});

	const {
		getRootProps: getAttachmentRootProps,
		getInputProps: getAttachmentInputProps,
	} = useDropzone({
		onDrop: (files) => onDrop(files, "attachments"),
		accept: {
			"application/pdf": [".pdf"],
			"image/*": [".png", ".jpg", ".jpeg"],
		},
		maxSize: 5 * 1024 * 1024, // 5MB
	});

	const removeFile = (fileType: "letters" | "attachments", index: number) => {
		const updatedFiles = [...(data[fileType] || [])];
		updatedFiles.splice(index, 1);
		updateData({ [fileType]: updatedFiles });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!data.letters?.length && !data.attachments?.length) {
			toast({
				title: "Error",
				description: "Please upload at least one file.",
				variant: "destructive",
			});
			return;
		}
		setIsUploading(true);
		// Simulate file upload process
		setTimeout(() => {
			setIsUploading(false);
			onNext();
		}, 2000);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="grid grid-cols-3 gap-6 mb-4">
				<div>
					<Label htmlFor="received_at">Received Date</Label>
					<Input
						id="received_at"
						type="date"
						value={new Date().toISOString().split("T")[0]} // Set the date to now
						onChange={(e) => updateData({ received_at: e.target.value })}
						required
					/>
				</div>

				<div>
					<Label htmlFor="metadata_language">Language</Label>
					<Select
						value={data.metadata_language || ""}
						onValueChange={(value) => updateData({ metadata_language: value })}
					>
						<SelectTrigger id="metadata_language">
							<SelectValue placeholder="Select language" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="English">English</SelectItem>
							<SelectItem value="Amharic">Amharic</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div>
					<Label htmlFor="metadata_confidentiality">Confidentiality</Label>
					<Select
						value={data.metadata_confidentiality || ""}
						onValueChange={(value) =>
							updateData({
								metadata_confidentiality:
									value as LedgerType["metadata_confidentiality"],
							})
						}
					>
						<SelectTrigger id="metadata_confidentiality">
							<SelectValue placeholder="Select confidentiality" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="PUBLIC">Public</SelectItem>
							<SelectItem value="INTERNAL">Internal</SelectItem>
							<SelectItem value="CONFIDENTIAL">Confidential</SelectItem>
							<SelectItem value="RESTRICTED">Restricted</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div>
				<h3 className="text-lg font-semibold mb-2">Upload Letters</h3>
				<div
					{...getLetterRootProps()}
					className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-primary"
				>
					<input {...getLetterInputProps()} />
					<Upload className="mx-auto h-12 w-12 text-gray-400" />
					<p className="mt-2 text-sm text-gray-600">
						Drag & drop letter files here, or click to select files
					</p>
					<p className="text-xs text-gray-500 mt-1">
						(PDF or images up to 5MB each)
					</p>
				</div>
				{data.letters && data.letters.length > 0 && (
					<ul className="mt-4 space-y-2">
						{data.letters.map((file, index) => (
							<li
								key={file.name}
								className="flex items-center justify-between bg-gray-100 p-2 rounded"
							>
								<div className="flex items-center">
									<File className="h-5 w-5 mr-2 text-gray-500" />
									<span className="text-sm truncate">{file.name}</span>
								</div>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									onClick={() => removeFile("letters", index)}
									className="text-red-500 hover:text-red-700"
								>
									<X className="h-4 w-4" />
								</Button>
							</li>
						))}
					</ul>
				)}
			</div>

			<div>
				<h3 className="text-lg font-semibold mb-2">Upload Attachments</h3>
				<div
					{...getAttachmentRootProps()}
					className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-primary"
				>
					<input {...getAttachmentInputProps()} />
					<Upload className="mx-auto h-12 w-12 text-gray-400" />
					<p className="mt-2 text-sm text-gray-600">
						Drag & drop attachment files here, or click to select files
					</p>
					<p className="text-xs text-gray-500 mt-1">
						(PDF or images up to 5MB each)
					</p>
				</div>
				{data.attachments && data.attachments.length > 0 && (
					<ul className="mt-4 space-y-2">
						{data.attachments.map((file, index) => (
							<li
								key={file.name}
								className="flex items-center justify-between bg-gray-100 p-2 rounded"
							>
								<div className="flex items-center">
									<File className="h-5 w-5 mr-2 text-gray-500" />
									<span className="text-sm truncate">{file.name}</span>
								</div>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									onClick={() => removeFile("attachments", index)}
									className="text-red-500 hover:text-red-700"
								>
									<X className="h-4 w-4" />
								</Button>
							</li>
						))}
					</ul>
				)}
			</div>

			<Button type="submit" className="w-full" disabled={isUploading}>
				{isUploading ? "Uploading..." : "Next"}
			</Button>
		</form>
	);
}
