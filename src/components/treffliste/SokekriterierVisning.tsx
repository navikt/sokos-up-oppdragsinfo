import LabelText from "../common/LabelText";
import styles from "./SokekriterierVisning.module.css";

type SokekriterierProps = {
  gjelderId?: string;
  navn?: string;
  faggruppe?: string;
};

const SokekriterierVisning = ({
  gjelderId,
  navn,
  faggruppe,
}: SokekriterierProps) => {
  return (
    <>
      <div className={styles.sokekriterier}>
        <div className={styles.sokekriterier__content}>
          <LabelText label={"Gjelder ID"} text={gjelderId ?? ""} />
          <LabelText label={"Navn"} text={navn ?? ""} />
          <LabelText label={"Faggruppe"} text={faggruppe ?? "Alle"} />
        </div>
      </div>
    </>
  );
};
export default SokekriterierVisning;
