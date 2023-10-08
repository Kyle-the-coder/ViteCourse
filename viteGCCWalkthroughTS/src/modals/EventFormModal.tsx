import React from "react";
import { Modal } from "../components/Modal";
import { UnionOmit } from "../utils/types";

type EventFormModalProps = {
  onSubmit: (event: UnionOmit<Event, "id">) => void;
  onDelete: () => void;
  event: Event;
  date: Date;
};

export function EventFormModal({
  onSubmit,
  onDelete,
  event,
  date,
  ...modalProps
}) {
  return <Modal {...modalProps}></Modal>;
}
