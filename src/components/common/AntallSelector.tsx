import { Button, Dropdown } from "@navikt/ds-react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import styles from "./AntallSelector.module.css";
import commonstyles from "../../util/common-styles.module.css";

const AntallSelector = ({ antall, setAntall }: { antall: number; setAntall: (n: number) => void }) => {
  return (
    <>
      <div className={styles.antallselector}>
        <Dropdown>
          <Button size={"xsmall"} variant={"tertiary-neutral"} as={Dropdown.Toggle}>
            <ChevronDownIcon title="a11y-title" fontSize="1.5rem" />
          </Button>
          <Dropdown.Menu>
            <Dropdown.Menu.GroupedList>
              <Dropdown.Menu.GroupedList.Heading>
                Hvor mange rader ønsker du å vise per side?
              </Dropdown.Menu.GroupedList.Heading>
              <Dropdown.Menu.Divider />
              {[5, 10, 25, 50].map((n) => (
                <Dropdown.Menu.GroupedList.Item onClick={() => setAntall(n)}>{n}</Dropdown.Menu.GroupedList.Item>
              ))}
            </Dropdown.Menu.GroupedList>
          </Dropdown.Menu>
        </Dropdown>
        <div className={commonstyles.nowrap}>
          <p>Vis {antall} per side</p>
        </div>
      </div>
    </>
  );
};

export default AntallSelector;
