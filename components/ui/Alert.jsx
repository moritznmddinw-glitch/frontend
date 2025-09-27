import React from "react";
import PropTypes from "prop-types";

/**
 * Alert UI:
 * - type: "error" | "success" | "info"
 * - message: string
 * - children: node (optional, custom isi)
 */
export default function Alert({ type = "info", message = "", children, className = "" }) {
  const base = "alert border border-neutral-200 bg-white text-black";
  const typeClass = {
    error: "border-red-600 bg-red-50 text-red-700",
    success: "border-green-600 bg-green-50 text-green-700",
    info: "border-neutral-200 bg-white text-black",
  }[type] || "border-neutral-200 bg-white text-black";
  return (
    <div className={`${base} ${typeClass} ${className}`} role="alert" tabIndex={-1}>
      {message}
      {children}
    </div>
  );
}

Alert.propTypes = {
  type: PropTypes.oneOf(["error", "success", "info"]),
  message: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};
