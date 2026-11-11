/**
 * Normalizes an external URL to ensure it starts with a valid protocol (https:// or http://).
 * 
 * Prevents relative navigation bugs where un-prefixed URLs like "hackerrank.com/contest"
 * or "unstop.com/hackathons/xyz" are mistakenly interpreted by web browsers as relative paths
 * on the current domain (e.g. "clubwebsite.com/unstop.com/...").
 */
export function formatExternalUrl(url?: string | null): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (!trimmed) return '';

  // If it's an internal route on this website (e.g., /register/idea2odishi, /register/codearena)
  if (trimmed.startsWith('/')) {
    return trimmed;
  }

  // If it's already an absolute URL with protocol or special scheme, return as is
  if (/^(https?:\/\/|\/\/|mailto:|tel:)/i.test(trimmed)) {
    return trimmed;
  }

  // Strip any accidental leading slashes and prepend https://
  const cleanPath = trimmed.replace(/^\/+/, '');
  return `https://${cleanPath}`;
}

/**
 * Checks whether a given string is a non-empty external link.
 */
export function isValidExternalUrl(url?: string | null): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  return trimmed.length > 0;
}

