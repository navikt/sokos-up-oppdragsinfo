import { Suspense, useEffect } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.module.css";
import ContentLoader from "./components/common/ContentLoader";
import OppdragPage from "./pages/OppdragPage";
import OppdragsLinjeDetaljerPage from "./pages/OppdragsLinjeDetaljerPage";
import OppdragsLinjePage from "./pages/OppdragsLinjePage";
import SokPage from "./pages/SokPage";
import { BASENAME } from "./util/constant";
import { initGrafanaFaro } from "./util/grafanaFaro";

export default function App() {
  useEffect(() => {
    if (window.location.hostname !== "localhost") initGrafanaFaro();
  }, []);

  return (
    <Suspense fallback={<ContentLoader />}>
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <>
              <Route path={"/"} element={<SokPage />} />
              <Route path={"/oppdrag"} element={<OppdragPage />} />
              <Route path={"/:oppdragsID"} element={<OppdragsLinjePage />} />
              <Route
                path={"/:oppdragsId/:linjeId"}
                element={<OppdragsLinjeDetaljerPage />}
              />
            </>,
          ),
          { basename: BASENAME },
        )}
      />
    </Suspense>
  );
}
