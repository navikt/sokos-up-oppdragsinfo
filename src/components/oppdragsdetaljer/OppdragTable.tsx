import { Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { Loader, Pagination, Table } from "@navikt/ds-react";
import { Oppdrag } from "../../models/Oppdrag";
import { Oppdragslinje } from "../../models/Oppdragslinje";
import commonstyles from "../../util/common-styles.module.css";
import {
  SortState,
  applySortDirection,
  firstOf,
  formatDate,
  handleSort,
  hasKey,
} from "../../util/commonUtils";
import RowsPerPageSelector from "../common/RowsPerPageSelector";
import styles from "../common/sortable-table.module.css";
import AttestantModal from "./AttestantModal";
import StatusModal from "./StatusModal";

const OppdragTable = ({
  oppdragsid,
  oppdragsdetaljer,
}: {
  oppdragsid: string;
  oppdragsdetaljer: Oppdrag;
}) => {
  const [sort, setSort] = useState<SortState<Oppdragslinje> | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const linjeSort = (sortKey?: string) => {
    if (hasKey(firstOf(oppdragsdetaljer.oppdragsLinjer), sortKey))
      handleSort<Oppdragslinje>(sortKey, setSort, sort);
  };

  const sortedData = oppdragsdetaljer.oppdragsLinjer
    .slice()
    .sort(applySortDirection(sort));
  const pageData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );
  const pagecount = Math.ceil(
    oppdragsdetaljer.oppdragsLinjer.length / rowsPerPage,
  );

  const antall = oppdragsdetaljer?.oppdragsLinjer?.length ?? 0;

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
                Linjenr
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"kodeKlasse"} sortable>
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
              <Table.ColumnHeader sortKey={"kodeStatus"} sortable>
                Status
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"datoFom"} sortable>
                Dato Fom
              </Table.ColumnHeader>
              <Table.HeaderCell
                key={"LinjeIdKorr"}
                scope="col"
                children={"LinjeIdKorr"}
              />
              <Table.HeaderCell
                key={"Attestert"}
                scope="col"
                children={"Attestert"}
              />
              <Table.ColumnHeader sortKey={"tidspktReg"} sortable>
                Tidspunkt registrert
              </Table.ColumnHeader>
              <Table.HeaderCell
                key={"Detaljer"}
                scope="col"
                children={"Detaljer"}
              />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {pageData.map((linje: Oppdragslinje) => (
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
                  <Suspense
                    fallback={<Loader size="medium" title="Laster ..." />}
                  >
                    <StatusModal
                      text={linje.kodeStatus}
                      oppdragsid={oppdragsid}
                      linjeid={linje.linjeId}
                    />
                  </Suspense>
                </Table.DataCell>
                <Table.DataCell>{formatDate(linje.datoFom)}</Table.DataCell>
                <Table.DataCell>{linje.linjeIdKorr}</Table.DataCell>
                <Table.DataCell>
                  <Suspense
                    fallback={<Loader size="medium" title="Laster ..." />}
                  >
                    <AttestantModal
                      text={linje.attestert}
                      oppdragsid={oppdragsid}
                      linjeid={linje.linjeId}
                    />
                  </Suspense>
                </Table.DataCell>
                <Table.DataCell>{linje.tidspktReg}</Table.DataCell>
                <Table.DataCell>
                  <Link to={`/${oppdragsid}/${linje.linjeId}`}>
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
