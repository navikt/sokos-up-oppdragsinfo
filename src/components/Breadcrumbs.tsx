import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { ROOT } from "../util/constant";
import styles from "./Breadcrumbs.module.css";
import NullstillButton from "./ResetButton";

interface BreadcrumbsProps {
  searchLink?: boolean;
  treffliste?: boolean;
  trefflistelink?: boolean;
  oppdrag?: boolean;
  oppdraglink?: string;
  oppdragsdetaljer?: boolean;
}

export default function Breadcrumbs(props: BreadcrumbsProps) {
  return (
    <div className={styles["breadcrumbs"]}>
      <div className={styles["breadcrumbs-left"]}>
        <div className={styles["breadcrumbs-contents"]}>
          {props.searchLink && (
            <div className={styles["breadcrumbs-crumb"]}>
              <Link to={ROOT}>Gjeldende Søk</Link>
            </div>
          )}
          {props.treffliste && (
            <div className={styles["breadcrumbs-crumb"]}>
              <ChevronRightIcon /> Treffliste
            </div>
          )}
          {props.trefflistelink && (
            <div className={styles["breadcrumbs-crumb"]}>
              <ChevronRightIcon /> <Link to={"/oppdrag"}>Treffliste</Link>
            </div>
          )}
          {props.oppdrag && (
            <div className={styles["breadcrumbs-crumb"]}>
              <ChevronRightIcon /> Oppdrag
            </div>
          )}
          {props.oppdraglink && (
            <div className={styles["breadcrumbs-crumb"]}>
              <ChevronRightIcon />{" "}
              <Link to={`/${props.oppdraglink}`}>Oppdrag</Link>
            </div>
          )}
          {props.oppdragsdetaljer && (
            <div className={styles["breadcrumbs-crumb"]}>
              <ChevronRightIcon /> Detaljer
            </div>
          )}
        </div>
      </div>
      <div className={styles["breadcrumbs-right"]}>
        <NullstillButton />
      </div>
    </div>
  );
}
