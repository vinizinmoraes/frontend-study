// A fake search API so the demo runs offline and we can control latency.
// Crucially it honours an AbortSignal, just like real `fetch` does.

const FRUITS = [
  "Apple", "Apricot", "Avocado", "Banana", "Blackberry", "Blueberry",
  "Cherry", "Clementine", "Coconut", "Cranberry", "Date", "Dragonfruit",
  "Fig", "Grape", "Grapefruit", "Guava", "Kiwi", "Lemon", "Lime", "Lychee",
  "Mango", "Melon", "Nectarine", "Orange", "Papaya", "Peach", "Pear",
  "Pineapple", "Plum", "Pomegranate", "Raspberry", "Strawberry", "Tangerine",
  "Watermelon",
];

export class AbortError extends Error {
  constructor() {
    super("Aborted");
    this.name = "AbortError";
  }
}

export function searchFruits(
  query: string,
  signal?: AbortSignal
): Promise<string[]> {
  // Random latency between 200–900ms so out-of-order responses are easy to see.
  const latency = 200 + Math.random() * 700;

  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(new AbortError());

    const timer = setTimeout(() => {
      const q = query.trim().toLowerCase();
      resolve(FRUITS.filter((f) => f.toLowerCase().includes(q)));
    }, latency);

    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new AbortError());
    });
  });
}
