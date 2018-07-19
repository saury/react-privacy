export function errorHandler(msg: string, throwErr?: boolean): void {
  // alert(msg);
  if (!throwErr) {
    return;
  }
  throw msg;
}
