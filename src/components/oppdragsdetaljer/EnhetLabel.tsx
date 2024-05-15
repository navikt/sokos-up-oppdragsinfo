import { Enhet, Enhetstype } from "../../models/Enhet";
import commonstyles from "../../util/common-styles.module.css";
import { formatDate } from "../../util/commonUtils";
import LabelText from "../common/LabelText";

const enhetstypetekst: Record<Enhetstype, string> = {
  BEH: "Ansvarssted",
  BOS: "Kostnadssted",
  ANKE: "Ankeenhet",
};

const EnhetLabel = ({ enhet }: { enhet: Enhet }) => (
  <div className={commonstyles.row}>
    <div className={commonstyles.bold}>{enhetstypetekst[enhet.type]}:</div>
    <div>{enhet.enhet}</div>
    ,
    <LabelText label={"Dato fom"} text={formatDate(enhet.datoFom)} />
  </div>
);

export default EnhetLabel;
