import commonstyles from "../../styles/common-styles.module.css";
import { EnhetsType, EnhetsTypeEnum } from "../../types/EnhetsType";
import { formatDate } from "../../util/commonUtil";
import LabelText from "../common/LabelText";

const enhetstypetekst: Record<EnhetsTypeEnum, string> = {
  BEH: "Ansvarssted",
  BOS: "Kostnadssted",
  ANKE: "Ankeenhet",
};

export default function EnhetLabel({ enhet }: { enhet: EnhetsType }) {
  return (
    <div className={commonstyles.row}>
      <div className={commonstyles.bold}>{enhetstypetekst[enhet.type]}:</div>
      <div>{enhet.enhet}</div>
      <LabelText label={"Dato fom"} text={formatDate(enhet.datoFom)} />
    </div>
  );
}
