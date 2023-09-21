export function DialogueModal({ isDialogueShown, setIsDialogueShown }) {
  return (
    <div className={`modal-overlay ${isDialogueShown && "show"}`}>
      <dialog className="modal" open>
        <p>
          This is a <strong>DIALOG</strong> modal
        </p>
        <button onClick={() => setIsDialogueShown(false)}>Close</button>
      </dialog>
    </div>
  );
}
