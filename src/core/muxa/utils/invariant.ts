export function invariant(value: boolean, message?: string): asserts value;

export function invariant<T>(
  value: T | null | undefined,
  message?: string
): asserts value is T;

export function invariant(value: any, message?: string) {
  /* istanbul ignore next */
  if (value === false || value === null || typeof value === "undefined") {
    console.error(message);
    throw new Error(message);
  }
}
