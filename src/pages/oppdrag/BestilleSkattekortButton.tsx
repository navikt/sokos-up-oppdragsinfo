import { ExclamationmarkTriangleFillIcon } from "@navikt/aksel-icons";
import { Button, Tooltip } from "@navikt/ds-react";
import { useEffect, useState } from "react";
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

const kanIkkeBestilleSkattekort = (status: string | null) =>
	// IKKE_FORESPURT - Vanlig for en ny person som sokos-skattekort ikke har sett før, skal kunne bestille
	// ABONNERER IKKE - Vanlig for folk som har skattekort for året før, da skal man kunne bestille
	// FEILET_I_BESTILLING, UKJENT - noe feil har skjedd tidligere, da kan man prøve å bestille igjen.
	//
	// IKKE_BESTILT, BESTILT, VENTER_UTSENDING - holder på å bestille, ikke mulig å bestille igjen
	// ABONNERER - Allerede abonnent, OS bør ha skattekortet, og også få det når det skjer endring
	// UGYLDIG FNR, UGYLDIG_FORSYSTEM, SKJERMET - skal ikke kunne bestille
	!status ||
	[
		"UGYLDIG_FNR",
		"UGYLDIG_FORSYSTEM",
		"IKKE_BESTILT",
		"BESTILT",
		"VENTER_UTSENDING",
		"ABONNERER",
		"SKJERMET",
	].includes(status);

// Når man trykker bestill, vet vi at status er enten IKKE_FORESPURT, ABONNERER IKKE, FEILET_I_BESTILLING eller UKJENT
// Da venter vi og ser til den endrer seg.
// Dersom det er IKKE_BESTILT, BESTILT eller VENTER_UTSENDING vil den snart endre seg, og da skal vi fortsette å sjekke
const skalSlutteAaRefresheSkattekortstatus = (status: string) =>
	![
		"IKKE_FORESPURT",
		"ABONNERER_IKKE",
		"FEILET_I_BESTILLING",
		"UKJENT",
		"IKKE_BESTILT",
		"BESTILT",
		"VENTER_UTSENDING",
	].includes(status);

export default function BestilleSkattekortButton(
	props: Readonly<BestilleSkattekortButtonProps>,
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
			if (skalSlutteAaRefresheSkattekortstatus(data.status)) {
				setShouldRefreshStatus(false);
			}
			return;
		}
		setShouldRefreshStatus(false);
	}, [data, props.setSkattekortstatus]);

	function handleClick() {
		setShouldRefreshStatus(true);
		bestillSkattekort(request)
			.then((response) => {
				if (response === "Success") {
					props.setAlertMessage({
						message:
							"Skattekort bestilles fra Skatteetaten. Det tar normalt et par minutter." +
							" Du kan lukke dette vinduet eller fortsette å arbeide i mellomtiden.",
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
						kanIkkeBestilleSkattekort(data?.status) ||
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
