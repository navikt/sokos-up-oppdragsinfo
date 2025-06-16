import LabelText from "../../components/LabelText";
import commonstyles from "../../styles/bem-common.module.css";
import { Enhet, EnhetsType } from "../../types/EnhetsType";
import { formatDate } from "../../util/commonUtil";

const enhetstypetekst: Record<EnhetsType, string> = {
  BEH: "Ansvarssted",
  BOS: "Kostnadssted",
  ANKE: "Ankeenhet",
};

export default function EnhetLabel({ enhet }: { enhet: Enhet }) {
  return (
    <div className={commonstyles["flex--row-gap-sm"]}>
      <div className={commonstyles["text--bold"]}>
        {enhetstypetekst[enhet.typeEnhet]}:
      </div>
      <div>{enhet.enhet}</div>
      <LabelText label={"Dato fom"} text={formatDate(enhet.datoFom)} />
    </div>
  );
}
