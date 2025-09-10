"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * SyncTokenPage
 * - Reads `token` from URL query (?token=...)
 * - Persists token to localStorage (compatible with previous HTML behavior)
 * - Redirects user to the homepage after a short delay
 *
 * Backend integration note:
 * - Configure your OAuth callback handler to redirect to
 *   http://localhost:3000/sync-token?token=<JWT>
 *   in development (and the equivalent production URL later).
 */
export default function SyncTokenPage() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");
  const next = params.get("next") || "/";

  useEffect(() => {
    try {
      if (token) {
        localStorage.setItem("token", token);
      }
    } catch (e) {
      // ignore storage errors (private mode, etc.)
    }

    const t = setTimeout(() => {
      router.replace(next);
    }, 400);

    return () => clearTimeout(t);
  }, [token, router]);

  return (
    <div className="min-h-dvh flex items-center justify-center p-6 text-sm text-neutral-700">
      Menyimpan token ke browser...
    </div>
  );
}
