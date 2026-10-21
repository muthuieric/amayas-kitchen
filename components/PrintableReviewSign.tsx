"use client";

import { useCallback, useState } from "react";
import { Download } from "lucide-react";

const REVIEW_URL = "https://g.page/r/Cf7P4ULlN484EBM/review";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (!src.startsWith("data:")) {
      img.crossOrigin = "anonymous";
    }
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number
) {
  const spikes = 5;
  const outerRadius = radius;
  const innerRadius = radius * 0.4;
  let rot = (Math.PI / 2) * 3;
  const x = cx;
  const y = cy;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(x, y - outerRadius);
  for (let i = 0; i < spikes; i++) {
    const ox = x + Math.cos(rot) * outerRadius;
    const oy = y + Math.sin(rot) * outerRadius;
    ctx.lineTo(ox, oy);
    rot += step;
    const ix = x + Math.cos(rot) * innerRadius;
    const iy = y + Math.sin(rot) * innerRadius;
    ctx.lineTo(ix, iy);
    rot += step;
  }
  ctx.lineTo(x, y - outerRadius);
  ctx.closePath();
  ctx.fill();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(" ");
  let line = "";
  const lines: string[] = [];
  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  }
  lines.push(line);
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, y + i * lineHeight);
  }
  return lines.length;
}

