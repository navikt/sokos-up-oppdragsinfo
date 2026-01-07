import { Accordion } from "@navikt/ds-react";
import type { ReactNode } from "react";
import { LINJE, logUserEvent } from "../../umami/umami";

interface LinjeDetaljerAccordionProps {
	title: string;
	enabled: boolean;
	children: ReactNode;
}

export default function LinjeDetaljerAccordion(
	props: LinjeDetaljerAccordionProps,
) {
	return (
		<Accordion.Item
			onOpenChange={(open) => {
				logUserEvent(LINJE.ACCORDION_TOGGLED, { accordion: props.title, open });
			}}
		>
			{props.enabled && (
				<>
					<Accordion.Header>{props.title}</Accordion.Header>
					<Accordion.Content>{props.children}</Accordion.Content>
				</>
			)}
		</Accordion.Item>
	);
}
