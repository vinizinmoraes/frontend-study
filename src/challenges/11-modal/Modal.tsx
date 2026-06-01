import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

/**
 * REFERENCE SOLUTION — an accessible modal dialog.
 *
 * The checklist most people miss:
 *  1. Rendered in a PORTAL so it escapes parent overflow/z-index/stacking.
 *  2. ESC closes it.
 *  3. Clicking the backdrop (not the panel) closes it.
 *  4. FOCUS TRAP — Tab/Shift+Tab cycle within the dialog, never escaping.
 *  5. Focus moves INTO the dialog on open and is RESTORED to the trigger on close.
 *  6. Body scroll is locked while open.
 *  7. Correct ARIA: role="dialog", aria-modal, aria-labelledby.
 */
export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  // Remember what was focused before opening, to restore it on close.
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement;

    // Lock body scroll.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the dialog.
    panelRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      // Focus trap: keep Tab within the focusable elements of the panel.
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      // Restore focus to whatever opened the modal.
      previouslyFocused.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "grid",
        placeItems: "center",
        zIndex: 1000,
      }}
      // Close only when the backdrop itself is clicked, not a child.
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        style={{
          background: "var(--panel)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: 24,
          width: "min(440px, 90vw)",
          outline: "none",
        }}
      >
        <div className="row" style={{ justifyContent: "space-between", marginBottom: 12 }}>
          <h2 id="modal-title" style={{ margin: 0, fontSize: 18 }}>
            {title}
          </h2>
          <button className="btn secondary" onClick={onClose} aria-label="Close dialog">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}
