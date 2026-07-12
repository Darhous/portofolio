// Privacy-friendly pageview hook, inert by default.
//
// This does nothing until VITE_ANALYTICS_ENDPOINT is set at build time
// (e.g. a self-hosted Umami/Plausible collect URL). No script is loaded and
// no request is made without that value, so the site ships with zero
// third-party tracking out of the box.
const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT as string | undefined;
const websiteId = import.meta.env.VITE_ANALYTICS_SITE_ID as string | undefined;

export function trackPageview(path: string) {
  if (!endpoint || typeof navigator === "undefined") return;
  const payload = JSON.stringify({ path, siteId: websiteId, referrer: document.referrer });
  const sent = navigator.sendBeacon?.(endpoint, payload);
  if (!sent) {
    fetch(endpoint, { method: "POST", body: payload, keepalive: true, headers: { "Content-Type": "application/json" } }).catch(() => {
      // Best-effort only: a failed pageview ping should never affect the visitor.
    });
  }
}
