import dayjs from "dayjs";
import { PersonIcon } from "@navikt/aksel-icons";
import { Timeline } from "@navikt/ds-react";
import { OppdragsLinje } from "../../types/Oppdragslinje";
import Linjevisning from "./Linjevisning";

interface TidslinjevisningProps {
  oppdragslinjer: OppdragsLinje[];
}

function dagerMellom(dato1: string, dato2: string) {
  const start = dayjs(dato1);
  const end_inclusive = dayjs(dato2);
  return end_inclusive.diff(start, "day") + 1;
}

function utbetalt(linje: OppdragsLinje) {
  return linje.typeSats == "DAG"
    ? linje.sats *
        dagerMellom(
          linje.datoVedtakFom,
          linje.datoVedtakTom ?? linje.datoVedtakFom,
        )
    : linje.sats;
}

function groupByVedtak(oppdragslinjer: OppdragsLinje[]) {
  const groupedByVedtak = oppdragslinjer.reduce(
    (acc, linje) => {
      const vedtakId = linje.vedtakId;
      if (!acc[vedtakId]) {
        acc[vedtakId] = { ...linje, sats: utbetalt(linje) };
      } else {
        const oldlinje = acc[vedtakId];
        acc[vedtakId] = {
          ...linje,
          sats: oldlinje.sats + utbetalt(linje),
          datoVedtakFom: oldlinje.datoVedtakFom,
        };
      }
      return acc;
    },
    {} as Record<string, OppdragsLinje>,
  );
  return Object.values(groupedByVedtak);
}

function groupByKlassekode(oppdragslinjer: OppdragsLinje[]) {
  const groupedByKlassekode = oppdragslinjer.reduce(
    (acc, linje) => {
      const klasse = linje.kodeKlasse;
      if (!acc[klasse]) {
        acc[klasse] = [];
      }
      acc[klasse].push(linje);
      return acc;
    },
    {} as Record<string, OppdragsLinje[]>,
  );

  if (Object.values(groupedByKlassekode)[0][0].typeSats != "DAG") {
    return groupedByKlassekode;
  }

  return Object.entries(groupedByKlassekode).reduce(
    (acc, [klasse, linjer]) => {
      acc[klasse] = groupByVedtak(linjer);
      return acc;
    },
    {} as Record<string, OppdragsLinje[]>,
  );
}

const Tidslinjevisning = ({ oppdragslinjer }: TidslinjevisningProps) => {
  const groupedLinjer = groupByKlassekode(oppdragslinjer);
  return (
    <div className="min-w-[800px]">
      <Timeline>
        {Object.entries(groupedLinjer).map(([klassekode, linjer]) => (
          <Timeline.Row
            key={klassekode}
            label={klassekode}
            icon={<PersonIcon aria-hidden />}
          >
            {linjer.map((linje, i) => (
              <Timeline.Period
                key={i}
                start={dayjs(linje.datoVedtakFom).toDate()}
                end={
                  linje.datoVedtakTom
                    ? dayjs(linje.datoVedtakTom).toDate()
                    : dayjs(new Date()).toDate()
                }
                status={linje.kodeStatus == "KORR" ? "info" : "success"}
                icon={
                  linje.typeSats == "DAG"
                    ? "Vedtak " + linje.vedtakId
                    : linje.linjeId
                }
                statusLabel={linje.kodeStatus}
              >
                <Linjevisning linje={linje} />
              </Timeline.Period>
            ))}
          </Timeline.Row>
        ))}
      </Timeline>
    </div>
  );
};

export default Tidslinjevisning;
