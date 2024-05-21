import { Loader } from "@navikt/ds-react";
import commonstyles from "../../util/common-styles.module.css";

const ContentLoader = ({ width }: { width?: string }) => (
  <div
    className={commonstyles.contentloader}
    style={{ width: width ? width + "" : "100%" }}
  >
    <Loader size="3xlarge" title="Laster ..." />
  </div>
);

export default ContentLoader;
