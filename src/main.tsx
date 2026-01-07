import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const startMsw = async () => {
	if (import.meta.env.MODE === "mock") {
		try {
			const { worker } = await import("../mock/browser");

			// Unngår konflikt hvis man kjører flere lokale apper med msw samtidig
			const port = window.location.port || "5173";
			const serviceWorkerUrl = `/mockServiceWorker-${port}.js`;

			await worker.start({
				serviceWorker: {
					url: serviceWorkerUrl,
				},
				onUnhandledRequest: "bypass", // for assets o.l.
				quiet: false,
			});
		} catch (error) {
			// biome-ignore lint/suspicious/noConsole: debug code
			console.error("Failed to start MSW", error);
		}
	}
};

startMsw().then(() =>
	ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
		<React.StrictMode>
			<div className="page-container">
				<div className="page-container__layout">
					<main>
						<App />
					</main>
				</div>
			</div>
		</React.StrictMode>,
	),
);
