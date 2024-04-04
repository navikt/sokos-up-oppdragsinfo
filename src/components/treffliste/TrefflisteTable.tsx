import { useState } from "react";
import { Pagination, Table } from "@navikt/ds-react";
import { Treff } from "../../models/Treffliste";
import { Link } from "react-router-dom";
import { firstOf, applySortDirection, handleSort, hasKey, SortState } from "../../util/commonUtils";
import { Oppdrag } from "../../models/Oppdrag";
import styles from "./TrefflisteTable.module.css";
import commonstyles from "../../util/common-styles.module.css";

const TrefflisteTable = ({ treff }: { treff: Treff }) => {
  const [sort, setSort] = useState<SortState<Oppdrag> | undefined>();
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const oppdragSort = (sortKey?: string) => {
    if (hasKey(firstOf(treff.oppdragsListe), sortKey)) handleSort<Oppdrag>(sortKey, setSort, sort);
  };

  const sortedData: Oppdrag[] = treff.oppdragsListe.slice().sort(applySortDirection(sort));
  const pageData = sortedData.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagecount = Math.ceil(treff.oppdragsListe.length / rowsPerPage);

  return (
    <>
      {pagecount > 1 ? (
        <div className={styles.sortabletable__topinfo}>
          <p>
            {treff?.oppdragsListe?.length ?? 0} treff, {page} av {pagecount} sider
          </p>
          <p>Vis {rowsPerPage} per side</p>
        </div>
      ) : (
        <div className={commonstyles.spacing}></div>
      )}
      <div className={styles.sortabletable}>
        <Table sort={sort} onSortChange={oppdragSort}>
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
            {pageData.map((oppdrag) => (
              <Table.Row key={btoa("" + oppdrag.oppdragsId)}>
                <Table.DataCell>
                  <Link to={`/${oppdrag.oppdragsId}`}>{oppdrag.fagsystemId}</Link>
                </Table.DataCell>
                <Table.DataCell>{oppdrag.navnFagGruppe}</Table.DataCell>
                <Table.DataCell>{oppdrag.navnFagOmraade}</Table.DataCell>
                <Table.DataCell>{oppdrag.typeBilag}</Table.DataCell>
                <Table.DataCell>{oppdrag.kodeStatus}</Table.DataCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      {pagecount > 1 && (
        <div className={styles.sortabletable__pagination}>
          <Pagination page={page} onPageChange={setPage} count={pagecount} size="small" />
        </div>
      )}
    </>
  );
};

export default TrefflisteTable;
