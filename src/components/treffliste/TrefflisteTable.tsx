import { useState } from "react";
import { Pagination, Table } from "@navikt/ds-react";
import { Treff } from "../../models/Treffliste";
import { Link } from "react-router-dom";
import { applySortDirection, firstOf, handleSort, hasKey, SortState } from "../../util/commonUtils";
import { Oppdrag } from "../../models/Oppdrag";
import styles from "./TrefflisteTable.module.css";
import commonstyles from "../../util/common-styles.module.css";
import AntallSelector from "../common/AntallSelector";

const TrefflisteTable = ({ treff }: { treff: Treff }) => {
  const [sort, setSort] = useState<SortState<Oppdrag> | undefined>();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const oppdragSort = (sortKey?: string) => {
    if (hasKey(firstOf(treff.oppdragsListe), sortKey)) handleSort<Oppdrag>(sortKey, setSort, sort);
  };

  const sortedData: Oppdrag[] = treff.oppdragsListe.slice().sort(applySortDirection(sort));
  const pageData = sortedData.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagecount = Math.ceil(treff.oppdragsListe.length / rowsPerPage);

  const antall = treff?.oppdragsListe?.length ?? 0;
  return (
    <>
      <div className={styles.sortabletable__topinfo}>
        <div className={commonstyles.nowrap}>
          <p>
            {`${antall} treff`}
            {antall > rowsPerPage && `, ${page} av ${pagecount} sider`}
          </p>
        </div>

        <AntallSelector antall={rowsPerPage} setAntall={setRowsPerPage} />
      </div>
      <div className={styles.sortabletable}>
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
