import { Link } from "react-router";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { OPPDRAG, ROOT, TREFFLISTE } from "../util/routenames";
import styles from "./Breadcrumbs.module.css";
import NullstillButton from "./ResetButton";

interface BreadcrumbsProps {
  searchLink?: boolean;
  treffliste?: boolean;
  trefflistelink?: boolean;
  oppdrag?: boolean;
  oppdraglink?: boolean;
  linje?: boolean;
}

export default function Breadcrumbs(props: BreadcrumbsProps) {
  return (
    <div className={styles.breadcrumbs}>
      <div className={styles["breadcrumbs__section--left"]}>
        <div className={styles.breadcrumbs__contents}>
          {props.searchLink && (
            <div className={styles.breadcrumbs__crumb}>
              <Link to={ROOT} replace>
                Gjeldende Søk
              </Link>
            </div>
          )}
          {props.treffliste && (
            <div className={styles.breadcrumbs__crumb}>
              <ChevronRightIcon title="Pil høyre" /> Treffliste
            </div>
          )}
          {props.trefflistelink && (
            <div className={styles.breadcrumbs__crumb}>
              <ChevronRightIcon title="Pil høyre" />{" "}
              <Link to={TREFFLISTE} replace>
                Treffliste
              </Link>
            </div>
          )}
          {props.oppdrag && (
            <div className={styles.breadcrumbs__crumb}>
              <ChevronRightIcon title="Pil høyre" /> Oppdrag
            </div>
          )}
          {props.oppdraglink && (
            <div className={styles.breadcrumbs__crumb}>
              <ChevronRightIcon title="Pil høyre" />{" "}
              <Link to={OPPDRAG} replace>
                Oppdrag
              </Link>
            </div>
          )}
          {props.linje && (
            <div className={styles.breadcrumbs__crumb}>
              <ChevronRightIcon title="Pil høyre" /> Linje
            </div>
          )}
        </div>
      </div>
      <div className={styles["breadcrumbs__section--right"]}>
        <NullstillButton />
      </div>
    </div>
  );
}
