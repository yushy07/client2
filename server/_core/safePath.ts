import path from "node:path";

export function safeDecodeUriComponent(value: string): string | null {
  try {
    return decodeURIComponent(value);
  } catch {
    return null;
  }
}

export function resolveContainedPath(base: string, relativePath: string): string | null {
  if (relativePath.includes("\0")) return null;
  const resolvedBase = path.resolve(base);
  const resolved = path.resolve(resolvedBase, relativePath.replace(/\\/g, "/"));
  const relative = path.relative(resolvedBase, resolved);
  return relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative) ? resolved : null;
}
