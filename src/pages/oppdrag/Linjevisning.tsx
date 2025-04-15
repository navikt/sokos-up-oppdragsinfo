import { OppdragsLinje } from "../../types/Oppdragslinje";
import { formatDate } from "../../util/commonUtil";

const Linjevisning = ({ linje }: { linje: OppdragsLinje }) => {
  return (
    <div className="flex flex-col">
      <div className="text-xs text-gray-500">
        {`${formatDate(linje.datoVedtakFom)}-${formatDate(linje.datoVedtakTom)}: ${linje.sats} 
                    ${linje.typeSats == "DAG" ? "kr totalt" : "/ " + linje.typeSats.toLowerCase()}`}
      </div>
    </div>
  );
};

export default Linjevisning;
