"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MetadataStepProps {
	initialMetadata: {
		title: string;
		author: string;
		date: string;
	};
	onBack: () => void;
	onSubmit: (metadata: { title: string; author: string; date: string }) => void;
}

export default function MetadataStep({
	initialMetadata,
	onBack,
	onSubmit,
}: MetadataStepProps) {
	const [metadata, setMetadata] = useState(initialMetadata);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setMetadata((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(metadata);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<Label htmlFor="title">Document Title</Label>
				<Input
					id="title"
					name="title"
					value={metadata.title}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<Label htmlFor="author">Author</Label>
				<Input
					id="author"
					name="author"
					value={metadata.author}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<Label htmlFor="date">Date</Label>
				<Input
					id="date"
					name="date"
					type="date"
					value={metadata.date}
					onChange={handleChange}
					required
				/>
			</div>
			<div className="flex justify-between">
				<Button type="button" variant="outline" onClick={onBack}>
					Back
				</Button>
				<Button type="submit">Submit</Button>
			</div>
		</form>
	);
}
