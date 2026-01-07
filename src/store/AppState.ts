import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import type { FagGruppe } from "../types/FagGruppe";
import type { Oppdrag, OppdragsList } from "../types/Oppdrag";

export type AppState = {
	gjelderId: string;
	fagGruppe?: FagGruppe;
	gjelderNavn: string;
	oppdragsListe?: OppdragsList;
	oppdrag?: Oppdrag;
	linjeId: string;
};

type AppStateActions = {
	resetState: () => void;
	setGjelderId: (gjelderId: string) => void;
	setFagGruppe: (fagGruppe: FagGruppe) => void;
	setGjelderNavn: (gjelderNavn: string) => void;
	setOppdrag: (oppdrag: Oppdrag) => void;
	setOppdragsListe: (oppdragsListe: OppdragsList) => void;
	setLinjeId: (linjeId: string) => void;
};

const initAppState = {
	gjelderId: "",
	fagGruppe: undefined,
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
				setFagGruppe: (fagGruppe: FagGruppe) => set({ fagGruppe }),
				setGjelderNavn: (gjelderNavn: string) => set({ gjelderNavn }),
				setOppdrag: (oppdrag: Oppdrag) => set({ oppdrag }),
				setOppdragsListe: (oppdragsListe: OppdragsList) =>
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
