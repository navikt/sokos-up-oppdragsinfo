import { HelpText } from "@navikt/ds-react";

export default function SokHelp() {
  return (
    <HelpText title="a11y-title" placement="left" strategy="fixed">
      <p>
        <i>Minimum ett av kriteriene må være utfylt:</i>
      </p>
      <p>- Gjelder id</p>
      <p>- Gjelder id må være numerisk (11 / 9 )</p>
    </HelpText>
  );
}
