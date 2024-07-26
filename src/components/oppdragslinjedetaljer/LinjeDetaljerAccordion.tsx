import { PropsWithChildren } from "react";
import { Accordion } from "@navikt/ds-react";

const LinjeDetaljerAccordion = ({
  title,
  enabled,
  children,
}: PropsWithChildren<{ title: string; enabled: boolean }>) => {
  return (
    <Accordion.Item>
      {enabled && (
        <>
          <Accordion.Header>{title}</Accordion.Header>
          <Accordion.Content>{children}</Accordion.Content>
        </>
      )}
    </Accordion.Item>
  );
};

export default LinjeDetaljerAccordion;
