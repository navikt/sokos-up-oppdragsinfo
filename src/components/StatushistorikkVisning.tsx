import { useRef, useState } from "react";
import { BodyLong, Button, Modal } from "@navikt/ds-react";
import RestService from "../services/rest-service";

const StatushistorikkVisning = ({ id }: { id: string }) => {
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const [data] = RestService.useFetchStatushistorikk(id, shouldFetch);
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <Button
        onClick={() => {
          setShouldFetch(true);
          ref.current?.showModal();
        }}
      >
        Statushistorikk
      </Button>

      <Modal ref={ref} header={{ heading: "Statushistorikk" }}>
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

export default StatushistorikkVisning;
