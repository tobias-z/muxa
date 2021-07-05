import type { ReactNode } from "react";

export type FormMethods = "post" | "put" | "delete";

export interface FormProps {
  method?: FormMethods;
  action?: string;
  children: ReactNode;
}
