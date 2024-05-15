import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";
import NullstillButton from "./ResetButton";

type BreadcrumbsProps = {
  searchLink?: boolean;
  treffliste?: boolean;
  trefflistelink?: boolean;
  oppdrag?: boolean;
  oppdraglink?: string;
  oppdragsdetaljer?: boolean;
};

const Breadcrumbs = ({
  searchLink,
  treffliste,
  trefflistelink,
  oppdrag,
  oppdraglink,
  oppdragsdetaljer,
}: BreadcrumbsProps) => {
  return (
    <div className={styles.breadcrumbs}>
      <div className={styles.breadcrumbs__left}>
        <div className={styles.breadcrumbs__contents}>
          {searchLink && (
            <div className={styles.breadcrumbs__crumb}>
              <Link to={"/"}>Søk</Link>
            </div>
          )}
          {treffliste && (
            <div className={styles.breadcrumbs__crumb}>
              &gt; &gt; Treffliste
            </div>
          )}
          {trefflistelink && (
            <div className={styles.breadcrumbs__crumb}>
              &gt; &gt; <Link to={"/treffliste"}>Treffliste</Link>
            </div>
          )}
          {oppdrag && (
            <div className={styles.breadcrumbs__crumb}>&gt; &gt; Oppdrag</div>
          )}
          {oppdraglink && (
            <div className={styles.breadcrumbs__crumb}>
              &gt; &gt; <Link to={`/${oppdraglink}`}>Oppdrag</Link>
            </div>
          )}
          {oppdragsdetaljer && (
            <div className={styles.breadcrumbs__crumb}>&gt; &gt; Detaljer</div>
          )}
        </div>
      </div>
      <div className={styles.breadcrumbs__right}>
        <NullstillButton />
      </div>
    </div>
  );
};
export default Breadcrumbs;
