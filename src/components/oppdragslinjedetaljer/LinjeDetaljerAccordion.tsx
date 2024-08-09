import React, { PropsWithChildren, ReactNode } from "react";
import { Accordion } from "@navikt/ds-react";

interface LinjeDetaljerAccordionProps {
  title: string;
  enabled: boolean;
  children: ReactNode;
}

export default function LinjeDetaljerAccordion(
  props: PropsWithChildren<LinjeDetaljerAccordionProps>,
) {
  return (
    <Accordion.Item>
      {props.enabled && (
        <>
          <Accordion.Header>{props.title}</Accordion.Header>
          <Accordion.Content>{props.children}</Accordion.Content>
        </>
      )}
    </Accordion.Item>
  );
}