export function PrintableReviewSign() {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = useCallback(async () => {
    setDownloading(true);
    setError(null);
    try {
      const scale = 3;
      const width = 900 * scale;
      const height = 1200 * scale;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");

      ctx.scale(scale, scale);

      const CREAM = "#F5EBD9";
      const TERRA = "#C2410C";
      const BURGUNDY = "#B91C1C";
      const GOLD = "#F59E0B";
      const INK = "#1F2937";
      const GOOGLE_BLUE = "#4285F4";
      const GOOGLE_RED = "#EA4335";
      const GOOGLE_YELLOW = "#FBBC05";
      const GOOGLE_GREEN = "#34A853";

      ctx.fillStyle = CREAM;
      ctx.fillRect(0, 0, 900, 1200);

      const drawCorner = (x: number, y: number, flipX: boolean, flipY: boolean) => {
        ctx.save();
        if (flipX) ctx.translate(x * 2, 0);
        if (flipY) ctx.translate(0, y * 2);
        ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
        ctx.translate(flipX ? -x : 0, flipY ? -y : 0);
        ctx.strokeStyle = TERRA;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x + 40, y + 10);
        ctx.lineTo(x + 10, y + 40);
        ctx.moveTo(x + 30, y + 10);
        ctx.lineTo(x + 30, y + 30);
        ctx.moveTo(x + 10, y + 30);
        ctx.lineTo(x + 30, y + 30);
        ctx.fillStyle = TERRA;
        ctx.beginPath();
        ctx.arc(x + 20, y + 20, 2.5, 0, Math.PI * 2);
        ctx.arc(x + 30, y + 30, 2.5, 0, Math.PI * 2);
        ctx.arc(x + 10, y + 30, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };

      drawCorner(840, 30, true, false);
      drawCorner(60, 1140, false, true);
      drawCorner(840, 1140, true, true);

      const logoImg = await loadImage("/logo.png");
      const logoW = 150;
      const logoH = (logoW * logoImg.height) / logoImg.width;
      ctx.drawImage(logoImg, (900 - logoW) / 2, 70, logoW, logoH);

      ctx.fillStyle = BURGUNDY;
      ctx.font = "bold 36px 'Archivo', 'DM Sans', serif";
      ctx.textAlign = "center";
      ctx.fillText("AMAYAS", 450, 250);
      ctx.font = "bold 20px 'DM Sans', serif";
      ctx.fillStyle = TERRA;
      ctx.fillText("SWAHILI KITCHEN", 450, 278);
      ctx.font = "italic 18px Georgia, serif";
      ctx.fillStyle = INK;
      ctx.fillText("A taste you'll remember", 450, 304);

      ctx.fillStyle = BURGUNDY;
      ctx.font = "italic 52px Georgia, serif";
      ctx.textAlign = "center";
      ctx.fillText("Enjoyed Your Meal?", 450, 380);

      ctx.fillStyle = GOLD;
      ctx.beginPath();
      ctx.moveTo(60, 365); ctx.lineTo(110, 365);
      ctx.moveTo(790, 365); ctx.lineTo(840, 365);
      ctx.moveTo(110, 395); ctx.lineTo(60, 395);
      ctx.moveTo(840, 395); ctx.lineTo(790, 395);
      ctx.lineWidth = 5;
      ctx.stroke();

      ctx.fillStyle = INK;
      ctx.font = "20px 'DM Sans', serif";
      ctx.textAlign = "center";
      ctx.fillText("Your feedback means the world to us.", 450, 440);
      ctx.font = "18px 'DM Sans', serif";
      ctx.fillText("Scan the QR code below and leave us a review on Google.", 450, 470);

      const googleLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="${GOOGLE_BLUE}" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.52-2.63c-.5.33-1.08.55-1.72.55-2.07 0-3.6-1.54-3.87-3.41h2.28c.37 0 .68-.23.8-.58.14-.42.17-.86.1-1.28H12v1.71h3.16c-.11.97-.68 1.78-1.56 2.24-1.22.66-2.57 1.04-3.97 1.04-2.76 0-5.08-1.99-5.63-4.66H4.26c.72 3.25 3.58 5.63 7.05 5.63q.535 0 1.06-.06z"/><path fill="${GOOGLE_RED}" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.25 1.13-.8 2.11-1.56 2.75 1.94 1.16 4.42 1.16 6.28 0 1.13-.54 2.13-1.38 2.87-2.42.82-1.17 1.31-2.55 1.31-4.09z"/><path fill="${GOOGLE_YELLOW}" d="M12 23c-2.76 0-5.08-1.99-5.63-4.66H2.25l1.42-3.86c3.48 1.84 7.01 1.84 10.39 0l1.42 3.86c-.38 1.04-1.17 1.9-2.13 2.49-1.26.81-2.69 1.28-4.21 1.28z"/><path fill="${GOOGLE_GREEN}" d="M7.5 12.25c0-1.54 1.05-2.82 2.44-3.26V2.34c-2.14.55-3.68 2.44-3.95 4.66h-.15c-.09.5-.14 1.01-.14 1.53s.05 1.03.14 1.53h.15c.27 2.22 1.81 4.11 3.95 4.66v-1.61c-1.39-.44-2.44-1.72-2.44-3.26zm5.92-1.36v1.36h2.28c-.27-1.87-1.8-3.41-3.87-3.41-.64 0-1.22.22-1.72.55l-3.52 2.63c1.82 1.68 4.31 2.66 7.28 2.66 2.76 0 5.08-1.99 5.63-4.66h2.28c-1.44 2.84-4.33 4.83-7.42 4.83-3.47 0-6.39-2.29-7.04-5.49z"/></svg>`;
      const googleImg = await loadImage(
        "data:image/svg+xml," + encodeURIComponent(googleLogoSvg)
      );
      const googleW = 220;
      ctx.drawImage(googleImg, (900 - googleW) / 2, 500, googleW, googleW);

      const starSize = 24;
      const starGap = 8;
      const totalStarW = 5 * starSize + 4 * starGap;
      let starX = (900 - totalStarW) / 2;
      ctx.fillStyle = GOLD;
      const starY = 760;
      for (let i = 0; i < 5; i++) {
        drawStar(ctx, starX + starSize / 2, starY + starSize / 2, starSize / 2);
        starX += starSize + starGap;
      }

      const qrSize = 260;
      const qrImg = await loadImage(
        `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
          REVIEW_URL
        )}`
      );
      const qrX = (900 - qrSize) / 2;
      const qrY = 810;

      ctx.lineWidth = 14;
      ctx.strokeStyle = TERRA;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.roundRect(qrX - 18, qrY - 18, qrSize + 36, qrSize + 36, 24);
      ctx.stroke();

      ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

      ctx.fillStyle = TERRA;
      ctx.font = "italic 18px Georgia, serif";
      ctx.textAlign = "center";
      ctx.beginPath();
      ctx.moveTo(700, 880);
      ctx.lineTo(620, 920);
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(700, 880);
      ctx.lineTo(670, 850);
      ctx.lineTo(670, 910);
      ctx.closePath();
      ctx.fill();

      ctx.save();
      ctx.translate(760, 860);
      ctx.rotate((-25 * Math.PI) / 180);
      ctx.fillText("Scan here", 0, 0);
      ctx.restore();
      ctx.save();
      ctx.translate(770, 900);
      ctx.rotate((-25 * Math.PI) / 180);
      ctx.fillText("to review", 0, 0);
      ctx.restore();
      ctx.save();
      ctx.translate(770, 940);
      ctx.rotate((-25 * Math.PI) / 180);
      ctx.fillText("us on Google", 0, 0);
      ctx.restore();

      const iconY = 1050;
      ctx.strokeStyle = TERRA;
      ctx.lineWidth = 5;
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(255, iconY - 20);
      ctx.lineTo(255, iconY + 20);
      ctx.lineTo(295, iconY + 20);
      ctx.lineTo(295, iconY - 20);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(265, iconY - 20);
      ctx.lineTo(265, iconY - 40);
      ctx.stroke();

      ctx.beginPath();
      drawStar(ctx, 450, iconY, 20);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(645, iconY - 25);
      ctx.lineTo(685, iconY - 25);
      ctx.lineTo(685, iconY + 25);
      ctx.lineTo(645, iconY + 25);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(665, iconY - 15);
      ctx.lineTo(675, iconY - 5);
      ctx.lineTo(665, iconY + 5);
      ctx.stroke();

      ctx.fillStyle = INK;
      ctx.font = "15px 'DM Sans', serif";
      ctx.textAlign = "center";
      ctx.fillText("Scan", 275, iconY + 50);
      ctx.fillText("Rate", 450, iconY + 50);
      ctx.fillText("Share", 665, iconY + 50);
      ctx.fillText("Your Experience", 665, iconY + 70);

      ctx.fillStyle = TERRA;
      ctx.beginPath();
      ctx.arc(360, iconY - 5, 3, 0, Math.PI * 2);
      ctx.arc(540, iconY - 5, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = INK;
      ctx.font = "italic 22px Georgia, serif";
      ctx.textAlign = "center";
      ctx.fillText("Thank you for choosing", 450, 1130);
      ctx.fillText("Amayas Swahili Kitchen!", 450, 1160);

      ctx.fillStyle = BURGUNDY;
      ctx.beginPath();
      ctx.moveTo(450, 1185);
      ctx.bezierCurveTo(440, 1185, 435, 1190, 435, 1195);
      ctx.bezierCurveTo(435, 1205, 445, 1210, 450, 1208);
      ctx.bezierCurveTo(455, 1210, 465, 1205, 465, 1195);
      ctx.bezierCurveTo(465, 1190, 460, 1185, 450, 1185);
      ctx.fill();

      ctx.fillStyle = GOLD;
      ctx.beginPath();
      ctx.moveTo(390, 1195); ctx.lineTo(430, 1195);
      ctx.moveTo(470, 1195); ctx.lineTo(510, 1195);
      ctx.lineWidth = 4;
      ctx.stroke();

      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "amayas-swahili-kitchen-review-sign.png";
      link.href = url;
      link.click();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not generate downloadable sign"
      );
    } finally {
      setDownloading(false);
    }
  }, []);

  return (
    <section className="mx-auto max-w-md px-6 sm:px-8 py-10 sm:py-16">
      <div className="text-center mb-10">
        <h2 className="font-display text-2xl font-black text-slate-900 mb-3">
          Printable Table Sign
        </h2>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Download a QR-coded review sign to print and place on tables.
          Visitors scan with their phone camera and leave a Google review
          instantly — no website navigation needed.
        </p>
      </div>

      <div className="mt-10 sm:mt-12 text-center">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="inline-flex items-center gap-2.5 rounded-xl border border-primary bg-primary px-8 py-4 text-sm font-bold text-primary-foreground shadow-card transition-all hover:bg-primary-hover active:scale-95 disabled:opacity-60 touch-manipulation"
        >
          <Download size={20} />
          {downloading ? "Generating…" : "Download Table Sign (PNG)"}
        </button>
      </div>

      {error && (
        <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm max-w-sm mx-auto">
          {error}
        </div>
      )}
    </section>
  );
}
