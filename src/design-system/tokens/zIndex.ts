export const zIndex = {
  base: 0,
  dropdown: 1000,
  modal: 2000,
  tooltip: 3000,
  toast: 4000,
} as const;

export type ZIndexToken = typeof zIndex;
