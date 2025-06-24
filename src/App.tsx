import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import styles from "./App.module.css";
import NotFound from "./components/NotFound";
import Linje from "./pages/Linje";
import Oppdrag from "./pages/Oppdrag";
import Sok from "./pages/Sok";
import Treffliste from "./pages/Treffliste";
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
          <Route path={ROOT} element={<Sok />} />
          <Route path={TREFFLISTE} element={<Treffliste />} />
          <Route path={OPPDRAG} element={<Oppdrag />} />
          <Route path={LINJE} element={<Linje />} />
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
