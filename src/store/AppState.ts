import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { Oppdrag, OppdragsListe } from "../types/OppdragsListe";

type AppState = {
  gjelderId: string;
  faggruppeVisningText?: string;
  fagGruppeKode?: string;
  gjelderNavn: string;
  oppdragsListe?: OppdragsListe;
  oppdrag?: Oppdrag;
};

type AppStateActions = {
  resetState: () => void;
  setGjelderId: (gjelderId: string) => void;
  setFaggruppeVisningText: (faggruppeVisningText: string) => void;
  setfagGruppeKode: (fagGruppeKode: string) => void;
  setOppdrag: (oppdrag: Oppdrag) => void;
  setGjelderNavn: (gjelerNavn: string) => void;
};

const initAppState = {
  gjelderId: "",
  faggruppeVisningText: undefined,
  fagGruppeKode: undefined,
  gjelderNavn: "",
  oppdragsListe: undefined,
  oppdrag: undefined,
};

export const useAppState = create<AppState & AppStateActions>()(
  devtools(
    persist(
      (set) => ({
        ...initAppState,
        resetState: () => set({ ...initAppState }),
        setGjelderId: (gjelderId: string) => set({ gjelderId }),
        setFaggruppeVisningText: (faggruppeVisningText: string) =>
          set({ faggruppeVisningText }),
        setfagGruppeKode: (fagGruppeKode: string) => set({ fagGruppeKode }),
        setGjelderNavn: (gjelderNavn: string) => set({ gjelderNavn }),
        setOppdrag: (oppdrag: Oppdrag) => set({ oppdrag: oppdrag }),
      }),
      {
        name: "app-state",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);
