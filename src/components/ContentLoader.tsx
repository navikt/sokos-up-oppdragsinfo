import { Loader } from "@navikt/ds-react";
import styles from "./ContentLoader.module.css";

interface ContentLoaderProps {
  width?: string;
}

export default function ContentLoader({ width }: ContentLoaderProps) {
  return (
    <div
      className={styles["content-loader"]}
      style={{ width: width ? width + "" : "100%" }}
    >
      <Loader size="2xlarge" title="Laster ..." variant="interaction" />
    </div>
  );
}
