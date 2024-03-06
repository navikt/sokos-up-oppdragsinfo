import { useRef, useState } from "react";
import { BodyLong, Button, Modal } from "@navikt/ds-react";
import RestService from "../services/rest-service";

const OmposteringerVisning = ({ gjelderId, id }: { gjelderId: string; id: string }) => {
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const [data] = RestService.useFetchOmposteringer(gjelderId, id, shouldFetch);
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <Button
        onClick={() => {
          setShouldFetch(true);
          ref.current?.showModal();
        }}
      >
        Omposteringer
      </Button>

      <Modal ref={ref} header={{ heading: "Omposteringer" }}>
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

export default OmposteringerVisning;
