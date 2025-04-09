import { OppdragsLinje } from "../types/Oppdragslinje";
import { formatDate, formatDateTime } from "./commonUtil";

export function createCsv(oppdragslinjer: Array<OppdragsLinje>) {
  const csvHeaders = [
    "Linje",
    "Klassekode",
    "Vedtak fom",
    "Vedtak tom",
    "Sats",
    "Satstype",
    "Status",
    "Status fom",
    "Linje ref",
    "Attestert",
    "Delytelse",
    "Utbetales til",
    "Refunderes",
    "Vedtakssats",
    "Registrert i Oppdragssystemet",
    "Brukerid",
  ].join(";");

  const csvData = oppdragslinjer.map((oppdragslinje) => {
    return [
      oppdragslinje.linjeId,
      oppdragslinje.kodeKlasse,
      formatDate(oppdragslinje.datoVedtakFom),
      formatDate(oppdragslinje.datoVedtakTom),
      oppdragslinje.sats,
      oppdragslinje.typeSats,
      oppdragslinje.kodeStatus,
      formatDate(oppdragslinje.datoFom),
      oppdragslinje.linjeIdKorr,
      oppdragslinje.attestert == "J" ? "Ja" : "Nei",
      oppdragslinje.delytelseId,
      oppdragslinje.utbetalesTilId,
      oppdragslinje.refunderesId,
      oppdragslinje.vedtakssats,
      formatDateTime(oppdragslinje.tidspktReg),
      oppdragslinje.brukerId,
    ].join(";");
  });

  return [csvHeaders, ...csvData].join("\n");
}

export function downloadAsCsv(
  gjelder: string,
  fagomraade: string,
  oppdragslinjer: Array<OppdragsLinje>,
) {
  const csv = createCsv(oppdragslinjer);
  const blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), csv], {
    type: "text/csv;charset=utf-8",
  });
  const filename = `oppdragsinfo_${gjelder}_${fagomraade}.csv`;

  const temporaryFileDownloadLink = document.createElement("a");
  temporaryFileDownloadLink.href = URL.createObjectURL(blob);
  temporaryFileDownloadLink.download = filename;

  temporaryFileDownloadLink.click();
  temporaryFileDownloadLink.remove();
}
