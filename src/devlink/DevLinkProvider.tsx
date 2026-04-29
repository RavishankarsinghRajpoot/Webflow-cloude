"use client";

import { ReactNode } from "react";

type DevLinkProviderProps = {
  children: ReactNode;
};

/**
 * Local fallback provider used when generated DevLink files
 * are not present yet.
 */
export function DevLinkProvider({ children }: DevLinkProviderProps) {
  return <>{children}</>;
}
