import { Suspense, useEffect } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useRouteError,
} from "react-router-dom";
import "./App.module.css";
import ContentLoader from "./components/ContentLoader";
import OppdragPage from "./pages/oppdrag/OppdragPage";
import OppdragsLinjePage from "./pages/oppdragslinje/OppdragsLinjePage";
import OppdragsLinjeDetaljerPage from "./pages/oppdragslinjedetaljer/OppdragsLinjeDetaljerPage";
import SokPage from "./pages/sok/SokPage";
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
    <Suspense fallback={<ContentLoader />}>
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <Route path={ROOT} ErrorBoundary={ErrorBoundary}>
              <Route path={ROOT} element={<SokPage />} />
              <Route path={"/oppdrag"} element={<OppdragPage />} />
              <Route path={"/:oppdragsID"} element={<OppdragsLinjePage />} />
              <Route
                path={"/:oppdragsId/:linjeId"}
                element={<OppdragsLinjeDetaljerPage />}
              />
            </Route>,
          ),
          { basename: BASENAME },
        )}
      />
    </Suspense>
  );
}

function ErrorBoundary(): JSX.Element {
  const error = useRouteError();
  throw error;
}
