import { Link } from "react-router";
import { ChevronRightDoubleIcon } from "@navikt/aksel-icons";
import { BodyShort } from "@navikt/ds-react";
import commonstyles from "../styles/bem-common.module.css";
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
    <div role="navigation" className={styles["breadcrumbs"]}>
      <div className={styles["breadcrumbs__left"]}>
        <div className={styles["breadcrumbs__contents"]}>
          {props.searchLink && (
            <>
              <BodyShort size="large">
                <Link to={ROOT} replace className={commonstyles.link}>
                  Gjeldende Søk
                </Link>
              </BodyShort>
            </>
          )}
          {props.treffliste && (
            <>
              <ChevronRightDoubleIcon focusable={"false"} title="Pil høyre" />
              <BodyShort size="large">Treffliste</BodyShort>
            </>
          )}
          {props.trefflistelink && (
            <>
              <ChevronRightDoubleIcon focusable={"false"} title="Pil høyre" />
              <BodyShort size="large">
                <Link to={TREFFLISTE} replace className={commonstyles.link}>
                  Treffliste
                </Link>
              </BodyShort>
            </>
          )}
          {props.oppdrag && (
            <>
              <ChevronRightDoubleIcon title="Chevron ikon" />
              <BodyShort size="large">Oppdrag</BodyShort>
            </>
          )}
          {props.oppdraglink && (
            <>
              <ChevronRightDoubleIcon title="Pil høyre" />
              <BodyShort size="large">
                <Link to={OPPDRAG} replace className={commonstyles.link}>
                  Oppdrag
                </Link>
              </BodyShort>
            </>
          )}
          {props.linje && (
            <>
              <ChevronRightDoubleIcon title="Pil høyre" />
              Linje
            </>
          )}
        </div>
      </div>
      <div className={styles["breadcrumbs__right"]}>
        <NullstillButton />
      </div>
    </div>
  );
}
