const MOBILE_USER_AGENT = /Android|iPhone|iPad|iPod|IEMobile|Opera Mini|Mobile/i;

export function isMobileDevice(
  userAgent: string | null,
  mobileClientHint: string | null,
): boolean {
  if (mobileClientHint === "?1") return true;
  if (mobileClientHint === "?0") return false;
  return MOBILE_USER_AGENT.test(userAgent ?? "");
}
