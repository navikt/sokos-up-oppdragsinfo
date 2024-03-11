import RestService from "../services/rest-service";

const OvrigVisning = ({ oppdragsid, linjeid }: { oppdragsid: string; linjeid: string }) => {
  const [data] = RestService.useFetchOvrig(oppdragsid, linjeid, true);
  return <div>{JSON.stringify(data)}</div>;
};

export default OvrigVisning;
