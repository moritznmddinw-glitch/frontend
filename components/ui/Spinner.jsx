import React from "react";

/**
 * Spinner UI generik, gunakan untuk loading state.
 */
export default function Spinner({ className = "" }) {
  return (
    <span className={`spinner border-neutral-200 border-t-black ${className}`} aria-label="Loading" />
  );
}
