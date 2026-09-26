import { BrowserRouter, Route, Routes } from "react-router";
import NotFound from "./components/NotFound";
import Linje from "./pages/linje/Linje";
import OppdragPage from "./pages/oppdrag/OppdragPage";
import SokPage from "./pages/sok/SokPage";
import TrefflistePage from "./pages/treffliste/TrefflistePage";
import { BASENAME, LINJE, OPPDRAG, ROOT, TREFFLISTE } from "./util/routenames";

export default function App() {
	return (
		<BrowserRouter basename={BASENAME}>
			<Routes>
				<Route path={ROOT} element={<SokPage />} />
				<Route path={TREFFLISTE} element={<TrefflistePage />} />
				<Route path={OPPDRAG} element={<OppdragPage />} />
				<Route path={LINJE} element={<Linje />} />
				<Route path={"*"} element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
