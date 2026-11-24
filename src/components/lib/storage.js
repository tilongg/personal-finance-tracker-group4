export function loadStoredArray(key) {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return [];

    const value = JSON.parse(saved);
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function saveStoredArray(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to save ${key}:`, error);
  }
}
