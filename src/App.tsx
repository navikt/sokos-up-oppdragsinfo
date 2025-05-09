import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.module.css";
import NotFound from "./components/NotFound";
import LinjePage from "./pages/LinjePage";
import OppdragPage from "./pages/OppdragPage";
import SokPage from "./pages/SokPage";
import TrefflistePage from "./pages/TrefflistePage";
import { BASENAME, ROOT } from "./util/constant";
import { initGrafanaFaro } from "./util/grafanaFaro";

export default function App() {
  useEffect(() => {
    if (
      import.meta.env.MODE !== "mock" &&
      import.meta.env.MODE !== "backend" &&
      import.meta.env.MODE !== "backend-q1"
    )
      initGrafanaFaro();
  }, []);

  return (
    <BrowserRouter basename={BASENAME}>
      <Routes>
        <Route path={ROOT} element={<SokPage />} />
        <Route path={"/treffliste"} element={<TrefflistePage />} />
        <Route path={"/oppdrag"} element={<OppdragPage />} />
        <Route path={"/oppdrag/linje"} element={<LinjePage />} />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
