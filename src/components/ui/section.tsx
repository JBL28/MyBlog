import type { HTMLAttributes } from "react";
import { clsx } from "clsx";

export function Section({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={clsx("space-y-5", className)} {...props} />;
}
