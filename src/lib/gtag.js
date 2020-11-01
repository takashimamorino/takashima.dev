export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALITICS_ID

export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}
