/** Stable percentage anchors within the desktop, independent of card dimensions. */
export function getNotePosition(id: number) {
  const seed = Math.imul(id, 2654435761) >>> 0;
  return {
    x: 5 + ((seed % 1000) / 1000) * 90,
    y: 5 + (((seed >>> 10) % 1000) / 1000) * 90,
  };
}
