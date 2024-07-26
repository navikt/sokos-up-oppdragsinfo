import { EnhetsType, EnhetsTypeEnum } from "../../types/EnhetsType";
import commonstyles from "../../styles/common-styles.module.css";
import { formatDate } from "../../util/commonUtil";
import LabelText from "../common/LabelText";

const enhetstypetekst: Record<EnhetsTypeEnum, string> = {
  BEH: "Ansvarssted",
  BOS: "Kostnadssted",
  ANKE: "Ankeenhet",
};

const EnhetLabel = ({ enhet }: { enhet: EnhetsType }) => (
  <div className={commonstyles.row}>
    <div className={commonstyles.bold}>{enhetstypetekst[enhet.type]}:</div>
    <div>{enhet.enhet}</div>
    ,
    <LabelText label={"Dato fom"} text={formatDate(enhet.datoFom)} />
  </div>
);

export default EnhetLabel;
