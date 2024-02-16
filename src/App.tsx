import "./App.module.css";
import OppdragsinfoPage from "./pages/Oppdragsinfo.page";
import { useEffect } from "react";
import { initGrafanaFaro } from "./util/grafanaFaro";

const App = () => {
  useEffect(() => {
    initGrafanaFaro();
  }, []);

  return <OppdragsinfoPage />;
};

export default App;
