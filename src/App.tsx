import "./App.module.css";
import SokAndTrefflistePage from "./pages/SokAndTreffliste.page";
import { useState } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import { getTime } from "./util/commonUtils";

const App = () => {
  // useEffect(() => {
  //   initGrafanaFaro();
  // }, []);

  const [gjelderId, setGjelderId] = useState<string>();

  console.log("Render App " + getTime() + `, Gjelder ID ${gjelderId}`);
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            <Route path="/" element={<SokAndTrefflistePage setGjelderId={setGjelderId} />} />
            {/*<Route*/}
            {/*    path="/:oppdragsid"*/}
            {/*    element={<OppdragsdetaljerPage/>}*/}
            {/*    loader={async ({params}: LoaderFunctionArgs) =>*/}
            {/*        RestService.fetchOppdrag(gjelderId, params.oppdragsid ?? "")*/}
            {/*    }*/}
            {/*/>*/}
          </>,
        ),
      )}
    />
  );
};

export default App;
