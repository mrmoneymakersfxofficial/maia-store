export function ve(id: string, type: string, path: string): Record<string, string> {
  const v = `id=${id};type=${type};path=${path};base=${encodeURIComponent("/admin")}`;
  return { "data-sanity": v };
}
