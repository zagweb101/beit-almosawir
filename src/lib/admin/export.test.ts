import { describe, it, expect } from "vitest";
import { toCsv, stampedName } from "./export";

describe("toCsv", () => {
  const columns = [
    { key: "name" as const, header: "الاسم" },
    { key: "price" as const, header: "السعر" },
  ];

  it("يبني رأسًا وصفوفًا مفصولة بفواصل", () => {
    const csv = toCsv([{ name: "دورة", price: "1500" }], columns);
    const lines = csv.replace(/^﻿/, "").split("\r\n");
    expect(lines[0]).toBe("الاسم,السعر");
    expect(lines[1]).toBe("دورة,1500");
  });

  it("يضيف BOM في البداية ليفتح Excel العربية بشكل صحيح", () => {
    const csv = toCsv([{ name: "x", price: "1" }], columns);
    expect(csv.charCodeAt(0)).toBe(0xfeff);
  });

  it("يقتبس القيم التي تحتوي فواصل أو أسطرًا أو علامات اقتباس", () => {
    const csv = toCsv([{ name: 'a,b', price: 'say "hi"' }], columns);
    expect(csv).toContain('"a,b"');
    expect(csv).toContain('"say ""hi"""');
  });

  it("يعالج القيم الفارغة والغائبة", () => {
    const csv = toCsv([{ name: "", price: null as unknown as string }], columns);
    const line = csv.replace(/^﻿/, "").split("\r\n")[1];
    expect(line).toBe(",");
  });
});

describe("stampedName", () => {
  it("يضيف تاريخ اليوم بصيغة YYYY-MM-DD وامتدادًا", () => {
    const name = stampedName("courses", "csv");
    expect(name).toMatch(/^courses-\d{4}-\d{2}-\d{2}\.csv$/);
  });
});
