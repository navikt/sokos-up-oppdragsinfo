import { ArrowsCirclepathIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { logUserEvent, TREFFLISTE } from "../../umami/umami";

export default function ReloadButton({
	isLoading,
	onClick,
}: {
	isLoading: boolean;
	onClick: () => void;
}) {
	function handleClick() {
		logUserEvent(TREFFLISTE.RELOAD);
		onClick();
	}

	return (
		<Button
			id={"reload-treffliste"}
			type="button"
			variant="secondary"
			size={"small"}
			loading={isLoading}
			icon={<ArrowsCirclepathIcon title="Last inn på nytt ikon" />}
			iconPosition="right"
			onClick={handleClick}
		>
			Last inn på nytt
		</Button>
	);
}
