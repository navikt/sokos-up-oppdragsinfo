import "./App.module.css";
import SokPage from "./pages/Sok.page";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import OppdragsdetaljerPage from "./pages/Oppdragsdetaljer.page";
import OppdragslinjedetaljerPage from "./pages/Oppdragslinjedetaljer.page";
import RestService from "./services/rest-service";
import { Suspense, useEffect } from "react";
import ContentLoader from "./components/common/ContentLoader";
import { BASENAME } from "./util/constants";
import TrefflistePage from "./pages/Treffliste.page";
import { initGrafanaFaro } from "./util/grafanaFaro";

const App = () => {
  useEffect(() => {
    if (window.location.hostname !== "localhost") initGrafanaFaro();
  }, []);
  return (
    <Suspense fallback={<ContentLoader />}>
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <>
              <Route path={"/"} element={<SokPage />} loader={RestService.fetchFaggrupper} />
              <Route path={"/treffliste"} element={<TrefflistePage />} />
              <Route path={"/:oppdragsID"} element={<OppdragsdetaljerPage />} />
              <Route path={"/:oppdragsID/:linjeID"} element={<OppdragslinjedetaljerPage />} />
            </>,
          ),
          { basename: BASENAME },
        )}
      />
    </Suspense>
  );
};

export default App;
