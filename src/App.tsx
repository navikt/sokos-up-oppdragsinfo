import "./App.module.css";
import SokAndTrefflistePage from "./pages/SokAndTreffliste.page";
import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  LoaderFunctionArgs,
  Route,
  RouterProvider,
} from "react-router-dom";
import OppdragsdetaljerPage from "./pages/Oppdragsdetaljer.page";
import RestService from "./services/rest-service";
import { initGrafanaFaro } from "./util/grafanaFaro";

const App = () => {
  useEffect(() => {
    initGrafanaFaro();
  }, []);

  const [gjelderId, setGjelderId] = useState<string>("");

  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            <Route path="/" element={<SokAndTrefflistePage setGjelderId={setGjelderId} />} />
            <Route
              path="/:oppdragsid"
              element={<OppdragsdetaljerPage />}
              loader={async ({ params }: LoaderFunctionArgs) =>
                RestService.useFetchOppdrag(gjelderId, params.oppdragsid ?? "")
              }
            />
          </>,
        ),
      )}
    />
  );
};

export default App;
