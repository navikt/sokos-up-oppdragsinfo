import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import styles from "./App.module.css";
import NotFound from "./components/NotFound";
import LinjePage from "./pages/LinjePage";
import OppdragPage from "./pages/OppdragPage";
import SokPage from "./pages/SokPage";
import TrefflistePage from "./pages/TrefflistePage";
import { initGrafanaFaro } from "./util/grafanaFaro";
import { BASENAME, LINJE, OPPDRAG, ROOT, TREFFLISTE } from "./util/routenames";

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
    <div className={styles.app}>
      <BrowserRouter basename={BASENAME}>
        <Routes>
          <Route path={ROOT} element={<SokPage />} />
          <Route path={TREFFLISTE} element={<TrefflistePage />} />
          <Route path={OPPDRAG} element={<OppdragPage />} />
          <Route path={LINJE} element={<LinjePage />} />
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
