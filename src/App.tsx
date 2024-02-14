import { useEffect } from "react";
import { initGrafanaFaro } from "./util/grafanaFaro";
import "./App.module.css";
import OppdragsinfoPage from "./pages/Oppdragsinfo.page";

const App = () => {
  useEffect(() => {
    initGrafanaFaro();
  }, []);

  return <OppdragsinfoPage />;
};

export default App;
