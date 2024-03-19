import "./App.module.css";
import SokAndTrefflistePage from "./pages/SokAndTreffliste.page";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import OppdragsdetaljerPage from "./pages/Oppdragsdetaljer.page";
import OppdragslinjedetaljerPage from "./pages/OppdragslinjedetaljerPage";
import RestService from "./services/rest-service";
import { useEffect } from "react";
import { initGrafanaFaro } from "./util/grafanaFaro";

const App = () => {
  useEffect(() => {
    initGrafanaFaro();
  }, []);
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            <Route path={"/"} element={<SokAndTrefflistePage />} loader={RestService.fetchFaggrupper} />
            <Route path={"/:oppdragsID"} element={<OppdragsdetaljerPage />} />
            <Route path={"/:oppdragsID/:linjeID"} element={<OppdragslinjedetaljerPage />} />
          </>,
        ),
        { basename: "/oppdragsinfo" },
      )}
    />
  );
};

export default App;
