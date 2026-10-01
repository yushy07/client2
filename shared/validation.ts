// Shared input-validation rules. The browser forms and the tRPC procedures both
// import from here so a value the client accepts is never rejected by the
// server, and vice versa.

// ---------------------------------------------------------------------------
// Phone numbers
// ---------------------------------------------------------------------------

/** Separators a phone number may contain alongside digits. */
const PHONE_ALLOWED_CHARACTERS = /^[0-9+()\-\s.]+$/;

export const PHONE_MIN_DIGITS = 7;
export const PHONE_MAX_DIGITS = 15;
export const PHONE_MAX_LENGTH = 20;

export const PHONE_ERROR_MESSAGE =
  "Please enter a valid phone number with 7 to 15 digits.";

export function countPhoneDigits(value: string): number {
  const digits = value.match(/\d/g);
  return digits ? digits.length : 0;
}

/**
 * Accepts a phone number only when it uses permitted characters *and* contains
 * enough actual digits.
 *
 * The character check alone is not sufficient: `(((((((` and `-------` both
 * satisfy an "allowed characters, minimum length" pattern while containing no
 * digits, which previously let unusable contact numbers through.
 */
export function isValidPhone(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > PHONE_MAX_LENGTH) return false;
  if (!PHONE_ALLOWED_CHARACTERS.test(trimmed)) return false;

  const digits = countPhoneDigits(trimmed);
  return digits >= PHONE_MIN_DIGITS && digits <= PHONE_MAX_DIGITS;
}

// ---------------------------------------------------------------------------
// Shop reviews
// ---------------------------------------------------------------------------

export const REVIEW_NAME_MIN = 2;
export const REVIEW_NAME_MAX = 80;
export const REVIEW_RATING_MIN = 1;
export const REVIEW_RATING_MAX = 5;
export const REVIEW_TEXT_MIN = 20;
export const REVIEW_TEXT_MAX = 800;

export const REVIEW_NAME_ERROR = "Please enter your name.";
export const REVIEW_RATING_ERROR = "Choose a rating from 1 to 5.";
export const REVIEW_TEXT_ERROR = `Please share at least ${REVIEW_TEXT_MIN} characters of feedback.`;
