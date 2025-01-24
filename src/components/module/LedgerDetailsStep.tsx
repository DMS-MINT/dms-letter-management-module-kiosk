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

interface LedgerDetailsStepProps {
	data: LedgerType;
	updateData: (newData: Partial<LedgerType>) => void;
	onNext: () => void;
	onBack: () => void;
}

export default function LedgerDetailsStep({
	data,
	updateData,
	onNext,
	onBack,
}: LedgerDetailsStepProps) {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onNext();
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<Label htmlFor="received_at">Document Date</Label>
				<Input
					id="received_at"
					type="date"
					value={data.received_at || ""}
					onChange={(e) => updateData({ received_at: e.target.value })}
					required
				/>
			</div>
			<div>
				<Label htmlFor="ledger_subject">Ledger Subject</Label>
				<Input
					id="ledger_subject"
					value={data.ledger_subject || ""}
					onChange={(e) => updateData({ ledger_subject: e.target.value })}
					required
				/>
			</div>
			<div>
				<Label htmlFor="ledger_description">Ledger Description</Label>
				<Textarea
					id="ledger_description"
					value={data.ledger_description || ""}
					onChange={(e) => updateData({ ledger_description: e.target.value })}
					required
				/>
			</div>
			<div>
				<Label htmlFor="tracking_number">Tracking Number</Label>
				<Input
					id="tracking_number"
					value={data.tracking_number || ""}
					onChange={(e) => updateData({ tracking_number: e.target.value })}
				/>
			</div>
			<div>
				<Label htmlFor="ledger_status">Ledger Status</Label>
				<Select
					value={data.ledger_status || ""}
					onValueChange={(value) =>
						updateData({ ledger_status: value as LedgerType["ledger_status"] })
					}
				>
					<SelectTrigger id="ledger_status">
						<SelectValue placeholder="Select status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="PENDING">Pending</SelectItem>
						<SelectItem value="IN_REVIEW">In Review</SelectItem>
						<SelectItem value="APPROVED">Approved</SelectItem>
						<SelectItem value="DELIVERED">Delivered</SelectItem>
						<SelectItem value="ARCHIVED">Archived</SelectItem>
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
