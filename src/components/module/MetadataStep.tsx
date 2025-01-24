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

import type { LedgerType } from "../page";

interface MetadataStepProps {
	data: LedgerType;
	updateData: (newData: Partial<LedgerType>) => void;
	onNext: () => void;
	onBack: () => void;
}

export default function MetadataStep({
	data,
	updateData,
	onNext,
	onBack,
}: MetadataStepProps) {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onNext();
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			{/* <div>
        <Label htmlFor="metadata_title">Title</Label>
        <Input
          id="metadata_title"
          value={data.metadata_title || ""}
          onChange={(e) => updateData({ metadata_title: e.target.value })}
        />
      </div> */}
			{/* <div>
        <Label htmlFor="metadata_content">Content</Label>
        <Textarea
          id="metadata_content"
          value={data.metadata_content || ""}
          onChange={(e) => updateData({ metadata_content: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="metadata_author">Author</Label>
        <Input
          id="metadata_author"
          value={data.metadata_author || ""}
          onChange={(e) => updateData({ metadata_author: e.target.value })}
        />
      </div> */}
			{/* <div>
        <Label htmlFor="metadata_dateCreated">Date Created</Label>
        <Input
          id="metadata_dateCreated"
          type="date"
          value={data.metadata_dateCreated || ""}
          onChange={(e) => updateData({ metadata_dateCreated: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="metadata_lastModified">Last Modified</Label>
        <Input
          id="metadata_lastModified"
          type="date"
          value={data.metadata_lastModified || ""}
          onChange={(e) => updateData({ metadata_lastModified: e.target.value })}
        />
      </div> */}
			{/* <div>
        <Label htmlFor="metadata_keywords">Keywords</Label>
        <Input
          id="metadata_keywords"
          value={data.metadata_keywords || ""}
          onChange={(e) => updateData({ metadata_keywords: e.target.value })}
        />
      </div> */}
			{/* <div>
        <Label htmlFor="metadata_tags">Tags</Label>
        <Input
          id="metadata_tags"
          value={data.metadata_tags || ""}
          onChange={(e) => updateData({ metadata_tags: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="metadata_fileType">File Type</Label>
        <Input
          id="metadata_fileType"
          value={data.metadata_fileType || ""}
          onChange={(e) => updateData({ metadata_fileType: e.target.value })}
        />
      </div> */}
			{/* <div>
        <Label htmlFor="metadata_language">Language</Label>
        <Input
          id="metadata_language"
          value={data.metadata_language || ""}
          onChange={(e) => updateData({ metadata_language: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="metadata_confidentiality">Confidentiality</Label>
        <Select
          value={data.metadata_confidentiality || ""}
          onValueChange={(value) =>
            updateData({ metadata_confidentiality: value as LedgerType["metadata_confidentiality"] })
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
      </div> */}
			<div className="flex justify-between">
				<Button type="button" variant="outline" onClick={onBack}>
					Back
				</Button>
				<Button type="submit">Next</Button>
			</div>
		</form>
	);
}

// "use client";

