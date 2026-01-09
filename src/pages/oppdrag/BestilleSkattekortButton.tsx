import { ExclamationmarkTriangleFillIcon } from "@navikt/aksel-icons";
import { Button, Tooltip } from "@navikt/ds-react";
import React, { useEffect, useState } from "react";
import {
	bestillSkattekort,
	useFetchSkattekortStatus,
} from "../../api/apiService";
import type { ForespoerselRequest } from "../../api/models/ForespoerselRequest";

interface BestilleSkattekortButtonProps {
	gjelderId: string;
	error: Error | null;
	setSkattekortstatus: (status: string) => void;
	setAlertMessage: (
		message: {
			message: string;
			variant: "success" | "error" | "warning";
		} | null,
	) => void;
}

export default function BestilleSkattekortButton(
	props: BestilleSkattekortButtonProps,
) {
	const request: ForespoerselRequest = {
		personIdent: props.gjelderId,
		aar: new Date().getFullYear(),
		forsystem: "OS",
	};

	const [shouldRefreshStatus, setShouldRefreshStatus] = useState(false);
	const { data } = useFetchSkattekortStatus(request, shouldRefreshStatus);

	useEffect(() => {
		if (data?.status) {
			props.setSkattekortstatus(data.status);
			if (
				["IKKE_BESTILT", "BESTILT", "VENTER_PAA_UTSENDING"].includes(
					data.status,
				)
			) {
				// Det er først når data kommer tilbake fra kallet at vi evt rerendrer basert på shouldRefreshStatus
				// Derfor er det trygt å sette state her uten at vi risikerer en uendelig loop
				setShouldRefreshStatus(true);
			} else if (["UGYLDIG_FNR", "SENDT_FORSYSTEM"].includes(data.status)) {
				setShouldRefreshStatus(false);
			}
		}
	}, [data, props]);

	function handleClick() {
		setShouldRefreshStatus(true);
		bestillSkattekort(request)
			.then((response) => {
				if (response === "Success") {
					props.setAlertMessage({
						message:
							"Skattekort bestilles fra Skatteetaten. Det tar normalt et par minutter." +
							"Du kan lukke dette vinduet eller fortsette å arbeide i mellomtiden.",
						variant: "success",
					});
				}
			})
			.catch((error) => {
				props.setAlertMessage({ message: error.message, variant: "error" });
			});
	}

	return (
		<Tooltip content={props.error ? props.error.message : "Bestill skattekort"}>
			<span>
				<Button
					size={"small"}
					variant={"secondary-neutral"}
					onClick={handleClick}
					loading={shouldRefreshStatus}
					disabled={
						!data ||
						!!props.error ||
						["API_ERROR", "UGYLDIG_FNR", "SENDT_FORSYSTEM"].includes(
							data?.status,
						) ||
						shouldRefreshStatus
					}
					icon={!!props.error && <ExclamationmarkTriangleFillIcon />}
				>
					Bestill skattekort
				</Button>
			</span>
		</Tooltip>
	);
}
