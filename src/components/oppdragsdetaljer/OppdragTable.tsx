import { useState } from "react";
import { Pagination, Table } from "@navikt/ds-react";
import { comparator, formatDate, SortState } from "../../util/commonUtils";
import styles from "./OppdragsTable.module.css";
import commonstyles from "../../util/common-styles.module.css";
import { Oppdragsdetaljer } from "../../models/Oppdragsdetaljer";
import { Oppdragslinje } from "../../models/Oppdragslinje";
import StatuserVisning from "./StatuserVisning";
import AttestantVisning from "./AttestantVisning";
import { Link } from "react-router-dom";

const OppdragTable = ({ oppdragsid, oppdragsdetaljer }: { oppdragsid: string; oppdragsdetaljer: Oppdragsdetaljer }) => {
  const [sort, setSort] = useState<SortState<Oppdragslinje> | undefined>();
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

  const sortedData = oppdragsdetaljer.oppdragsLinjer.slice().sort((a, b) => {
    if (sort) {
      return sort.direction === "ascending"
        ? comparator<Oppdragslinje>(b, a, sort.orderBy)
        : comparator<Oppdragslinje>(a, b, sort.orderBy);
    }
    return 1;
  });

  const pageData = sortedData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const pagecount = Math.ceil(oppdragsdetaljer.oppdragsLinjer.length / rowsPerPage);
  return (
    <>
      {pagecount > 1 ? (
        <div className={styles.sortabletable__topinfo}>
          <p>
            {oppdragsdetaljer?.oppdragsLinjer?.length ?? 0} treff, {page} av {pagecount} sider
          </p>
          <p>Vis {rowsPerPage} per side</p>
        </div>
      ) : (
        <div className={commonstyles.spacing} />
      )}
      <div className={styles.sortabletable}>
        <Table sort={sort} onSortChange={handleSort}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader sortKey={"linjeId"} sortable>
                Linjenr
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"kodeklasse"} sortable>
                Kodeklasse
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"datoVedtakFom"} sortable>
                Dato Vedtak FOM
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"datoVedtakTom"} sortable>
                Dato Vedtak TOM
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"sats"} sortable>
                Sats
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"typeSats"} sortable>
                Type sats
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"status"} sortable>
                Status
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"datoFom"} sortable>
                Dato Fom
              </Table.ColumnHeader>
              <Table.HeaderCell key={"LinjeIdKorr"} scope="col" children={"LinjeIdKorr"} />
              <Table.HeaderCell key={"Attestert"} scope="col" children={"Attestert"} />
              <Table.ColumnHeader sortKey={"tidspktReg"} sortable>
                Tidspunkt registrert
              </Table.ColumnHeader>
              <Table.HeaderCell key={"Detaljer"} scope="col" children={"Detaljer"} />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {pageData.map((linje: Oppdragslinje) => (
              <Table.Row key={btoa("" + linje.linjeId)}>
                <Table.DataCell>{linje.linjeId}</Table.DataCell>
                <Table.DataCell>{linje.kodeKlasse}</Table.DataCell>
                <Table.DataCell>{formatDate(linje.datoVedtakFom)}</Table.DataCell>
                <Table.DataCell>{formatDate(linje.datoVedtakTom)}</Table.DataCell>
                <Table.DataCell>{linje.sats}</Table.DataCell>
                <Table.DataCell>{linje.typeSats}</Table.DataCell>
                <Table.DataCell>
                  <StatuserVisning tekst={linje.kodeStatus} oppdragsid={oppdragsid} linjeid={linje.linjeId} />
                </Table.DataCell>
                <Table.DataCell>{formatDate(linje.datoFom)}</Table.DataCell>
                <Table.DataCell>{linje.linjeIdKorr}</Table.DataCell>
                <Table.DataCell>
                  <AttestantVisning tekst={linje.attestert} oppdragsid={oppdragsid} linjeid={linje.linjeId} />
                </Table.DataCell>
                <Table.DataCell>{linje.tidspktReg}</Table.DataCell>
                <Table.DataCell>
                  <Link to={`/${oppdragsid}/${linje.linjeId}`}>Detaljer...</Link>
                </Table.DataCell>
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

export default OppdragTable;
