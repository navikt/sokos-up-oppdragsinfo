import { useRef, useState } from "react";
import RestService from "../services/rest-service";
import { BodyLong, Button, Modal } from "@navikt/ds-react";

const OvrigVisning = ({ oppdragsid, linjeid }: { oppdragsid: string; linjeid: string }) => {
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const [data] = RestService.useFetchOvrig(oppdragsid, linjeid, shouldFetch);
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <Button
        onClick={() => {
          setShouldFetch(true);
          ref.current?.showModal();
        }}
      >
        Øvrig
      </Button>

      <Modal ref={ref} header={{ heading: "Øvrig" }}>
        <Modal.Body>
          <BodyLong>{JSON.stringify(data)}</BodyLong>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={() => ref.current?.close()}>
            Lukk
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OvrigVisning;
