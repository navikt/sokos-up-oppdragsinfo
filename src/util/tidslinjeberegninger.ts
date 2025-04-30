import dayjs from "dayjs";
import { OppdragsLinje } from "../types/Oppdragslinje";

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

export function groupByKlassekode(oppdragslinjer: OppdragsLinje[]) {
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

export function optDate(date: string | undefined) {
  return date ? dayjs(date).toDate() : dayjs(new Date()).toDate();
}

export function farge(status: string) {
  switch (status) {
    case "KORR":
      return "info";
    default:
      return "success";
  }
}

export function icon(linje: OppdragsLinje) {
  if (linje.typeSats == "DAG") {
    return "Vedtak " + linje.vedtakId;
  } else if (linje.typeSats == "MND") {
    return linje.linjeId;
  } else {
    return linje.kodeKlasse;
  }
}
