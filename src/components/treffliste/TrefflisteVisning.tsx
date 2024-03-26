import { Treff, Treffliste } from "../../models/Treffliste";
import { isEmpty } from "../../util/commonUtils";
import TrefflisteTable from "./TrefflisteTable";

const TrefflisteVisning = ({ treffliste }: { treffliste: Treffliste }) => (
  <>
    {...treffliste.map((treff: Treff, index: number) => (
      <>
        {!isEmpty(treff.oppdragsListe) && (
          <div key={btoa(treff.gjelderId + index)}>
            <TrefflisteTable treff={treff} />
          </div>
        )}
      </>
    ))}
  </>
);

export default TrefflisteVisning;
