import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

interface Installment { id: string; name: string; dueDate?: string; percentage: number; amount?: number }

function baseline(totalAmount: number, discount: number, installments: Installment[]) {
  const totalPct = installments?.reduce((s, i) => s + (i.percentage || 0), 0) || 0;
  const manyLate = installments?.slice(-1)[0]?.percentage && installments.slice(-1)[0].percentage > 40;
  if (discount > 12 || manyLate) return { riskLevel: "HIGH", recommendation: "High discount or back-loaded payment plan. Seek approval." };
  if (discount > 5 || totalPct !== 100) return { riskLevel: "MEDIUM", recommendation: "Ensure total is 100% and confirm discount approval." };
  return { riskLevel: "LOW", recommendation: "Within policy thresholds." };
}

export async function POST(req: Request) {
  try {
    const { totalAmount, discount, installments } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      return NextResponse.json(baseline(totalAmount, discount, installments));
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are a CFO. Analyze a quote for risk and return JSON with {"riskLevel":"LOW|MEDIUM|HIGH","recommendation":string}.
Total: ${totalAmount} SAR, Discount: ${discount}%, Installments: ${JSON.stringify(installments)}`;
      const result: any = await (ai as any).models.generateContent({ model: "gemini-2.5-flash", contents: prompt });
      const text = (result as any)?.text ?? (typeof (result as any)?.text === 'function' ? await (result as any).text() : "");
      if (text) {
        try {
          const parsed = JSON.parse(text);
          if (parsed?.riskLevel) return NextResponse.json(parsed);
        } catch { /* fallthrough */ }
      }
    } catch {
      // fall back to baseline
    }

    return NextResponse.json(baseline(totalAmount, discount, installments));
  } catch (e) {
    return NextResponse.json({ riskLevel: "LOW", recommendation: "AI analyze failed." }, { status: 200 });
  }
}
