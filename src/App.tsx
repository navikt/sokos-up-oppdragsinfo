import { Suspense, useEffect } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import "./App.module.css";
import ContentLoader from "./components/common/ContentLoader";
import OppdragsLinjeDetaljerPage from "./pages/OppdragsLinjeDetaljerPage";
import OppdragsLinjePage from "./pages/OppdragsLinjePage";
import SokPage from "./pages/SokPage";
import TrefflistePage from "./pages/TrefflistePage";
import { BASENAME } from "./util/constant";
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
              <Route
                path={"/"}
                element={<SokPage />}
              />
              <Route path={"/treffliste"} element={<TrefflistePage />} />
              <Route path={"/:oppdragsID"} element={<OppdragsLinjePage />} />
              <Route
                path={"/:oppdragsID/:linjeID"}
                element={<OppdragsLinjeDetaljerPage />}
              />
            </>
          ),
          { basename: BASENAME }
        )}
      />
    </Suspense>
  );
};

export default App;
