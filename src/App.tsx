import { Suspense, useEffect } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useRouteError,
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
              <Route
                ErrorBoundary={ErrorBoundary}
                path={"/"}
                element={<SokPage />}
              />
              <Route
                path={"/oppdrag"}
                element={<OppdragPage />}
                ErrorBoundary={ErrorBoundary}
              />
              <Route
                path={"/:oppdragsID"}
                element={<OppdragsLinjePage />}
                ErrorBoundary={ErrorBoundary}
              />
              <Route
                path={"/:oppdragsId/:linjeId"}
                element={<OppdragsLinjeDetaljerPage />}
                ErrorBoundary={ErrorBoundary}
              />
            </>,
          ),
          { basename: BASENAME },
        )}
      />
    </Suspense>
  );
}

function ErrorBoundary() {
  const error = useRouteError();
  throw error;
  return <div>test</div>;
}
