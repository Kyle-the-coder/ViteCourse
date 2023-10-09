import React, { Fragment, useId } from "react";
import { Modal, ModalProps } from "../components/Modal";
import { Event } from "../context/Events";
import { EVENT_COLORS } from "../context/useEvent";
import { formatDate } from "../utils/formatDate";
import { UnionOmit } from "../utils/types";

type EventFormModalProps = {
  onSubmit: (event: UnionOmit<Event, "id">) => void;
} & (
  | { onDelete: () => void; event: Event; date?: Date }
  | { onDelete?: never; event?: never; date: Date }
) &
  Omit<ModalProps, "children">;

export function EventFormModal({
  onSubmit,
  onDelete,
  event,
  date,
  ...modalProps
}: EventFormModalProps) {
  const isNew = event == null;
  const formId = useId();
  return (
    <Modal {...modalProps}>
      <div className="modal-title">
        <div>{isNew ? "Add" : "Edit"} Event</div>
        <small>{formatDate(date || event.date, { dateStyle: "short" })}</small>
        <button className="close-btn" onClick={modalProps.onClose}>
          &times;
        </button>
      </div>
      <form>
        <div className="form-group">
          <label htmlFor={`${formId}-name`}>Name</label>
          <input type="text" name="name" id={`${formId}-name`} />
        </div>
        <div className="form-group checkbox">
          <input type="checkbox" name="all-day" id={`${formId}-all-day`} />
          <label htmlFor={`${formId}-all-day`}>All Day?</label>
        </div>
        <div className="row">
          <div className="form-group">
            <label htmlFor={`${formId}-start-time`}>Start Time</label>
            <input type="time" id={`${formId}-start-time`} name="start-time" />
          </div>
          <div className="form-group">
            <label htmlFor={`${formId}-end-time`}>End Time</label>
            <input type="time" id={`${formId}-end-time`} name="end-time" />
          </div>
        </div>
        <div className="form-group">
          <label>Color</label>
          <div className="row left">
            {EVENT_COLORS.map((color) => (
              <Fragment key={color}>
                <input
                  type="radio"
                  name="color"
                  value={color}
                  id={`${formId}-${color}`}
                  className="color-radio"
                />
                <label htmlFor={`${formId}-${color}`}>
                  <span className="sr-only">{color}</span>
                </label>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="row">
          <button className="btn btn-success" type="submit">
            {isNew ? "Add" : "Edit"}
          </button>
          {onDelete === null && (
            <button className="btn btn-delete" onClick={onDelete} type="button">
              Delete
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}
