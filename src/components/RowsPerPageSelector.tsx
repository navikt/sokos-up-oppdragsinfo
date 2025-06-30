import { ChevronDownIcon } from "@navikt/aksel-icons";
import { Button, Dropdown } from "@navikt/ds-react";
import commonstyles from "../styles/bem-common.module.css";
import styles from "./RowsPerPageSelector.module.css";

interface RowsPerPageSelectorProps {
  rowsPerPage: number;
  updateRowsPerPage: (rows: number) => void;
  totalCount: number;
  currentPage?: number;
  pageCount?: number;
}

export default function RowsPerPageSelector(props: RowsPerPageSelectorProps) {
  const { totalCount, currentPage, pageCount, rowsPerPage } = props;

  return (
    <div className={styles["rows-per-page-selector"]}>
      <div className={commonstyles["text--nowrap"]}>
        <p>
          {`${totalCount} treff`}
          {totalCount > rowsPerPage &&
            currentPage &&
            pageCount &&
            `, ${currentPage} av ${pageCount} sider`}
        </p>
      </div>

      <div className={styles["dropdown-section"]}>
        <div className={commonstyles["text--nowrap"]}>
          <p>Vis {rowsPerPage} per side</p>
        </div>
        <Dropdown>
          <Button
            size={"xsmall"}
            variant={"tertiary-neutral"}
            as={Dropdown.Toggle}
          >
            <ChevronDownIcon
              title="Vis flere eller mindre treff"
              fontSize="1.5rem"
            />
          </Button>
          <Dropdown.Menu>
            <Dropdown.Menu.GroupedList>
              <Dropdown.Menu.GroupedList.Heading>
                Hvor mange rader ønsker du å vise per side?
              </Dropdown.Menu.GroupedList.Heading>
              <Dropdown.Menu.Divider />
              {[5, 10, 25, 50].map((rows) => (
                <Dropdown.Menu.GroupedList.Item
                  key={rows}
                  onClick={() => props.updateRowsPerPage(rows)}
                >
                  {rows}
                </Dropdown.Menu.GroupedList.Item>
              ))}
            </Dropdown.Menu.GroupedList>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
