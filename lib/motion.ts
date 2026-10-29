// Tiny shared store so the hero intro timeline can drive the Stage without React state.
export const motion = { intro: { v: 0 }, update: (() => {}) as () => void, reduce: false };
