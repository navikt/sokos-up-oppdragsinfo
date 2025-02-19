import { Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Pagination, Table } from "@navikt/ds-react";
import RowsPerPageSelector from "../../components/RowsPerPageSelector";
import { useStore } from "../../store/AppState";
import commonstyles from "../../styles/common-styles.module.css";
import { OppdragsLinje, OppdragsLinjeList } from "../../types/Oppdragslinje";
import {
  SortState,
  applySortDirection,
  firstOf,
  formatDate,
  formaterTilNorskTall,
  handleSort,
  hasKey,
} from "../../util/commonUtil";
import AttestantModal from "./AttestantModal";
import StatusModal from "./StatusModal";

interface OppdragLinjeTableProps {
  oppdragsId: string;
  oppdragsLinjer: OppdragsLinjeList;
}

export default function OppdragLinjeTable(props: OppdragLinjeTableProps) {
  const [sort, setSort] = useState<SortState<OppdragsLinje> | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const { setLinjeId } = useStore();

  const linjeSort = (sortKey?: string) => {
    if (hasKey(firstOf(props.oppdragsLinjer), sortKey))
      handleSort<OppdragsLinje>(sortKey, setSort, sort);
  };

  const sortedData = props.oppdragsLinjer
    .slice()
    .sort(applySortDirection(sort));
  const pageData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );
  const pagecount = Math.ceil(props.oppdragsLinjer.length / rowsPerPage);
  const antall = props.oppdragsLinjer.length ?? 0;

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
                Linje-ID
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"kodeKlasse"} sortable>
                Klassekode
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"datoVedtakFom"} sortable>
                Vedtak FOM
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"datoVedtakTom"} sortable>
                Vedtak TOM
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"sats"} sortable>
                Sats
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"typeSats"} sortable>
                Satstype
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"kodeStatus"} sortable>
                Status
              </Table.ColumnHeader>
              <Table.ColumnHeader sortKey={"datoFom"} sortable>
                Status FOM
              </Table.ColumnHeader>
              <Table.HeaderCell scope="col">Linje Id ref</Table.HeaderCell>
              <Table.HeaderCell scope="col">Attestert</Table.HeaderCell>
              <Table.HeaderCell scope="col" />
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
                <Table.DataCell>
                  {formaterTilNorskTall(linje.sats)}
                </Table.DataCell>
                <Table.DataCell>{linje.typeSats}</Table.DataCell>
                <Table.DataCell>
                  <Suspense
                    fallback={
                      <Button variant={"tertiary"} loading size="xsmall">
                        {linje.kodeStatus}
                      </Button>
                    }
                  >
                    <StatusModal
                      text={linje.kodeStatus}
                      oppdragsId={props.oppdragsId}
                      linjeId={linje.linjeId}
                    />
                  </Suspense>
                </Table.DataCell>
                <Table.DataCell>{formatDate(linje.datoFom)}</Table.DataCell>
                <Table.DataCell>{linje.linjeIdKorr}</Table.DataCell>
                <Table.DataCell>
                  <Suspense
                    fallback={
                      <Button variant={"tertiary"} loading size="xsmall">
                        {linje.attestert === "J" ? "Ja" : "Nei"}
                      </Button>
                    }
                  >
                    <AttestantModal
                      text={linje.attestert === "J" ? "Ja" : "Nei"}
                      oppdragsId={props.oppdragsId}
                      linjeId={linje.linjeId}
                    />
                  </Suspense>
                </Table.DataCell>
                <Table.DataCell>
                  <Link
                    to={`/${props.oppdragsId}/${linje.linjeId}`}
                    replace
                    onClick={() => setLinjeId(linje.linjeId)}
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
