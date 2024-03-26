import { useState } from "react";
import { Pagination, Table } from "@navikt/ds-react";
import { Treff } from "../../models/Treffliste";
import { Link } from "react-router-dom";
import { comparator, SortState } from "../../util/commonUtils";
import { Oppdrag } from "../../models/Oppdrag";
import styles from "./TrefflisteTable.module.css";
import commonstyles from "../../util/common-styles.module.css";
const TrefflisteTable = ({ treff }: { treff: Treff }) => {
  const [sort, setSort] = useState<SortState<Oppdrag> | undefined>();
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // @ts-expect-error aksel-eksempel
  const handleSort = (sortKey) => {
    setSort(
      sort && sortKey === sort.orderBy && sort.direction === "descending"
        ? undefined
        : {
            orderBy: sortKey,
            direction: sort && sortKey === sort.orderBy && sort.direction === "ascending" ? "descending" : "ascending",
          },
    );
  };

  const sortedData = treff.oppdragsListe.slice().sort((a, b) => {
    if (sort) {
      return sort.direction === "ascending" ? comparator(b, a, sort.orderBy) : comparator(a, b, sort.orderBy);
    }
    return 1;
  });

  console.log(treff.oppdragsListe.length);

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
        <Table sort={sort} onSortChange={handleSort}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader sortKey={"fagsystemId"} sortable>
                Fagsystem ID
              </Table.ColumnHeader>
              <Table.HeaderCell key={"Faggruppe"} scope="col" children={"Faggruppe"} />
              <Table.ColumnHeader sortKey={"navnFagOmraade"} sortable>
                Fagområde
              </Table.ColumnHeader>
              <Table.HeaderCell key={"Type bilag"} scope="col" children={"Type bilag"} />
              <Table.HeaderCell key={"Status"} scope="col" children={"Status"} />
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
