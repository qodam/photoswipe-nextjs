import { NextRequest, NextResponse } from "next/server";

const PLATFORMS = {
  app_store: { label: "App Store (iOS)", emoji: "🍏", os: "iOS" },
  google_play: { label: "Google Play (Android)", emoji: "🤖", os: "Android" },
} as const;

const PLACEMENTS: Record<string, string> = {
  nav: "Barre de navigation",
  mobile_menu: "Menu mobile",
  hero: "Section Hero",
  cta_bottom: "CTA « Reclaim Gigabytes »",
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const clip = (s: unknown, max = 200) =>
  typeof s === "string" ? s.slice(0, max) : "";

function parseDevice(ua: string) {
  const os = /iPhone|iPad|iPod/.test(ua)
    ? "iOS"
    : /Android/.test(ua)
      ? "Android"
      : /Mac OS X/.test(ua)
        ? "macOS"
        : /Windows/.test(ua)
          ? "Windows"
          : /Linux/.test(ua)
            ? "Linux"
            : "Inconnu";

  const browser = /Edg\//.test(ua)
    ? "Edge"
    : /Instagram/.test(ua)
      ? "Instagram (in-app)"
      : /FBAN|FBAV/.test(ua)
        ? "Facebook (in-app)"
        : /TikTok|musical_ly/.test(ua)
          ? "TikTok (in-app)"
          : /CriOS|Chrome\//.test(ua)
            ? "Chrome"
            : /FxiOS|Firefox\//.test(ua)
              ? "Firefox"
              : /Safari\//.test(ua)
                ? "Safari"
                : "Autre";

  const type = /iPad|Tablet/.test(ua)
    ? "📟 Tablette"
    : /Mobi|iPhone|Android/.test(ua)
      ? "📱 Mobile"
      : "💻 Desktop";

  return { os, browser, type };
}

const flag = (cc: string) =>
  /^[A-Z]{2}$/.test(cc)
    ? String.fromCodePoint(...[...cc].map((c) => 127397 + c.charCodeAt(0)))
    : "🌐";

export async function POST(req: NextRequest) {
  const token = process.env.TG_TOKEN;
  const chat = process.env.TG_REVIEWS;
  if (!token || !chat) return NextResponse.json({ ok: false }, { status: 500 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const platform = PLATFORMS[body.platform as keyof typeof PLATFORMS];
  if (!platform) return NextResponse.json({ ok: false }, { status: 400 });

  const placement = PLACEMENTS[clip(body.placement, 30)] ?? "Inconnu";
  const device = parseDevice(req.headers.get("user-agent") ?? "");
  const country =
    req.headers.get("x-vercel-ip-country") ??
    req.headers.get("cf-ipcountry") ??
    "";
  const city = decodeURIComponent(req.headers.get("x-vercel-ip-city") ?? "");

  // Source du trafic
  const referrer = clip(body.referrer);
  let source = "Accès direct";
  if (referrer) {
    try {
      source = new URL(referrer).hostname.replace(/^www\./, "");
    } catch {}
  }

  // UTM
  let utm = "";
  try {
    const params = new URL(clip(body.page, 500)).searchParams;
    utm = ["utm_source", "utm_medium", "utm_campaign"]
      .map((k) => params.get(k))
      .filter(Boolean)
      .join(" / ");
  } catch {}

  // Clic sur le store qui ne correspond pas à l'appareil
  const mismatch =
    (device.os === "iOS" || device.os === "Android") &&
    device.os !== platform.os;

  const date = new Date().toLocaleString("fr-FR", {
    timeZone: "Europe/Paris",
    dateStyle: "short",
    timeStyle: "medium",
  });

  const lines = [
    `${platform.emoji} <b>Clic téléchargement · PhotoSwipe</b>`,
    "",
    `🏪 <b>Store :</b> ${platform.label}`,
    `📍 <b>Bouton :</b> ${esc(placement)}`,
    `${device.type.split(" ")[0]} <b>Appareil :</b> ${device.type.split(" ")[1]} · ${device.os} · ${esc(device.browser)}`,
    mismatch ? `⚠️ <i>Store différent de l'OS de l'appareil</i>` : null,
    `${flag(country)} <b>Pays :</b> ${esc(country || "Inconnu")}${city ? ` · ${esc(city)}` : ""}`,
    `🗣 <b>Langue :</b> ${esc(clip(body.lang, 20) || "?")}`,
    `🔗 <b>Source :</b> ${esc(source)}`,
    utm ? `🎯 <b>Campagne :</b> ${esc(utm)}` : null,
    "",
    `🕐 ${date}`,
  ].filter((l) => l !== null);

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chat,
          text: lines.join("\n"),
          parse_mode: "HTML",
          disable_notification: false,
          disable_web_page_preview: true,
        }),
        signal: AbortSignal.timeout(10000),
      },
    );
    if (!res.ok)
      console.error("Erreur Telegram:", res.status, await res.text());
  } catch (err) {
    console.error("Erreur Telegram:", err);
  }

  return NextResponse.json({ ok: true });
}
