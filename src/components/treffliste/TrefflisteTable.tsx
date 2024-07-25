import { useState } from "react";
import { Link } from "react-router-dom";
import { Pagination, Table } from "@navikt/ds-react";
import {
  OppdragsEgenskap,
  OppdragsEgenskaper,
} from "../../models/OppdragsEgenskaper";
import commonstyles from "../../util/common-styles.module.css";
import {
  SortState,
  applySortDirection,
  firstOf,
  handleSort,
  hasKey,
} from "../../util/commonUtils";
import RowsPerPageSelector from "../common/RowsPerPageSelector";
import styles from "../common/sortable-table.module.css";

const TrefflisteTable = ({ treff }: { treff: OppdragsEgenskaper }) => {
  const [sort, setSort] = useState<SortState<OppdragsEgenskap> | undefined>();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const oppdragSort = (sortKey?: string) => {
    if (hasKey(firstOf(treff), sortKey))
      handleSort<OppdragsEgenskap>(sortKey, setSort, sort);
  };

  const sortedData: OppdragsEgenskaper = treff
    .slice()
    .sort(applySortDirection(sort));
  const pageData = sortedData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );
  const pagecount = Math.ceil(treff.length / rowsPerPage);

  const antall = treff?.length ?? 0;
  return (
    <>
      <div className={styles["sortable-table__topinfo"]}>
        <div className={commonstyles.nowrap}>
          <p>
            {`${antall} treff`}
            {antall > rowsPerPage && `, ${page} av ${pagecount} sider`}
          </p>
        </div>

        <RowsPerPageSelector
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </div>
      <div className={styles["sortable-table"]}>
        <Table zebraStripes sort={sort} onSortChange={oppdragSort}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader sortKey={"fagsystemId"} sortable>
                Fagsystem ID
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"navnFagGruppe"} sortable>
                Faggruppe
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"navnFagOmraade"} sortable>
                Fagområde
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"typeBilag"} sortable>
                Type bilag
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"kodeStatus"} sortable>
                Status
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {pageData.map((oppdragsEgenskap) => (
              <Table.Row key={btoa("" + oppdragsEgenskap.oppdragsId)}>
                <Table.DataCell>
                  <Link
                    to={`/${oppdragsEgenskap.oppdragsId}`}
                    state={oppdragsEgenskap}
                  >
                    {oppdragsEgenskap.fagsystemId}
                  </Link>
                </Table.DataCell>
                <Table.DataCell>
                  {oppdragsEgenskap.navnFagGruppe}
                </Table.DataCell>
                <Table.DataCell>
                  {oppdragsEgenskap.navnFagOmraade}
                </Table.DataCell>
                <Table.DataCell>{oppdragsEgenskap.typeBilag}</Table.DataCell>
                <Table.DataCell>{oppdragsEgenskap.kodeStatus}</Table.DataCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      {pagecount > 1 && (
        <div className={styles["sortable-table__pagination"]}>
          <Pagination
            page={page}
            onPageChange={setPage}
            count={pagecount}
            size="small"
          />
        </div>
      )}
    </>
  );
};

export default TrefflisteTable;
