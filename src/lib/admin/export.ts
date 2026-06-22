/** أدوات تصدير بيانات لوحة الإدارة (تعمل في المتصفح). */

/** يحوّل قيمة خلية إلى نص آمن لملف CSV (مع اقتباس وهروب). */
function csvCell(value: unknown): string {
  const text = value == null ? "" : String(value);
  if (/[",\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

/**
 * يبني نص CSV من صفوف وأعمدة محددة.
 * يضيف BOM ليفتح بشكل صحيح في Excel مع العربية.
 */
export function toCsv<T extends Record<string, unknown>>(
  rows: T[],
  columns: { key: keyof T; header: string }[],
): string {
  const head = columns.map((c) => csvCell(c.header)).join(",");
  const body = rows
    .map((row) => columns.map((c) => csvCell(row[c.key])).join(","))
    .join("\r\n");
  return `﻿${head}\r\n${body}`;
}

/** ينزّل محتوى نصيًا كملف في المتصفح. */
export function downloadFile(filename: string, content: string, mime: string): void {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/** يضيف ختم تاريخ إلى اسم الملف: courses-2026-06-22.json */
export function stampedName(base: string, ext: string): string {
  const date = new Date().toISOString().slice(0, 10);
  return `${base}-${date}.${ext}`;
}
