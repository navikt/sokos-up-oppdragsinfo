import {
	ArrowsCirclepathIcon,
	CheckmarkIcon,
	XMarkIcon,
} from "@navikt/aksel-icons";
import { BodyShort, Button } from "@navikt/ds-react";
import { logUserEvent, TREFFLISTE } from "../../umami/umami";
import styles from "./ReloadButton.module.css";

export type ReloadStatus = "idle" | "success" | "error";

export default function ReloadButton({
	isLoading,
	status,
	lastUpdatedText,
	onClick,
}: {
	isLoading: boolean;
	status: ReloadStatus;
	lastUpdatedText?: string;
	onClick: () => void;
}) {
	function handleClick() {
		logUserEvent(TREFFLISTE.RELOAD);
		onClick();
	}

	// Under lasting rendrer Aksel-knappen kun sin egen spinner, derfor sendes
	// ikke ikon inn her. Etterpå viser ikonet resultatet av siste henting.
	// Ikonene er dekorative (aria-hidden) siden knappen har synlig tekst, og
	// status formidles av live-regionen med tidspunktet.
	function getIcon() {
		if (isLoading) {
			return undefined;
		}

		if (status === "success") {
			return (
				<CheckmarkIcon
					aria-hidden
					className={styles["reload__ikon--success"]}
				/>
			);
		}

		if (status === "error") {
			return (
				<XMarkIcon aria-hidden className={styles["reload__ikon--error"]} />
			);
		}

		return <ArrowsCirclepathIcon aria-hidden />;
	}

	// Tidspunktet gjelder alltid den listen som faktisk vises, altså siste
	// vellykkede henting. Ved feil beholdes derfor forrige tidspunkt, slik at
	// bruker ser hvor gammel trefflisten er.
	return (
		<div className={styles.reload}>
			<BodyShort
				size="small"
				className={styles.reload__status}
				aria-live="polite"
			>
				{!isLoading && lastUpdatedText ? lastUpdatedText : ""}
			</BodyShort>
			<Button
				id={"reload-treffliste"}
				type="button"
				variant="secondary"
				size={"small"}
				loading={isLoading}
				icon={getIcon()}
				iconPosition="right"
				onClick={handleClick}
				data-status={status}
			>
				Last inn på nytt
			</Button>
		</div>
	);
}
