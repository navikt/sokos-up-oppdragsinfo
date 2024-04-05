import commonstyles from "../../util/common-styles.module.css";
import LabelText from "../common/LabelText";
import { formatDate } from "../../util/commonUtils";
import { Enhet, Enhetstype } from "../../models/Enhet";

const enhetstypetekst: Record<Enhetstype, string> = {
  BEH: "Ansvarssted",
  BOS: "Kostnadssted",
  ANKE: "Ankeenhet",
};

const EnhetVisning = ({ enhet }: { enhet: Enhet }) => (
  <div className={commonstyles.row}>
    <div className={commonstyles.bold}>{enhetstypetekst[enhet.type]}:</div>
    <div>{enhet.enhet}</div>
    ,
    <LabelText label={"Dato fom"} text={formatDate(enhet.datoFom)} />
  </div>
);

export default EnhetVisning;
