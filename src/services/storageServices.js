/**
 * Simple wrapper around localStorage to encode and decode JSON.
 * Using these helpers throughout the app ensures consistent
 * serialization and reduces boilerplate when persisting data.
 */

export function getLocalItem(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function setLocalItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Swallow quota or serialization errors.  In a real app you
    // might surface these to an error tracking service.
  }
}

export function removeLocalItem(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}