const DEBOUNCE_MS = 200;
const timers = {};

export function getItem(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.error("storage.getItem error", e);
    return fallback;
  }
}

export function setItem(key, value) {
  if (timers[key]) clearTimeout(timers[key]);
  timers[key] = setTimeout(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("storage.setItem error", e);
    }
  }, DEBOUNCE_MS);
}

export function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error("storage.removeItem", e);
  }
}