// import { useState } from "react";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import {
// 	Card,
// 	CardContent,
// 	CardDescription,
// 	CardHeader,
// 	CardTitle,
// } from "@/components/ui/card";
// import {
// 	Form,
// 	FormControl,
// 	FormDescription,
// 	FormField,
// 	FormItem,
// 	FormLabel,
// 	FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import type { LedgerType } from "../page"
// // export interface MetaDataType {
// // 	metaData_title?: string; // optional, min 1, max 100 characters
// // 	metaData_description?: string; // optional, max 500 characters
// // 	metaData_author?: string; // optional, min 1 character
// // 	metaData_dateCreated?: string; // optional, min 1 character
// // 	metaData_lastModified?: string; // optional, min 1 character
// // 	metaData_version?: string; // optional, min 1 character
// // 	metaData_keywords?: string; // optional, min 1 character
// // 	metaData_tags?: string; // optional, min 1 character
// // 	metaData_category?: string; // optional, min 1 character
// // 	metaData_fileType?: string; // optional, min 1 character
// // 	metaData_language?: string; // optional, min 1 character
// // 	metaData_status?:
// // 		| "Draft"
// // 		| "In Review"
// // 		| "Approved"
// // 		| "Published"
// // 		| "Archived"; // optional enum
// // 	metaData_confidentiality?:
// // 		| "Public"
// // 		| "Internal"
// // 		| "Confidential"
// // 		| "Restricted"; // optional enum
// // 	metaData_source_system?: string;
// // }
// const documentMetadataSchema = z.object({
// metaData_keywords: z
// 		.string()
// 		.min(1, "At least one keyword is required")
// 		.optional(),
// 	metaData_tags: z.string().min(1, "At least one tag is required").optional(),
// 	metaData_fileType: z.string().min(1, "File type is required").optional(),
// 	metaData_confidentiality: z
// 		.enum(["Public", "Internal", "Confidential", "Restricted"])
// 		.optional(),

// });

// type DocumentMetadataFormValues = z.infer<typeof documentMetadataSchema>;

// interface MetadataStepProps {
// 	onMetadataComplete: (data: LedgerType) => void;
// }

// export default function DocumentMetadataForm({
// 	onMetadataComplete,
// }: MetadataStepProps) {
// 	const [preview, setPreview] = useState<MetadataStepProps | null>(
// 		null
// 	);

// 	const form = useForm<MetadataStepProps>({
// 		// resolver: zodResolver(documentMetadataSchema),
// 		defaultValues: {
// 			metadata_keywords: "",
// 			metadata_tags: "",
// 		  metadata_fileType: "",
// 		  metadata_confidentiality: "Internal",

// 		},
// 	});

// 	function onSubmit(data: DocumentMetadataFormValues) {
// 		setPreview(data);
// 		console.log(data);
// 		onMetadataComplete(data);
// 	}

// 	return (
// 		<div className="container mx-auto p-4 mb-20">
// 			<h1 className="text-2xl text-center font-bold mb-6">
// 				Document Metadata Form (Optional)
// 			</h1>
// 			<div className="grid gap-6 md:grid-cols-2">
// 				<Card>
// 					<CardHeader>
// 						<CardTitle>Document Metadata</CardTitle>
// 						<CardDescription>
// 							Enter the metadata for your document
// 						</CardDescription>
// 					</CardHeader>
// 					<CardContent>
// 						<Form {...form}>
// 							<form
// 								onSubmit={form.handleSubmit(onSubmit)}
// 								className="space-y-4"
// 							>

// 								<FormField
// 									control={form.control}
// 									name="metaData_keywords"
// 									render={({ field }) => (
// 										<FormItem>
// 											<FormLabel>Keywords</FormLabel>
// 											<FormControl>
// 												<Input
// 													placeholder="Enter keywords, separated by commas"
// 													{...field}
// 												/>
// 											</FormControl>
// 											<FormDescription>
// 												Relevant keywords for your document
// 											</FormDescription>
// 											<FormMessage />
// 										</FormItem>
// 									)}
// 								/>
// 								<FormField
// 									control={form.control}
// 									name="metaData_tags"
// 									render={({ field }) => (
// 										<FormItem>
// 											<FormLabel>Tags</FormLabel>
// 											<FormControl>
// 												<Input
// 													placeholder="Enter tags, separated by commas"
// 													{...field}
// 												/>
// 											</FormControl>
// 											<FormDescription>
// 												Tags to categorize your document
// 											</FormDescription>
// 											<FormMessage />
// 										</FormItem>
// 									)}
// 								/>

// 								<FormField
// 									control={form.control}
// 									name="metaData_fileType"
// 									render={({ field }) => (
// 										<FormItem>
// 											<FormLabel>File Type</FormLabel>
// 											<FormControl>
// 												<Input
// 													placeholder="Enter file type (e.g., PDF, DOCX)"
// 													{...field}
// 												/>
// 											</FormControl>
// 											<FormMessage />
// 										</FormItem>
// 									)}
// 								/>

