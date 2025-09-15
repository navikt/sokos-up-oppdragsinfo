import { FagGruppe } from "../types/FagGruppe";
import { SOK, logUserEvent } from "../umami/umami";

export function logSearchEvent(gjelderId: string, fagGruppe?: FagGruppe) {
  const trimmedId = gjelderId.trim();
  const isFnr = /^(?!00)\d{11}$/.test(trimmedId);
  const isOrgnr = /^(00\d{9}|\d{9})$/.test(trimmedId);

  logUserEvent(SOK.SUBMIT, {
    fnr: isFnr,
    orgnr: isOrgnr,
    fagGruppe: fagGruppe?.type,
  });
}
