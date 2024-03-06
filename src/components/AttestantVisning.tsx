import { useRef, useState } from "react";
import RestService from "../services/rest-service";
import { BodyLong, Button, Modal } from "@navikt/ds-react";

const AttestantVisning = ({ oppdragsid, linjeid, tekst }: { oppdragsid: string; linjeid: string; tekst: string }) => {
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const [data] = RestService.useFetchAttestant(oppdragsid, linjeid, shouldFetch);
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <Button
        onClick={() => {
          setShouldFetch(true);
          ref.current?.showModal();
        }}
      >
        {tekst}
      </Button>

      <Modal ref={ref} header={{ heading: "Attestant" }}>
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

export default AttestantVisning;
