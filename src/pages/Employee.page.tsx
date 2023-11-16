import { BodyLong, Heading, Loader, Panel, Table } from "@navikt/ds-react";
import styles from "./Employee.module.css";
import RestService from "../services/rest-service";

const ResultatSide = () => {
  const { data, isLoading } = RestService.useFetchEmployees();

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <Loader size="3xlarge" title="Henter data..." />
      </div>
    );
  }

  return (
    <>
      <Panel border className={styles.panel}>
        <Heading spacing level="2" size="large">
          sokos-mikrofrontend-template
        </Heading>
        <BodyLong>Dette er en template for å bygge undersider i Økonomiportalen</BodyLong>
      </Panel>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell scope="col">Id</Table.HeaderCell>
            <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
            <Table.HeaderCell scope="col">Yrke</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.map(({ id, navn, yrke }, i) => {
            return (
              <Table.Row key={i + id}>
                <Table.HeaderCell scope="row">{id}</Table.HeaderCell>
                <Table.DataCell>{navn}</Table.DataCell>
                <Table.DataCell>{yrke}</Table.DataCell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
};

export default ResultatSide;
