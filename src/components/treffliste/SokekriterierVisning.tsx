import styles from "./SokekriterierVisning.module.css";
import LabelText from "../common/LabelText";

type SokekriterierProps = {
  gjelderId?: string;
  navn?: string;
  faggruppe?: string;
};

const SokekriterierVisning = ({ gjelderId, navn, faggruppe }: SokekriterierProps) => {
  return (
    <>
      <div className={styles.sokekriterier}>
        <div className={styles.sokekriterier__content}>
          <LabelText label={"Gjelder ID"} text={gjelderId ?? ""} />
          <LabelText label={"Navn"} text={navn ?? ""} />
          <LabelText label={"Faggruppe"} text={faggruppe ?? ""} />
        </div>
      </div>
    </>
  );
};
export default SokekriterierVisning;
