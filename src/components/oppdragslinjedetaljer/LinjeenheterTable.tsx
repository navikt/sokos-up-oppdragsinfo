import { Table } from "@navikt/ds-react";
import { Linjeenhet } from "../../models/Linjeenhet";
import RestService from "../../services/rest-service";
import { isEmpty } from "../../util/commonUtils";

const LinjeenheterTable = ({
  oppdragsid,
  linjeid,
}: {
  oppdragsid: string;
  linjeid: string;
}) => {
  const [data] = RestService.useFetchLinjeenheter(oppdragsid, linjeid);

  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell key={"linjeId"} scope="col" children={"Linje-ID"} />
          <Table.HeaderCell
            key={"typeEnhet"}
            scope="col"
            children={"typeEnhet"}
          />
          <Table.HeaderCell key={"enhet"} scope="col" children={"enhet"} />
          <Table.HeaderCell key={"datoFom"} scope="col" children={"datoFom"} />
          <Table.HeaderCell
            key={"nokkelId"}
            scope="col"
            children={"nokkelId"}
          />
          <Table.HeaderCell
            key={"tidspktReg"}
            scope="col"
            children={"tidspktReg"}
          />
          <Table.HeaderCell
            key={"brukerid"}
            scope="col"
            children={"brukerid"}
          />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data &&
          Array.isArray(data) &&
          !isEmpty(data) &&
          data?.map((linjeenhet: Linjeenhet) => (
            <Table.Row key={btoa(JSON.stringify(linjeenhet))}>
              <Table.DataCell>{linjeenhet.linjeId}</Table.DataCell>
              <Table.DataCell>{linjeenhet.typeEnhet}</Table.DataCell>
              <Table.DataCell>{linjeenhet.enhet}</Table.DataCell>
              <Table.DataCell>{linjeenhet.datoFom}</Table.DataCell>
              <Table.DataCell>{linjeenhet.nokkelId}</Table.DataCell>
              <Table.DataCell>{linjeenhet.tidspktReg}</Table.DataCell>
              <Table.DataCell>{linjeenhet.brukerid}</Table.DataCell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default LinjeenheterTable;
