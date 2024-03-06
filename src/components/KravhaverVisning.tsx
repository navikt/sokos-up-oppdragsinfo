import { useRef, useState } from "react";
import RestService from "../services/rest-service";
import { BodyLong, Button, Modal } from "@navikt/ds-react";

const KravhaverVisning = ({
  oppdragsid,
  linjeid,
  enabled,
}: {
  oppdragsid: string;
  linjeid: string;
  enabled: boolean;
}) => {
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const [data] = RestService.useFetchKravhaver(oppdragsid, linjeid, shouldFetch);
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <Button
        disabled={!enabled}
        onClick={() => {
          setShouldFetch(true);
          ref.current?.showModal();
        }}
      >
        Kravhaver
      </Button>

      <Modal ref={ref} header={{ heading: "Kravhaver" }}>
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

export default KravhaverVisning;
