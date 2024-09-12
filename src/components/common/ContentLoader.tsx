import { Loader } from "@navikt/ds-react";
import commonstyles from "../../styles/common-styles.module.css";

interface ContentLoaderProps {
  width?: string;
}

export default function ContentLoader({ width }: ContentLoaderProps) {
  return (
    <div
      className={commonstyles.contentloader}
      style={{ width: width ? width + "" : "100%" }}
    >
      <Loader size="2xlarge" title="Laster ..." variant="interaction" />
    </div>
  );
}
