interface Window {
	umami: {
		track: (event: string, data?: object) => void;
	};
}

declare module "@navikt/ds-css";
