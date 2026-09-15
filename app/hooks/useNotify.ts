"use client";

export type Platform = "google_play" | "app_store";
export type Placement = "nav" | "mobile_menu" | "hero" | "cta_bottom";

export const useNotify = () => {
  const notifyDownloadClick = (platform: Platform, placement: Placement) => {
    const payload = JSON.stringify({
      platform,
      placement,
      page: window.location.href,
      referrer: document.referrer || null,
      lang: navigator.language,
    });

    const blob = new Blob([payload], { type: "application/json" });
    if (navigator.sendBeacon?.("/api/notify", blob)) return;

    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  };

  return { notifyDownloadClick };
};