// 								<FormField
// 									control={form.control}
// 									name="metaData_status"
// 									render={({ field }) => (
// 										<FormItem>
// 											<FormLabel>Status</FormLabel>
// 											<FormControl>
// 												<select
// 													className="w-full p-2 border rounded"
// 													{...field}
// 												>
// 													<option value="Draft">Draft</option>
// 													<option value="In Review">In Review</option>
// 													<option value="Approved">Approved</option>
// 													<option value="Published">Published</option>
// 													<option value="Archived">Archived</option>
// 												</select>
// 											</FormControl>
// 											<FormMessage />
// 										</FormItem>
// 									)}
// 								/>
// 								<FormField
// 									control={form.control}
// 									name="metaData_confidentiality"
// 									render={({ field }) => (
// 										<FormItem>
// 											<FormLabel>Confidentiality</FormLabel>
// 											<FormControl>
// 												<select
// 													className="w-full p-2 border rounded"
// 													{...field}
// 												>
// 													<option value="Public">Public</option>
// 													<option value="Internal">Internal</option>
// 													<option value="Confidential">Confidential</option>
// 													<option value="Restricted">Restricted</option>
// 												</select>
// 											</FormControl>
// 											<FormMessage />
// 										</FormItem>
// 									)}
// 								/>
// 								<Button type="submit" className="w-full">
// 									Generate Metadata
// 								</Button>
// 							</form>
// 						</Form>
// 					</CardContent>
// 				</Card>

// 				<Card>
// 					<CardHeader>
// 						<CardTitle>Metadata Preview</CardTitle>
// 						<CardDescription>
// 							How your document metadata might be displayed
// 						</CardDescription>
// 					</CardHeader>
// 					<CardContent>
// 						{preview ? (
// 							<div className="space-y-4">
// 								<div>
// 									<h2 className="text-xl font-semibold">
// 										{preview.metaData_title}
// 									</h2>
// 									<p className="text-sm text-gray-500">
// 										Version {preview.metaData_version}
// 									</p>
// 									<p className="text-sm">{preview.metaData_description}</p>
// 								</div>
// 								<div className="flex flex-wrap gap-2">
// 									<Badge variant="secondary">{preview.metaData_status}</Badge>
// 									<Badge variant="outline">
// 										{preview.metaData_confidentiality}
// 									</Badge>
// 									<Badge>{preview.metaData_fileType}</Badge>
// 								</div>
// 								<div>
// 									<p>
// 										<strong>Author:</strong> {preview.metaData_author}
// 									</p>
// 									<p>
// 										<strong>Created:</strong> {preview.metaData_dateCreated}
// 									</p>
// 									<p>
// 										<strong>Last Modified:</strong>{" "}
// 										{preview.metaData_lastModified}
// 									</p>
// 									<p>
// 										<strong>Category:</strong> {preview.metaData_category}
// 									</p>
// 									<p>
// 										<strong>Language:</strong> {preview.metaData_language}
// 									</p>
// 								</div>
// 								<div>
// 									<p>
// 										<strong>Keywords:</strong>{" "}
// 										{preview.metaData_keywords
// 											?.split(",")
// 											.map((keyword) => keyword.trim())
// 											.join(", ") || ""}
// 									</p>
// 								</div>
// 								<div>
// 									<p>
// 										<strong> Tags:</strong>
// 									</p>
// 									<div className="flex flex-wrap gap-2 mt-1">
// 										{preview.metaData_tags?.split(",").map((tag, index) => (
// 											<Badge key={index} variant="secondary">
// 												{tag.trim()}
// 											</Badge>
// 										))}
// 									</div>
// 								</div>
// 							</div>
// 						) : (
// 							<p className="text-gray-500 italic">
// 								Fill out the form and submit to see a preview of your document
// 								metadata
// 							</p>
// 						)}
// 					</CardContent>
// 				</Card>
// 			</div>
// 		</div>
// 	);
// }
