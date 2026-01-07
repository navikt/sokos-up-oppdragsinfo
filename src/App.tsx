import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import NotFound from "./components/NotFound";
import Linje from "./pages/linje/Linje";
import Oppdrag from "./pages/oppdrag/Oppdrag";
import Sok from "./pages/sok/Sok";
import Treffliste from "./pages/treffliste/Treffliste";
import { initGrafanaFaro } from "./util/grafanaFaro";
import { BASENAME, LINJE, OPPDRAG, ROOT, TREFFLISTE } from "./util/routenames";

export default function App() {
	useEffect(() => {
		initGrafanaFaro();
	}, []);

	return (
		<BrowserRouter basename={BASENAME}>
			<Routes>
				<Route path={ROOT} element={<Sok />} />
				<Route path={TREFFLISTE} element={<Treffliste />} />
				<Route path={OPPDRAG} element={<Oppdrag />} />
				<Route path={LINJE} element={<Linje />} />
				<Route path={"*"} element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
