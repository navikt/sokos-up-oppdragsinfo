import { useState } from "react";
import { Link } from "react-router-dom";
import { Pagination, Table } from "@navikt/ds-react";
import commonstyles from "../../styles/common-styles.module.css";
import { Oppdrag, OppdragsListe } from "../../types/OppdragsListe";
import {
  SortState,
  applySortDirection,
  firstOf,
  handleSort,
  hasKey,
} from "../../util/commonUtil";
import RowsPerPageSelector from "../common/RowsPerPageSelector";
import styles from "../common/sortable-table.module.css";

export default function OppdragTable({
  oppdragsListe,
}: {
  oppdragsListe: OppdragsListe;
}) {
  const [sort, setSort] = useState<SortState<Oppdrag> | undefined>();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const sortedData: OppdragsListe = oppdragsListe
    .slice()
    .sort(applySortDirection(sort));
  const pageData = sortedData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );
  const pagecount = Math.ceil(oppdragsListe.length / rowsPerPage);

  const antall = oppdragsListe?.length ?? 0;

  function oppdragSort(sortKey?: string) {
    if (hasKey(firstOf(oppdragsListe), sortKey))
      handleSort<Oppdrag>(sortKey, setSort, sort);
  }

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
              <Table.ColumnHeader sortKey={"navnFaggruppe"} sortable>
                Faggruppe
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"navnFagomraade"} sortable>
                Fagområde
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"typeBilag"} sortable>
                Bilagstype
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"kodeStatus"} sortable>
                Status
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {pageData.map((oppdrag) => (
              <Table.Row key={btoa("" + oppdrag.oppdragsId)}>
                <Table.DataCell>
                  <Link to={`/${oppdrag.oppdragsId}`} state={oppdrag}>
                    {oppdrag.fagsystemId}
                  </Link>
                </Table.DataCell>
                <Table.DataCell>{oppdrag.navnFaggruppe}</Table.DataCell>
                <Table.DataCell>{oppdrag.navnFagomraade}</Table.DataCell>
                <Table.DataCell>{oppdrag.typeBilag}</Table.DataCell>
                <Table.DataCell>{oppdrag.kodeStatus}</Table.DataCell>
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
            prevNextTexts
          />
        </div>
      )}
    </>
  );
}
