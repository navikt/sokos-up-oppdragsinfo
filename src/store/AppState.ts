import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { OppdragsListe, Oppdrag } from "../types/Oppdrag";

type AppState = {
  gjelderId: string;
  faggruppeVisningText?: string;
  faggruppeType?: string;
  gjelderNavn: string;
  oppdragsEgenskaper?: Oppdrag
  selectedOppdragsEgenskap?: OppdragsListe
};

type AppStateActions = {
  reset: () => void;
  setGjelderId: (gjelderId: string) => void,
  setFaggruppeVisningText: (faggruppeVisningText: string) => void;
  setFaggruppeType: (faggruppeType: string) => void,
  setSelectedOppdragsEgenskap: (selectedOppdragsEgenskap: OppdragsListe) => void;
  setGjelderNavn: (gjelerNavn: string) => void;
}

const initAppState = {
  gjelderId: "",
  faggruppeVisningText: undefined,
  faggruppeType: undefined,
  gjelderNavn: "",
  oppdragsEgenskaper: undefined,
  selectedOppdragsEgenskap: undefined
};

export const useAppState = create<AppState & AppStateActions>()(
  devtools(
    persist(
      (set) => ({
        ...initAppState,
        reset: () => set({ ...initAppState }),
        setGjelderId: (gjelderId: string) => set({ gjelderId }),
        setFaggruppeVisningText: (faggruppeVisningText: string) => set({ faggruppeVisningText }),
        setFaggruppeType: (faggruppeType: string) => set({ faggruppeType }),
        setGjelderNavn: (gjelderNavn: string) => set({ gjelderNavn }),
        setSelectedOppdragsEgenskap: (selectedOppdragsEgenskap: OppdragsListe) => set({ selectedOppdragsEgenskap })
      }),
      {
        name: "app-state",
        storage: createJSONStorage(() => sessionStorage)
      }
    )
  )
);
