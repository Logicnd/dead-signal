import { createHash, timingSafeEqual } from "node:crypto";

export const ACCESS_COOKIE_NAME = "ds_gate_alpha";
export const ARCHIVE_COOKIE_NAME = "ds_gate_beta";
export const SEALED_COOKIE_NAME = "ds_gate_gamma";

const ACCESS_KEY_HASH_HEX =
  "e1ba87b8bd29f207ce2ddd273d316d0c2a2e138ca873635c4aaf352695d52d48";
const ARCHIVE_PHRASE_HASH_HEX =
  "ff0a592b47faaea9dc6f262b8257d71eb7f75079075d66b6e9467df0615c70a0";
const OBSERVER_PHRASE_HASH_HEX =
  "e4074a0541716e3c209cbafcbda6be49a73105842bd6859eaf10d1cf6d9d95da";

const ACCESS_SESSION_COOKIE_VALUE = createHash("sha256")
  .update("dead-signal/archive-session")
  .digest("hex");
const ARCHIVE_SESSION_COOKIE_VALUE = createHash("sha256")
  .update("dead-signal/observer-session")
  .digest("hex");
const SEALED_SESSION_COOKIE_VALUE = createHash("sha256")
  .update("dead-signal/sealed-session")
  .digest("hex");

function normalizeSecret(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function verifySecret(value: string, expectedHashHex: string) {
  const normalized = normalizeSecret(value);
  const actualDigest = createHash("sha256").update(normalized).digest();
  const expectedDigest = Buffer.from(expectedHashHex, "hex");

  return timingSafeEqual(actualDigest, expectedDigest);
}

export function validateAccessKey(value: string) {
  return verifySecret(value, ACCESS_KEY_HASH_HEX);
}

export function validateArchivePhrase(value: string) {
  return verifySecret(value, ARCHIVE_PHRASE_HASH_HEX);
}

export function validateObserverPhrase(value: string) {
  return verifySecret(value, OBSERVER_PHRASE_HASH_HEX);
}

export function hasArchiveAccess(value?: string) {
  return value === ACCESS_SESSION_COOKIE_VALUE;
}

export function hasObserverAccess(value?: string) {
  return value === ARCHIVE_SESSION_COOKIE_VALUE;
}

export function hasSealedAccess(value?: string) {
  return value === SEALED_SESSION_COOKIE_VALUE;
}

export function getSessionCookieValue(
  stage: "archive" | "observer" | "sealed",
) {
  switch (stage) {
    case "archive":
      return ACCESS_SESSION_COOKIE_VALUE;
    case "observer":
      return ARCHIVE_SESSION_COOKIE_VALUE;
    case "sealed":
      return SEALED_SESSION_COOKIE_VALUE;
  }
}
