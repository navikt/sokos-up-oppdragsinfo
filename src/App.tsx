import { Suspense, useEffect } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useRouteError,
} from "react-router";
import "./App.module.css";
import ContentLoader from "./components/ContentLoader";
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
    <Suspense fallback={<ContentLoader />}>
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <Route path={ROOT} ErrorBoundary={ErrorBoundary}>
              <Route path={ROOT} element={<SokPage />} />
              <Route path={"/treffliste"} element={<TrefflistePage />} />
              <Route path={"/oppdrag"} element={<OppdragPage />} />
              <Route path={"/oppdrag/linje"} element={<LinjePage />} />
              <Route path={"*"} element={<NotFound />} />,
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
