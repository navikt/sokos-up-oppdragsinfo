import commonstyles from "../../util/common-styles.module.css";
import { Loader } from "@navikt/ds-react";

const ContentLoader = () => (
  <div className={commonstyles.contentloader}>
    <Loader size="3xlarge" title="Laster ..." />
  </div>
);

export default ContentLoader;
