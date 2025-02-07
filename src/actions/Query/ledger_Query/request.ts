import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { get_tracker, setLedger, update_ledger } from "@/actions/ledger/action";
import { useAppDispatch } from "@/hooks/storehooks";
import useToastMutation from "@/hooks/useToastMutation";
import { setSubmitedData } from "@/lib/store/redux/submitedSlice";

export const useAddLedger = () => {
	const dispatch = useAppDispatch();

	return useToastMutation<any>("addLedger", setLedger, "add file", {
		onSuccess: (data, variables) => {
			if (
				data?.data &&
				"id" in data.data &&
				"tracking_number" in data.data &&
				"sender_name" in data.data &&
				"metadata_keywords" in data.data &&
				"recipient_name" in data.data &&
				"ledger_subject" in data.data &&
				"ledger_pdf" in data.data
			) {
				const newData = {
					id: data.data.id as string,
					tracking_number: data.data.tracking_number as string,
					ledger_subject: data.data.ledger_subject as string,
					sender_name: data.data.sender_name as string,
					metadata_keywords: data.data.metadata_keywords as string,
					recipient_name: data.data.recipient_name as string,
					ledger_pdf: data.data.ledger_pdf as string,
				};

				dispatch(setSubmitedData(newData));
				console.log("Ledger created successfully:", data.message);
				console.log("New Ledger Data:", variables);
			} else {
				console.error("Invalid data structure:", data);
			}
		},
		onError: (error) => {
			console.error("Error creating ledger:", error);
		},
	});
};

export const useUpdateLedger = () => {
	return useToastMutation<any>("addLedger", update_ledger, "submit ledger", {
		onSuccess: (data, variables) => {
			console.log("Ledger created successfully:", data.message);
			console.log("New Ledger Data:", variables);
		},
		onError: (error) => {
			console.error("Error creating ledger:", error);
		},
	});
};

export const useGetLedgerTracker = (
	id: string | undefined,
	enable: boolean
) => {
	return useQuery({
		queryKey: ["getme"],
		queryFn: async () => {
			try {
				let data;
				if (id) {
					data = await get_tracker(id);
					return data.data;
				}
			} catch (error: any) {
				toast.error(error.message);
				throw error;
			}
		},
		enabled: enable,
	});
};
