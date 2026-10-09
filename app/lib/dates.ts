/** "5 Oct 2026" — fixed format so server and browser agree. */
export function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kathmandu" });
}
