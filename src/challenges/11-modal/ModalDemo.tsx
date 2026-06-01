import { useState } from "react";
import Modal from "./Modal";

/**
 * REFERENCE SOLUTION — demo harness for the accessible Modal.
 *
 * Try it: open the modal, then press Tab repeatedly — focus stays trapped
 * inside. Press Esc or click the backdrop to close. Notice focus returns to the
 * "Open modal" button afterwards.
 */
export default function ModalDemo() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  return (
    <div>
      <button className="btn" onClick={() => setOpen(true)}>
        Open modal
      </button>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="Edit your name">
        <div style={{ display: "grid", gap: 14 }}>
          <p className="hint" style={{ margin: 0 }}>
            Tab cycles only between these controls. Esc or backdrop click closes.
          </p>
          <input
            className="field"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="row" style={{ justifyContent: "flex-end" }}>
            <button className="btn secondary" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button className="btn" onClick={() => setOpen(false)}>
              Save
            </button>
          </div>
        </div>
      </Modal>

      {name && (
        <p className="hint" style={{ marginTop: 16 }}>
          Saved name: <strong>{name}</strong>
        </p>
      )}
    </div>
  );
}
