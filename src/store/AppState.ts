import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { Oppdrag, OppdragsListe } from "../types/Oppdrag";

type AppState = {
  gjelderId: string;
  fagGruppeVisningText?: string;
  fagGruppeKode?: string;
  gjelderNavn: string;
  oppdragsListe?: OppdragsListe;
  oppdrag?: Oppdrag;
  linjeId: string;
};

type AppStateActions = {
  resetState: () => void;
  setGjelderId: (gjelderId: string) => void;
  setFagGruppeVisningText: (fagGruppeVisningText: string) => void;
  setFagGruppeKode: (fagGruppeKode: string) => void;
  setGjelderNavn: (gjelerNavn: string) => void;
  setOppdrag: (oppdrag: Oppdrag) => void;
  setOppdragsListe: (oppdragsListe: OppdragsListe) => void;
  setLinjeId: (linjeId: string) => void;
};

const initAppState = {
  gjelderId: "",
  fagGruppeVisningText: undefined,
  fagGruppeKode: undefined,
  gjelderNavn: "",
  oppdrag: undefined,
  oppdragsListe: undefined,
  linjeId: "",
};

export const useStore = create<AppState & AppStateActions>()(
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
        setOppdrag: (oppdrag: Oppdrag) => set({ oppdrag }),
        setOppdragsListe: (oppdragsListe: OppdragsListe) =>
          set({ oppdragsListe }),
        setLinjeId: (linjeId: string) => set({ linjeId }),
      }),
      {
        name: "app-state",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);
