import { Button, Pagination, Table } from "@navikt/ds-react";
import { Suspense, useState } from "react";
import { Link } from "react-router";
import RowsPerPageSelector from "../../components/RowsPerPageSelector";
import { useStore } from "../../store/AppState";
import commonstyles from "../../styles/common-styles.module.css";
import type {
	OppdragsLinje,
	OppdragsLinjeList,
} from "../../types/Oppdragslinje";
import { logUserEvent, OPPDRAG, TABLE } from "../../umami/umami";
import {
	applySortDirection,
	firstOf,
	formatDate,
	formaterTilNorskTall,
	handleSort,
	hasKey,
	type SortState,
} from "../../util/commonUtil";
import { LINJE } from "../../util/routenames";
import AttestertModal from "./AttestertModal";
import StatusModal from "./StatusModal";

interface OppdragLinjeTableProps {
	oppdragsId: string;
	oppdragsLinjer: OppdragsLinjeList;
}

export default function OppdragLinjeTable(props: OppdragLinjeTableProps) {
	const [sort, setSort] = useState<SortState<OppdragsLinje> | undefined>();
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState<number>(25);
	const { setLinjeId } = useStore();

	const linjeSort = (sortKey?: string) => {
		if (hasKey(firstOf(props.oppdragsLinjer), sortKey)) {
			logUserEvent(TABLE.SORTER, { sortKey });
			handleSort<OppdragsLinje>(sortKey, setSort, sort);
		}
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

	function updateRowsPerPage(rows: number) {
		setRowsPerPage(rows);
		setCurrentPage(1);
	}

	return (
		<div className={commonstyles["table-container"]}>
			<RowsPerPageSelector
				rowsPerPage={rowsPerPage}
				updateRowsPerPage={updateRowsPerPage}
				totalCount={antall}
				currentPage={currentPage}
				pageCount={pagecount}
			/>
			<div className={commonstyles.table}>
				<Table zebraStripes sort={sort} onSortChange={linjeSort}>
					<Table.Header>
						<Table.Row>
							<Table.ColumnHeader sortKey={"linjeId"} sortable>
								Linje
							</Table.ColumnHeader>
							<Table.ColumnHeader sortKey={"kodeKlasse"} sortable>
								Klassekode
							</Table.ColumnHeader>
							<Table.ColumnHeader>Kontonr</Table.ColumnHeader>
							<Table.ColumnHeader sortKey={"datoVedtakFom"} sortable>
								Vedtak fom
							</Table.ColumnHeader>
							<Table.ColumnHeader sortKey={"datoVedtakTom"} sortable>
								Vedtak tom
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
								Status fom
							</Table.ColumnHeader>
							<Table.HeaderCell scope="col">Linje ref</Table.HeaderCell>
							<Table.HeaderCell scope="col">Attestert</Table.HeaderCell>
							<Table.HeaderCell scope="col" />
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{pageData.map((linje: OppdragsLinje) => (
							<Table.Row key={btoa(`${linje.linjeId}`)}>
								<Table.DataCell>{linje.linjeId}</Table.DataCell>
								<Table.DataCell>{linje.kodeKlasse}</Table.DataCell>
								<Table.DataCell>{`${linje.hovedkontonr ?? ""}${linje.underkontonr ?? ""}`}</Table.DataCell>
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
											<Button
												data-umami-event={OPPDRAG.STATUS_MODAL_OPENED}
												variant={"tertiary"}
												loading
												size="xsmall"
											>
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
											<Button
												data-umami-event={OPPDRAG.ATTESTERT_MODAL_OPENED}
												variant={"tertiary"}
												loading
												size="xsmall"
											>
												{linje.attestert === "J" ? "Ja" : "Nei"}
											</Button>
										}
									>
										<AttestertModal
											text={linje.attestert === "J" ? "Ja" : "Nei"}
											oppdragsId={props.oppdragsId}
											linjeId={linje.linjeId}
										/>
									</Suspense>
								</Table.DataCell>
								<Table.DataCell>
									<Link
										to={LINJE}
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
				<div className={commonstyles.table__pagination}>
					<Pagination
						page={currentPage}
						onPageChange={setCurrentPage}
						count={pagecount}
						size="small"
						prevNextTexts
					/>
				</div>
			)}
		</div>
	);
}
