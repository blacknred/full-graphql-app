export default function delay(ms = 1000): Promise<void> {
  return new Promise((r) => setInterval(r, ms));
}