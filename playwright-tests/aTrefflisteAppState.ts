import { AppState } from "../src/store/AppState";

const aTrefflisteAppState: { state: AppState; version: number } = {
  state: {
    gjelderId: "12345612345",
    gjelderNavn: "VIS BIT",
    oppdragsListe: [
      {
        fagsystemId: "2960-2024-xtest",
        oppdragsId: 73418649,
        navnFaggruppe: "Memoposteringer pensjon",
        navnFagomraade: "Balansekonti",
        kjorIdag: "N",
        typeBilag: "MEMO",
        kodeStatus: "PASS",
      },
      {
        fagsystemId: "1",
        oppdragsId: 73418656,
        navnFaggruppe: "Inntektsytelser",
        navnFagomraade: "Uføretrygd nødutbetaling",
        kjorIdag: "J",
        typeBilag: "NODU",
        kodeStatus: "PASS",
      },
      {
        fagsystemId: "2960-test1-th",
        oppdragsId: 73418731,
        navnFaggruppe: "Memoposteringer sentralisert regnskap",
        navnFagomraade: "Balansekonti sentralisering regnskap",
        kjorIdag: "N",
        typeBilag: "MEMO",
        kodeStatus: "PASS",
      },
    ],
    linjeId: "",
  },
  version: 0,
};

export default aTrefflisteAppState;
