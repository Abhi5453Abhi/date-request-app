import { customAlphabet } from "nanoid";

// Generate a short, URL-friendly slug
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 8);

export function generateSlug(): string {
  return nanoid();
}

export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
