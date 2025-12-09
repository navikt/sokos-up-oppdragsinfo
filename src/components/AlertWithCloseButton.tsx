import React from "react";
import { Alert, AlertProps } from "@navikt/ds-react";

export default function AlertWithCloseButton({
  children,
  variant,
  setShow,
  show,
}: {
  children?: React.ReactNode;
  variant: AlertProps["variant"];
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return show ? (
    <Alert
      variant={variant}
      closeButton
      role="status"
      onClose={() => setShow(false)}
    >
      {children || "Content"}
    </Alert>
  ) : null;
}
