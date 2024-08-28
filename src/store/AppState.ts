import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { Oppdrag, OppdragsListe } from "../types/OppdragsListe";

type AppState = {
  gjelderId: string;
  fagGruppeVisningText?: string;
  fagGruppeKode?: string;
  gjelderNavn: string;
  oppdragsListe?: OppdragsListe;
  oppdrag?: Oppdrag;
};

type AppStateActions = {
  resetState: () => void;
  setGjelderId: (gjelderId: string) => void;
  setFagGruppeVisningText: (fagGruppeVisningText: string) => void;
  setFagGruppeKode: (fagGruppeKode: string) => void;
  setOppdrag: (oppdrag: Oppdrag) => void;
  setGjelderNavn: (gjelerNavn: string) => void;
};

const initAppState = {
  gjelderId: "",
  fagGruppeVisningText: undefined,
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
        setFagGruppeVisningText: (fagGruppeVisningText: string) =>
          set({ fagGruppeVisningText }),
        setFagGruppeKode: (fagGruppeKode: string) => set({ fagGruppeKode }),
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
