import { ReactNode } from "react";

export default function PrimaryButton({
  type,
  isDisabled,
  children,
  onClick,
}: {
  type?: "button" | "submit";
  isDisabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      className="primary-button"
      disabled={isDisabled}
      type={type || "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
