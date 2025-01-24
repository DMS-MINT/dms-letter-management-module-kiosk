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

import type { LedgerType } from "../page";

interface RecipientInfoStepProps {
	data: LedgerType;
	updateData: (newData: Partial<LedgerType>) => void;
	onNext: () => void;
	onBack: () => void;
}

export default function RecipientInfoStep({
	data,
	updateData,
	onNext,
	onBack,
}: RecipientInfoStepProps) {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onNext();
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<Label htmlFor="recipient_name">Recipient Name</Label>
				<Input
					id="recipient_name"
					value={data.recipient_name || ""}
					onChange={(e) => updateData({ recipient_name: e.target.value })}
					required
				/>
			</div>
			<div>
				<Label htmlFor="recipient_phone_number">Recipient Phone Number</Label>
				<Input
					id="recipient_phone_number"
					value={data.recipient_phone_number || ""}
					onChange={(e) =>
						updateData({ recipient_phone_number: e.target.value })
					}
					required
				/>
			</div>
			<div>
				<Label htmlFor="job_title">Job Title</Label>
				<Input
					id="job_title"
					value={data.job_title || ""}
					onChange={(e) => updateData({ job_title: e.target.value })}
				/>
			</div>
			<div>
				<Label htmlFor="department">Department</Label>
				<Input
					id="department"
					value={data.department || ""}
					onChange={(e) => updateData({ department: e.target.value })}
				/>
			</div>
			<div>
				<Label htmlFor="sector">Sector</Label>
				<Input
					id="sector"
					value={data.sector || ""}
					onChange={(e) => updateData({ sector: e.target.value })}
				/>
			</div>
			<div>
				<Label htmlFor="received_at">Received At</Label>
				<Input
					id="received_at"
					type="datetime-local"
					value={data.received_at || ""}
					onChange={(e) => updateData({ received_at: e.target.value })}
				/>
			</div>
			<div>
				<Label htmlFor="priority">Priority</Label>
				<Select
					value={data.priority || ""}
					onValueChange={(value) =>
						updateData({ priority: value as LedgerType["priority"] })
					}
				>
					<SelectTrigger id="priority">
						<SelectValue placeholder="Select priority" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="LOW">Low</SelectItem>
						<SelectItem value="MEDIUM">Medium</SelectItem>
						<SelectItem value="HIGH">High</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="flex justify-between">
				<Button type="button" variant="outline" onClick={onBack}>
					Back
				</Button>
				<Button type="submit">Next</Button>
			</div>
		</form>
	);
}
