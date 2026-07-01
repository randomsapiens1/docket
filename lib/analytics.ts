declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
}

export function trackEvent(
  event: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, params)
  }
}
