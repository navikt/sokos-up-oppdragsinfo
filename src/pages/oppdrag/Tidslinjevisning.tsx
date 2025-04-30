import dayjs from "dayjs";
import { PersonIcon } from "@navikt/aksel-icons";
import { Timeline } from "@navikt/ds-react";
import { OppdragsLinje } from "../../types/Oppdragslinje";
import { formatDate } from "../../util/commonUtil";
import {
  farge,
  groupByKlassekode,
  icon,
  optDate,
} from "../../util/tidslinjeberegninger";

interface TidslinjevisningProps {
  oppdragslinjer: OppdragsLinje[];
}

const Tidslinjevisning = ({ oppdragslinjer }: TidslinjevisningProps) => {
  return (
    <div className="min-w-[800px]">
      <Timeline>
        {Object.entries(groupByKlassekode(oppdragslinjer)).map(
          ([konto, linjer]) => (
            <Timeline.Row
              key={konto}
              label={konto}
              icon={<PersonIcon aria-hidden />}
            >
              {linjer.map((linje, i) => (
                <Timeline.Period
                  key={i}
                  start={dayjs(linje.datoVedtakFom).toDate()}
                  end={optDate(linje.datoVedtakTom)}
                  status={farge(linje.kodeStatus)}
                  icon={icon(linje)}
                  statusLabel={linje.kodeStatus}
                >
                  {`${[formatDate(linje.datoVedtakFom), formatDate(linje.datoVedtakTom)].filter((s) => !!s).join("-")}: ${linje.sats} 
                    ${linje.typeSats == "DAG" ? "kr totalt" : "/" + linje.typeSats.toLowerCase()}`}
                </Timeline.Period>
              ))}
            </Timeline.Row>
          ),
        )}
      </Timeline>
    </div>
  );
};

export default Tidslinjevisning;
