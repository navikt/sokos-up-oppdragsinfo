import { Faggruppe, FaggruppeStorageObject } from "../../models/Faggruppe";
import styles from "./FaggrupperCombobox.module.css";
import { clearFaggruppe, Combobox, firstOf, retrieveFaggruppe, storeFaggruppe } from "../../util/commonUtils";
import { Button } from "@navikt/ds-react";
import { useMemo, useState } from "react";

type FaggruppeComboboxProps = {
  faggrupper: Faggruppe[];
  handleChangeFaggruppe: (faggruppe: string) => void;
};

const FaggrupperCombobox = ({ faggrupper, handleChangeFaggruppe }: FaggruppeComboboxProps) => {
  const previouslyChosenFaggruppe = retrieveFaggruppe();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([previouslyChosenFaggruppe?.comboboxText ?? ""]);

  const faggruppetabell: FaggruppeStorageObject[] = useMemo(
    () =>
      !!faggrupper
        ? faggrupper.map((faggruppe) => ({
            navn: faggruppe.navn,
            type: faggruppe.type,
            comboboxText: `${faggruppe.navn}(${faggruppe.type})`,
          }))
        : [],
    [faggrupper],
  );

  const sortedFaggrupper = useMemo(
    () => (!!faggruppetabell ? faggruppetabell.map((f) => f.comboboxText).sort((a, b) => a.localeCompare(b)) : []),
    [faggruppetabell],
  );

  const handleChooseFaggruppe = (faggruppenavn: string, isSelected: boolean) => {
    setSelectedOptions([faggruppenavn]);
    if (!isSelected || faggruppenavn === "") {
      clearFaggruppe();
      return;
    }
    const faggruppe = faggruppetabell.find((f) => f.comboboxText === faggruppenavn);
    storeFaggruppe(faggruppe);
    handleChangeFaggruppe(faggruppe?.comboboxText ?? "");
  };

  return (
    <div className={styles.combobox}>
      <Combobox
        label={"Faggruppe"}
        onToggleSelected={handleChooseFaggruppe}
        selectedOptions={selectedOptions}
        options={["", ...sortedFaggrupper]}
      />
      <div className={styles.combobox__clearbutton}>
        {firstOf(selectedOptions) !== "" && (
          <Button
            variant="secondary-neutral"
            size={"small"}
            onClick={(e) => {
              e.preventDefault();
              setSelectedOptions([]);
              handleChooseFaggruppe("", false);
            }}
          >
            Tøm
          </Button>
        )}
      </div>
    </div>
  );
};

export default FaggrupperCombobox;
