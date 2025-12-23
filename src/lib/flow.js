import { scenes } from "../flows/story";

export function getSceneById(id) {
  return scenes.find((s) => s.id === id) ?? null;
}

export function isExternalLink(to) {
  return typeof to === "string" && /^https?:\/\//i.test(to);
}
