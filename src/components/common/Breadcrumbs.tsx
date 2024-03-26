import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";
import NullstillButton from "./NullstillButton";

type BreadcrumbsProps = {
  soklink?: boolean;
  treffliste?: boolean;
  trefflistelink?: boolean;
  oppdrag?: boolean;
};

const Breadcrumbs = ({ soklink, treffliste, trefflistelink, oppdrag }: BreadcrumbsProps) => {
  return (
    <div className={styles.breadcrumbs}>
      <div className={styles.breadcrumbs__left}>
        <div className={styles.breadcrumbs__contents}>
          {soklink && (
            <div className={styles.breadcrumbs__crumb}>
              <Link to={"/"}>Søk</Link>
            </div>
          )}
          {treffliste && <div className={styles.breadcrumbs__crumb}>&gt; &gt; Treffliste</div>}
          {trefflistelink && (
            <div className={styles.breadcrumbs__crumb}>
              &gt; &gt; <Link to={"/treffliste"}>Treffliste</Link>
            </div>
          )}
          {oppdrag && <div className={styles.breadcrumbs__crumb}>&gt; &gt; Oppdrag</div>}
        </div>
      </div>
      <div className={styles.breadcrumbs__right}>
        <NullstillButton />
      </div>
    </div>
  );
};
export default Breadcrumbs;
