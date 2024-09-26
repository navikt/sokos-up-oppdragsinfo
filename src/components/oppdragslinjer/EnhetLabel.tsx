import commonstyles from "../../styles/common-styles.module.css";
import { Enhetstype, EnhetstypeEnum } from "../../types/Enhetstype";
import { formatDate } from "../../util/commonUtil";
import LabelText from "../common/LabelText";

const enhetstypetekst: Record<EnhetstypeEnum, string> = {
  BEH: "Ansvarssted",
  BOS: "Kostnadssted",
  ANKE: "Ankeenhet",
};

export default function EnhetLabel({ enhet }: { enhet: Enhetstype }) {
  return (
    <div className={commonstyles.row}>
      <div className={commonstyles.bold}>{enhetstypetekst[enhet.type]}:</div>
      <div>{enhet.enhet}</div>
      <LabelText label={"Dato fom"} text={formatDate(enhet.datoFom)} />
    </div>
  );
}
