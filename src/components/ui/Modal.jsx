import { useTheme } from "../../theme/useTheme";
import { Button } from "./Button";

export function Modal({ isOpen, title, ariaLabelledBy, onClose, children }) {
  const t = useTheme();

  if (!isOpen) return null;

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    background: "rgba(15,23,42,0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: t.space(4),
  };

  const modalStyle = {
    width: "100%",
    maxWidth: 560,
    background: "#fff",
    borderRadius: t.radius.lg,
    boxShadow: t.shadow.lg,
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    maxHeight: "90vh",
  };

  const headerStyle = {
    padding: t.space(4),
    borderBottom: `1px solid ${t.color.border}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: t.space(2),
  };

  const titleStyle = {
    fontSize: t.font.size.lg,
    fontWeight: t.font.weight.semi,
  };

  const bodyStyle = {
    padding: t.space(4),
    paddingTop: t.space(3),
    overflowY: "auto",
    display: "grid",
    gap: t.space(3),
  };

  const footerStyle = {
    padding: t.space(4),
    borderTop: `1px solid ${t.color.border}`,
    display: "flex",
    justifyContent: "flex-end",
    gap: t.space(2),
  };

  const titleId = ariaLabelledBy || "modal-title";

  return (
    <div
      style={overlayStyle}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <div>
            <div id={titleId} style={titleStyle}>
              {title}
            </div>
          </div>
          <Button variant="ghost" onClick={onClose} aria-label="Close dialog">
            Close
          </Button>
        </div>
        <div style={bodyStyle}>{children}</div>
        <div style={footerStyle}></div>
      </div>
    </div>
  );
}
