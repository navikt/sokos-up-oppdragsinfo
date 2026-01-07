import { HelpText } from "@navikt/ds-react";

export default function SokHelp() {
	return (
		<HelpText title="a11y-title" placement="left" strategy="fixed">
			<p>
				<i>Begge kriteriene må være utfylt:</i>
			</p>
			<p>- Gjelder må være oppgitt</p>
			<p>- Gjelder må bestå av enten 11 eller 9 siffer</p>
		</HelpText>
	);
}
