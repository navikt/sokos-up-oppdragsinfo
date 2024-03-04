import "./App.module.css";
import SokAndTrefflistePage from "./pages/SokAndTreffliste.page";
import { useEffect } from "react";
import { initGrafanaFaro } from "./util/grafanaFaro";

const App = () => {
  // useEffect(() => {
  //   initGrafanaFaro();
  // }, []);
  return <SokAndTrefflistePage />;
};

export default App;
