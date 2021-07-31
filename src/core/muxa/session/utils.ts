export function sessionExists(name: string) {
  return document.cookie
    .split(";")
    .some(row => row.trim().startsWith(`${name}=`));
}
