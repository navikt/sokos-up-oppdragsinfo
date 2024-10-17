import { Link } from "react-router-dom";
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
    <div className={styles.breadcrumbs}>
      <div className={styles.breadcrumbs__left}>
        <div className={styles.breadcrumbs__contents}>
          {props.searchLink && (
            <div className={styles.breadcrumbs__crumb}>
              <Link to={ROOT}>Gjeldende Søk</Link>
            </div>
          )}
          {props.treffliste && (
            <div className={styles.breadcrumbs__crumb}>
              &gt; &gt; Treffliste
            </div>
          )}
          {props.trefflistelink && (
            <div className={styles.breadcrumbs__crumb}>
              &gt; &gt; <Link to={"/oppdrag"}>Treffliste</Link>
            </div>
          )}
          {props.oppdrag && (
            <div className={styles.breadcrumbs__crumb}>&gt; &gt; Oppdrag</div>
          )}
          {props.oppdraglink && (
            <div className={styles.breadcrumbs__crumb}>
              &gt; &gt; <Link to={`/${props.oppdraglink}`}>Oppdrag</Link>
            </div>
          )}
          {props.oppdragsdetaljer && (
            <div className={styles.breadcrumbs__crumb}>&gt; &gt; Detaljer</div>
          )}
        </div>
      </div>
      <div className={styles.breadcrumbs__right}>
        <NullstillButton />
      </div>
    </div>
  );
}
