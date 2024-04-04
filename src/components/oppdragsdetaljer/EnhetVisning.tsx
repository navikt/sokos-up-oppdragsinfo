import commonstyles from "../../util/common-styles.module.css";
import LabelText from "../common/LabelText";
import { formatDate } from "../../util/commonUtils";
import { Enhet } from "../../models/Enhet";

const EnhetVisning = ({ enhet }: { enhet: Enhet }) => (
  <div className={commonstyles.row}>
    <div className={commonstyles.bold}>{enhet.type === "BEH" ? "Kostnadssted" : "Ansvarssted"}:</div>
    <div>{enhet.enhet}</div>,
    <LabelText label={"Dato fom"} text={formatDate(enhet.datoFom)} />
  </div>
);

export default EnhetVisning;
