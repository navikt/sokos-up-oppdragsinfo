import { useState } from "react";
import { Pagination, Table } from "@navikt/ds-react";
import commonstyles from "../../styles/common-styles.module.css";
import { OppdragsLinjeDetaljer } from "../../types/OppdragsLinjeDetaljer";
import { OppdragsLinje } from "../../types/Oppdragslinje";
import {
  SortState,
  applySortDirection,
  firstOf,
  formatDate,
  formatDateTime,
  handleSort,
  hasKey,
} from "../../util/commonUtil";
import RowsPerPageSelector from "../common/RowsPerPageSelector";
import styles from "../common/sortable-table.module.css";

interface OppdragsLinjeDetaljerTableProps {
  oppdragsLinjeDetajer: OppdragsLinjeDetaljer;
}

export default function OppdragsLinjeDetaljerTable(
  props: OppdragsLinjeDetaljerTableProps,
) {
  const [sort, setSort] = useState<SortState<OppdragsLinje> | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const oppdragsLinjer = props.oppdragsLinjeDetajer.korrigerteLinjeIder;

  const linjeSort = (sortKey?: string) => {
    if (hasKey(firstOf(oppdragsLinjer), sortKey))
      handleSort<OppdragsLinje>(sortKey, setSort, sort);
  };

  const sortedData = oppdragsLinjer.slice().sort(applySortDirection(sort));
  const pageData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );
  const pagecount = Math.ceil(oppdragsLinjer.length / rowsPerPage);
  const antall = oppdragsLinjer?.length ?? 0;

  return (
    <>
      <div className={styles["sortable-table__topinfo"]}>
        <div className={commonstyles.nowrap}>
          <p>
            {`${antall} treff`}
            {antall > rowsPerPage && `, ${currentPage} av ${pagecount} sider`}
          </p>
        </div>

        <RowsPerPageSelector
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </div>
      <div className={styles["sortable-table"]}>
        <Table zebraStripes sort={sort} onSortChange={linjeSort}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader sortKey={"linjeId"} sortable>
                Linje-ID
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"delytelseId"} sortable>
                Delytelse ID
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"sats"} sortable>
                Sats
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"datoVedtakFom"} sortable>
                Vedtak FOM
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"datoVedtakTom"} sortable>
                Vedtak TOM
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"utbetalesTilId"}>
                Utbetales til
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"refunderesOrgnr"}>
                Refund ID
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"tidspktReg"}>
                Tidspunkt registrert
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"brukerId"}>
                Bruker ID
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {pageData.map((linje: OppdragsLinje) => (
              <Table.Row key={btoa("" + linje.linjeId)}>
                <Table.DataCell>{linje.linjeId}</Table.DataCell>
                <Table.DataCell>{linje.delytelseId}</Table.DataCell>
                <Table.DataCell>{linje.sats}</Table.DataCell>
                <Table.DataCell>
                  {formatDate(linje.datoVedtakFom)}
                </Table.DataCell>
                <Table.DataCell>
                  {formatDate(linje.datoVedtakTom)}
                </Table.DataCell>
                <Table.DataCell>{linje.utbetalesTilId}</Table.DataCell>
                <Table.DataCell>{linje.refunderesOrgnr}</Table.DataCell>
                <Table.DataCell>
                  {formatDateTime(linje.tidspktReg)}
                </Table.DataCell>
                <Table.DataCell>{linje.brukerId}</Table.DataCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      {pagecount > 1 && (
        <div className={styles["sortable-table__pagination"]}>
          <Pagination
            page={currentPage}
            onPageChange={setCurrentPage}
            count={pagecount}
            size="small"
            prevNextTexts
          />
        </div>
      )}
    </>
  );
}
