import { PaymentInstallment } from "../types";

export const analyzeQuoteRisk = async (
  totalAmount: number,
  discount: number,
  installments: PaymentInstallment[]
): Promise<{ riskLevel: string; recommendation: string }> => {
  try {
    const res = await fetch("/api/ai/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount, discount, installments }),
    });
    if (!res.ok) {
      return {
        riskLevel: "LOW",
        recommendation: "AI Risk Analysis unavailable. Proceed with standard checks.",
      };
    }
    const data = await res.json();
    return {
      riskLevel: data.riskLevel ?? "LOW",
      recommendation: data.recommendation ?? "",
    };
  } catch (error) {
    return {
      riskLevel: "LOW",
      recommendation: "AI Risk Analysis is offline.",
    };
  }
};