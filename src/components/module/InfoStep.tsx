import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type LedgerType } from "@/types/ledger";

interface SenderInfoStepProps {
	data: Partial<LedgerType>;
	updateData: (newData: Partial<LedgerType>) => void;
	onNext: () => void;
	onBack: () => void;
}

export default function SenderInfoStep({
	data,
	updateData,
	onNext,
	onBack,
}: SenderInfoStepProps) {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onNext();
	};
	const t = useTranslations("LedgerForm");
	// return (
	// 	<form onSubmit={handleSubmit} className="space-y-8">
	// 		{/* Document Information */}
	// 		<h2 className="text-md font-semibold shadow-md bg-muted p-2">
	// 			Document Information
	// 		</h2>

	// 		<div className="grid grid-cols-2 gap-6 px-4">
	// 			<div>
	// 				<Label htmlFor="ledger_subject">
	// 					Letter Subject
	// 					<span className="text-red-500 ml-2">*</span>
	// 				</Label>
	// 				<Input
	// 					id="ledger_subject"
	// 					value={data.ledger_subject || ""}
	// 					onChange={(e) => updateData({ ledger_subject: e.target.value })}
	// 					required
	// 				/>
	// 			</div>
	// 			<div>
	// 				<Label htmlFor="metadata_keywords">Keywords</Label>
	// 				<Input
	// 					id="metadata_keywords"
	// 					value={data.metadata_keywords || ""}
	// 					onChange={(e) => updateData({ metadata_keywords: e.target.value })}
	// 				/>
	// 			</div>
	// 		</div>

	// 		{/* Sender Information */}
	// 		<h2 className="text-md font-semibold shadow-md bg-muted p-2">
	// 			Sender Information
	// 		</h2>
	// 		<div className="grid grid-cols-3 gap-3 px-4">
	// 			<div>
	// 				<Label htmlFor="sender_name">
	// 					Sender Name
	// 					<span className="text-red-500 ml-2">*</span>
	// 				</Label>
	// 				<Input
	// 					id="sender_name"
	// 					value={data.sender_name || ""}
	// 					onChange={(e) => updateData({ sender_name: e.target.value })}
	// 					required
	// 				/>
	// 			</div>
	// 			<div>
	// 				<Label htmlFor="sender_phone_number">
	// 					Sender Phone Number
	// 					<span className="text-red-500 ml-2">*</span>
	// 				</Label>
	// 				<Input
	// 					id="sender_phone_number"
	// 					value={data.sender_phone_number || ""}
	// 					onChange={(e) =>
	// 						updateData({ sender_phone_number: e.target.value })
	// 					}
	// 					required
	// 				/>
	// 			</div>
	// 			<div>
	// 				<Label htmlFor="sender_email">Sender Email</Label>
	// 				<Input
	// 					id="sender_email"
	// 					type="email"
	// 					value={data.sender_email || ""}
	// 					onChange={(e) => updateData({ sender_email: e.target.value })}
	// 				/>
	// 			</div>
	// 		</div>

	// 		{/* Carrier Information */}
	// 		<h2 className="text-md font-semibold shadow-md bg-muted p-2">
	// 			Carrier Information
	// 		</h2>
	// 		<div className="grid grid-cols-3 gap-3 px-4">
	// 			<div>
	// 				<Label htmlFor="carrier_person_first_name">
	// 					Carrier First Name
	// 					<span className="text-red-500 ml-2">*</span>
	// 				</Label>
	// 				<Input
	// 					id="carrier_person_first_name"
	// 					value={data.carrier_person_first_name || ""}
	// 					onChange={(e) =>
	// 						updateData({ carrier_person_first_name: e.target.value })
	// 					}
	// 					required
	// 				/>
	// 			</div>
	// 			<div>
	// 				<Label htmlFor="carrier_person_middle_name">
	// 					Carrier Middle Name
	// 				</Label>
	// 				<Input
	// 					id="carrier_person_middle_name"
	// 					value={data.carrier_person_middle_name || ""}
	// 					onChange={(e) =>
	// 						updateData({ carrier_person_middle_name: e.target.value })
	// 					}
	// 				/>
	// 			</div>
	// 			<div>
	// 				<Label htmlFor="carrier_phone_number">
	// 					Carrier Phone Number
	// 					<span className="text-red-500 ml-2">*</span>
	// 				</Label>
	// 				<Input
	// 					id="carrier_phone_number"
	// 					value={data.carrier_phone_number || ""}
	// 					onChange={(e) =>
	// 						updateData({ carrier_phone_number: e.target.value })
	// 					}
	// 					required
	// 				/>
	// 			</div>
	// 		</div>

	// 		{/* Recipient Information */}
	// 		<h2 className="text-md font-semibold shadow-md bg-muted  p-2">
	// 			Recipient Information
	// 		</h2>
	// 		<div className="grid grid-cols-2 gap-6 px-4">
	// 			<div>
	// 				<Label htmlFor="recipient_name">
	// 					Recipient Name
	// 					<span className="text-red-500 ml-2">*</span>
	// 				</Label>
	// 				<Input
	// 					id="recipient_name"
	// 					value={data.recipient_name || ""}
	// 					onChange={(e) => updateData({ recipient_name: e.target.value })}
	// 					required
	// 				/>
	// 			</div>
	// 			<div>
	// 				<Label htmlFor="recipient_phone_number">Recipient Phone Number</Label>
	// 				<Input
	// 					id="recipient_phone_number"
	// 					value={data.recipient_phone_number || ""}
	// 					onChange={(e) =>
	// 						updateData({ recipient_phone_number: e.target.value })
	// 					}
	// 				/>
	// 			</div>
	// 			<div>
	// 				<Label htmlFor="job_title">Job Title</Label>
	// 				<Input
	// 					id="job_title"
	// 					value={data.job_title || ""}
	// 					onChange={(e) => updateData({ job_title: e.target.value })}
	// 				/>
	// 			</div>
	// 			<div>
	// 				<Label htmlFor="department">Department</Label>
	// 				<Input
	// 					id="department"
	// 					value={data.department || ""}
	// 					onChange={(e) => updateData({ department: e.target.value })}
	// 				/>
	// 			</div>
	// 		</div>

	// 		<div className="flex justify-between mt-6">
	// 			<Button
	// 				type="button"
	// 				variant="outline"
	// 				className="px-6"
	// 				onClick={onBack}
	// 			>
	// 				Back
	// 			</Button>
	// 			<Button type="submit" className="px-6">
	// 				Next
	// 			</Button>
	// 		</div>
	// 	</form>
	// );
	return (
		<form onSubmit={handleSubmit} className="space-y-8">
			{/* Sender Information */}
			<h2 className="text-md font-semibold shadow-md bg-muted p-2">
				{t("sender_info")}
			</h2>
			<div className="grid grid-cols-3 gap-3 px-4">
				{/* Carrier First Name */}
				<div>
					<Label htmlFor="carrier_person_first_name">
						{t("fields.carrier_person_first_name.label")}
						<span className="text-red-500 ml-2">*</span>
					</Label>
					<Input
						id="carrier_person_first_name"
						value={data.carrier_person_first_name || ""}
						onChange={(e) =>
							updateData({ carrier_person_first_name: e.target.value })
						}
						required
						placeholder={t("fields.carrier_person_first_name.placeholder")}
					/>
				</div>

				{/* Carrier Middle Name */}
				<div>
					<Label htmlFor="carrier_person_middle_name">
						{t("fields.carrier_person_middle_name.label")}
					</Label>
					<Input
						id="carrier_person_middle_name"
						value={data.carrier_person_middle_name || ""}
						onChange={(e) =>
							updateData({ carrier_person_middle_name: e.target.value })
						}
						placeholder={t("fields.carrier_person_middle_name.placeholder")}
					/>
				</div>

				{/* Sender Name */}
				<div>
					<Label htmlFor="sender_name">
						{t("fields.sender_name.label")}
						<span className="text-red-500 ml-2">*</span>
					</Label>
					<Input
						id="sender_name"
						value={data.sender_name || ""}
						onChange={(e) => updateData({ sender_name: e.target.value })}
						required
						placeholder={t("fields.sender_name.placeholder")}
					/>
				</div>

				{/* Sender Phone Number */}
				<div>
					<Label htmlFor="sender_phone_number">
						{t("fields.sender_phone_number.label")}
						<span className="text-red-500 ml-2">*</span>
					</Label>
					<Input
						id="sender_phone_number"
						value={data.sender_phone_number || ""}
						onChange={(e) =>
							updateData({ sender_phone_number: e.target.value })
						}
						required
						placeholder={t("fields.sender_phone_number.placeholder")}
					/>
				</div>

				{/* Sender Email */}
				<div>
					<Label htmlFor="sender_email">{t("fields.sender_email.label")}</Label>
					<Input
						id="sender_email"
						type="email"
						value={data.sender_email || ""}
						onChange={(e) => updateData({ sender_email: e.target.value })}
						placeholder={t("fields.sender_email.placeholder")}
					/>
				</div>

				{/* Recipient Name */}
				<div>
					<Label htmlFor="recipient_name">
						{t("fields.recipient_name.label")}
						<span className="text-red-500 ml-2">*</span>
					</Label>
					<Input
						id="recipient_name"
						value={data.recipient_name || ""}
						onChange={(e) => updateData({ recipient_name: e.target.value })}
						required
						placeholder={t("fields.recipient_name.placeholder")}
					/>
				</div>

				{/* Recipient Phone Number */}
				<div>
					<Label htmlFor="recipient_phone_number">
						{t("fields.recipient_phone_number.label")}
					</Label>
					<Input
						id="recipient_phone_number"
						value={data.recipient_phone_number || ""}
						onChange={(e) =>
							updateData({ recipient_phone_number: e.target.value })
						}
						placeholder={t("fields.recipient_phone_number.placeholder")}
					/>
				</div>

				{/* Job Title */}
				<div>
					<Label htmlFor="job_title">{t("fields.job_title.label")}</Label>
					<Input
						id="job_title"
						value={data.job_title || ""}
						onChange={(e) => updateData({ job_title: e.target.value })}
						placeholder={t("fields.job_title.placeholder")}
					/>
				</div>

				{/* Department */}
				<div>
					<Label htmlFor="department">{t("fields.department.label")}</Label>
					<Input
						id="department"
						value={data.department || ""}
						onChange={(e) => updateData({ department: e.target.value })}
						placeholder={t("fields.department.placeholder")}
					/>
				</div>

				{/* Carrier Phone Number */}
				<div>
					<Label htmlFor="carrier_phone_number">
						{t("fields.carrier_phone_number.label")}
						<span className="text-red-500 ml-2">*</span>
					</Label>
					<Input
						id="carrier_phone_number"
						value={data.carrier_phone_number || ""}
						onChange={(e) =>
							updateData({ carrier_phone_number: e.target.value })
						}
						required
						placeholder={t("fields.carrier_phone_number.placeholder")}
					/>
				</div>
			</div>

			<div className="flex justify-between mt-6">
				<Button
					type="button"
					variant="outline"
					className="px-6"
					onClick={onBack}
				>
					{t("fields.actions.back")}
				</Button>
				<Button type="submit" className="px-6">
					{t("fields.actions.next")}
				</Button>
			</div>
		</form>
	);
}
