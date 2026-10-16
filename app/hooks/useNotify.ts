"use client";

export type AppId = "photoswipe";
export type Platform = "google_play" | "app_store";
export type Placement = "nav" | "mobile_menu" | "hero" | "cta_bottom";

const HUB_URL =
  process.env.NEXT_PUBLIC_HUB_URL ?? "https://hub.qodam.com/api/click";
const REF_KEY = "qodam_ref";

// Garde ?ref=xxx pendant toute la visite
const getRef = (): string | null => {
  try {
    const fromUrl = new URL(window.location.href).searchParams.get("ref");
    if (fromUrl) {
      sessionStorage.setItem(REF_KEY, fromUrl);
      return fromUrl;
    }
    return sessionStorage.getItem(REF_KEY);
  } catch {
    return null;
  }
};

export const useNotify = (app: AppId) => {
  const notifyDownloadClick = (platform: Platform, placement: Placement) => {
    const payload = JSON.stringify({
      app,
      platform,
      placement,
      page: window.location.href,
      referrer: document.referrer || null,
      lang: navigator.language,
      ref: getRef(),
    });

    // Envoi au hub (texte brut : pas de souci entre ayaty.qodam.com et hub.qodam.com)
    if (navigator.sendBeacon?.(HUB_URL, payload)) return;

    fetch(HUB_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  };

  return { notifyDownloadClick };
};
