import { Heading, HelpText, List } from "@navikt/ds-react";
import styles from "./SokHelpText.module.css";

export default function SokHelpText() {
	return (
		<div className={styles["sok__help-text"]}>
			<HelpText title="Søkekriterier" placement="left" strategy="fixed">
				<Heading level="2" size="small">
					Begge kriteriene må være utfylt
				</Heading>
				<List as="ul" size="small">
					<List.Item>Gjelder må være oppgitt</List.Item>
					<List.Item>Gjelder må bestå av enten 11 eller 9 siffer</List.Item>
				</List>
			</HelpText>
		</div>
	);
}
