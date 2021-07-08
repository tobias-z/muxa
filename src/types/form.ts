import type { ReactNode } from "react";

export type FormMethods = "post" | "put" | "delete" | "patch";

export interface FormProps {
  method?: FormMethods;
  action?: string;
  children: ReactNode;
}
