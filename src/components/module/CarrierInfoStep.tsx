import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { LedgerType } from "../page";

interface CarrierInfoStepProps {
	data: LedgerType;
	updateData: (newData: Partial<LedgerType>) => void;
	onNext: () => void;
	onBack: () => void;
}

export default function CarrierInfoStep({
	data,
	updateData,
	onNext,
	onBack,
}: CarrierInfoStepProps) {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onNext();
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<Label htmlFor="carrier_person_first_name">Carrier First Name</Label>
				<Input
					id="carrier_person_first_name"
					value={data.carrier_person_first_name || ""}
					onChange={(e) =>
						updateData({ carrier_person_first_name: e.target.value })
					}
					required
				/>
			</div>
			<div>
				<Label htmlFor="carrier_person_middle_name">Carrier Middle Name</Label>
				<Input
					id="carrier_person_middle_name"
					value={data.carrier_person_middle_name || ""}
					onChange={(e) =>
						updateData({ carrier_person_middle_name: e.target.value })
					}
				/>
			</div>
			<div>
				<Label htmlFor="carrier_phone_number">Carrier Phone Number</Label>
				<Input
					id="carrier_phone_number"
					value={data.carrier_phone_number || ""}
					onChange={(e) => updateData({ carrier_phone_number: e.target.value })}
					required
				/>
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
