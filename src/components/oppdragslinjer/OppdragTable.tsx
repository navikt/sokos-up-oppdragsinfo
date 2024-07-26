import { Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { Loader, Pagination, Table } from "@navikt/ds-react";
import { OppdragsLinje, OppdragsLinjer } from "../../types/Oppdragslinje";
import commonstyles from "../../styles/common-styles.module.css";
import { applySortDirection, firstOf, formatDate, formatDateTime, handleSort, hasKey, SortState } from "../../util/commonUtil";
import RowsPerPageSelector from "../common/RowsPerPageSelector";
import styles from "../common/sortable-table.module.css";
import AttestantModal from "./AttestantModal";
import StatusModal from "./StatusModal";
import { OppdragsListe } from "../../types/Oppdrag";

const OppdragTable = ({
                        oppdragsId,
                        oppdragsLinjer,
                        oppdragsEgenskap
                      }: {
  oppdragsId: string;
  oppdragsLinjer: OppdragsLinjer;
  oppdragsEgenskap: OppdragsListe;
}) => {
  const [sort, setSort] = useState<SortState<OppdragsLinje> | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const linjeSort = (sortKey?: string) => {
    if (hasKey(firstOf(oppdragsLinjer), sortKey))
      handleSort<OppdragsLinje>(sortKey, setSort, sort);
  };

  const sortedData = oppdragsLinjer.slice().sort(applySortDirection(sort));
  const pageData = sortedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
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
                Linje Id
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"kodeKlasse"} sortable>
                Kode klasse
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"datoVedtakFom"} sortable>
                Dato vedtak fom
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"datoVedtakTom"} sortable>
                Dato vedtak tom
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"sats"} sortable>
                Sats
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"typeSats"} sortable>
                Type sats
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"kodeStatus"} sortable>
                Status
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"datoFom"} sortable>
                Dato fom
              </Table.ColumnHeader>
              <Table.HeaderCell scope="col">Linje Id ref</Table.HeaderCell>
              <Table.HeaderCell scope="col">Attestert</Table.HeaderCell>
              <Table.ColumnHeader sortKey={"tidspktReg"} sortable>
                Tidspunkt registrert
              </Table.ColumnHeader>
              <Table.HeaderCell scope="col"/>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {pageData.map((linje: OppdragsLinje) => (
              <Table.Row key={btoa("" + linje.linjeId)}>
                <Table.DataCell>{linje.linjeId}</Table.DataCell>
                <Table.DataCell>{linje.kodeKlasse}</Table.DataCell>
                <Table.DataCell>
                  {formatDate(linje.datoVedtakFom)}
                </Table.DataCell>
                <Table.DataCell>
                  {formatDate(linje.datoVedtakTom)}
                </Table.DataCell>
                <Table.DataCell>{linje.sats}</Table.DataCell>
                <Table.DataCell>{linje.typeSats}</Table.DataCell>
                <Table.DataCell>
                  <Suspense fallback={<Loader size="medium" title="Laster ..." />}>
                    <StatusModal
                      text={linje.kodeStatus}
                      oppdragsId={oppdragsId}
                      linjeId={linje.linjeId}
                    />
                  </Suspense>
                </Table.DataCell>
                <Table.DataCell>{formatDate(linje.datoFom)}</Table.DataCell>
                <Table.DataCell>{linje.linjeIdKorr}</Table.DataCell>
                <Table.DataCell>
                  <Suspense fallback={<Loader size="medium" title="Laster ..." />}>
                    <AttestantModal
                      text={linje.attestert}
                      oppdragsId={oppdragsId}
                      linjeId={linje.linjeId}
                    />
                  </Suspense>
                </Table.DataCell>
                <Table.DataCell>{formatDateTime(linje.tidspktReg)}</Table.DataCell>
                <Table.DataCell>
                  <Link
                    to={`/${oppdragsId}/${linje.linjeId}`}
                    state={{
                      oppdragsId: oppdragsId,
                      linjeId: linje.linjeId,
                      oppdragsEgenskap: oppdragsEgenskap
                    }}
                  >
                    Detaljer...
                  </Link>
                </Table.DataCell>
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
          />
        </div>
      )}
    </>
  );
};

export default OppdragTable;
