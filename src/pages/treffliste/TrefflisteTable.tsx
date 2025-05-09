import { useState } from "react";
import { Link } from "react-router";
import { Pagination, Table } from "@navikt/ds-react";
import RowsPerPageSelector from "../../components/RowsPerPageSelector";
import { useStore } from "../../store/AppState";
import commonstyles from "../../styles/common-styles.module.css";
import { Oppdrag, OppdragsList } from "../../types/Oppdrag";
import { TABLE, logUserEvent } from "../../umami/umami";
import {
  SortState,
  applySortDirection,
  firstOf,
  handleSort,
  hasKey,
} from "../../util/commonUtil";
import { OPPDRAG } from "../../util/routenames";

type TrefflisteTableProps = {
  oppdragsListe: OppdragsList;
};

export default function TrefflisteTable(props: TrefflisteTableProps) {
  const [sort, setSort] = useState<SortState<Oppdrag> | undefined>();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const { setOppdrag } = useStore();

  const sortedData: OppdragsList = props.oppdragsListe
    .slice()
    .sort(applySortDirection(sort));
  const pageData = sortedData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );
  const pagecount = Math.ceil(props.oppdragsListe.length / rowsPerPage);

  const antall = props.oppdragsListe.length ?? 0;

  function oppdragSort(sortKey?: string) {
    logUserEvent(TABLE.SORTER, { sortKey });
    if (hasKey(firstOf(props.oppdragsListe), sortKey))
      handleSort<Oppdrag>(sortKey, setSort, sort);
  }

  return (
    <>
      <div className={commonstyles["sortable-table-topinfo"]}>
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
      <div className={commonstyles["sortable-table"]}>
        <Table zebraStripes sort={sort} onSortChange={oppdragSort}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader sortKey={"fagsystemId"} sortable>
                Fagsystem id
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
                  <Link
                    to={OPPDRAG}
                    replace
                    onClick={() => setOppdrag(oppdrag)}
                  >
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
        <div className={commonstyles["sortable-table-pagination"]}>
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
