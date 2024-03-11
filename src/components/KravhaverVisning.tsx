import RestService from "../services/rest-service";

const KravhaverVisning = ({ oppdragsid, linjeid }: { oppdragsid: string; linjeid: string }) => {
  const [data] = RestService.useFetchKravhaver(oppdragsid, linjeid, true);

  return <div>{JSON.stringify(data)}</div>;
};

export default KravhaverVisning;
