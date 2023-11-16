import { useEffect } from "react";
import { initGrafanaFaro } from "./util/grafanaFaro";
import "./App.module.css";
import EmployeePage from "./pages/Employee.page";

const App = ({ gjelderId }: { gjelderId?: string }) => {
  useEffect(() => {
    initGrafanaFaro();
  }, []);

  return <EmployeePage />;
};

export default App;
