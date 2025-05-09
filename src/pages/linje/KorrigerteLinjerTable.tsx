import { useState } from "react";
import { Pagination, Table } from "@navikt/ds-react";
import RowsPerPageSelector from "../../components/RowsPerPageSelector";
import commonstyles from "../../styles/common-styles.module.css";
import { OppdragsLinjeDetaljerDTO } from "../../types/OppdragsLinjeDetaljerDTO";
import { OppdragsLinje } from "../../types/Oppdragslinje";
import { TABLE, logUserEvent } from "../../umami/umami";
import {
  SortState,
  applySortDirection,
  firstOf,
  formatDate,
  formatDateTime,
  formaterTilNorskTall,
  handleSort,
  hasKey,
} from "../../util/commonUtil";

interface KorrigerteLinjerTableProps {
  oppdragsLinjeDetaljer: OppdragsLinjeDetaljerDTO;
}

export default function KorrigerteLinjerTable(
  props: KorrigerteLinjerTableProps,
) {
  const [sort, setSort] = useState<SortState<OppdragsLinje> | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const korrigertLinjeIder = props.oppdragsLinjeDetaljer.korrigerteLinjeIder;

  const linjeSort = (sortKey?: string) => {
    logUserEvent(TABLE.SORTER, { sortKey });
    if (hasKey(firstOf(korrigertLinjeIder), sortKey))
      handleSort<OppdragsLinje>(sortKey, setSort, sort);
  };

  const sortedData = korrigertLinjeIder.slice().sort(applySortDirection(sort));
  const pageData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );
  const pagecount = Math.ceil(korrigertLinjeIder.length / rowsPerPage);
  const antall = korrigertLinjeIder?.length ?? 0;

  return (
    <>
      <div className={commonstyles["sortable-table-topinfo"]}>
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
      <div className={commonstyles["sortable-table"]}>
        <Table zebraStripes sort={sort} onSortChange={linjeSort}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader sortKey={"linjeId"} sortable>
                Linje
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"delytelseId"} sortable>
                Delytelse
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"sats"} sortable>
                Sats
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"datoVedtakFom"} sortable>
                Vedtak fom
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"datoVedtakTom"} sortable>
                Vedtak tom
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"utbetalesTilId"}>
                Utbetales til
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"refunderesOrgnr"}>
                Refunderes
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"vedtakssats"}>
                Vedtakssats
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"tidspktReg"}>
                Registrert i Oppdragssystemet
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"brukerId"}>
                Brukerid
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {pageData.map((linje: OppdragsLinje) => (
              <Table.Row key={btoa("" + linje.linjeId)}>
                <Table.DataCell>{linje.linjeId}</Table.DataCell>
                <Table.DataCell>{linje.delytelseId}</Table.DataCell>
                <Table.DataCell>
                  {formaterTilNorskTall(linje.sats)}
                </Table.DataCell>
                <Table.DataCell>
                  {formatDate(linje.datoVedtakFom)}
                </Table.DataCell>
                <Table.DataCell>
                  {formatDate(linje.datoVedtakTom)}
                </Table.DataCell>
                <Table.DataCell>{linje.utbetalesTilId}</Table.DataCell>
                <Table.DataCell>{linje.refunderesId}</Table.DataCell>
                <Table.DataCell>
                  {formaterTilNorskTall(linje.vedtakssats)}
                </Table.DataCell>
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
        <div className={commonstyles["sortable-table-pagination"]}>
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
