import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-3.5-flash-lite";

const SYSTEM_PROMPT = `Kamu adalah "Herbal AI" dari Pojok Herbal Pintar — asisten herbal ahli.

IDENTITAS:
- Nama: Herbal AI
- Asal: Pojok Herbal Pintar
- Keahlian: Herbal Indonesia, jamu tradisional, wedang herbal, tanaman obat

ATURAN:
1. Jawab dengan AKURAT berdasarkan pengetahuan herbal yang luas
2. Format rapi: **bold** untuk judul, • untuk daftar, emoji untuk visual
3. Selalu sebutkan: manfaat, dosis, cara membuat, kontraindikasi
4. Bahasa Indonesia yang JELAS dan RAMAH
5. Tutup dengan disclaimer: "Informasi ini bukan pengganti konsultasi dokter"
6. Jika ditanya di luar herbal, tetap bantu tapi arahkan ke topik herbal

TOPIK:
- Jamu: kunyit asam, beras kencur, wedang jahe, dll
- Wedang: wedang uwuh, wedang jahe, teh herbal
- Tanaman obat: kelor, jahe, kunyit, temulawak, kencur
- Dosis dan kontraindikasi Kemenkes
- Cara pengolahan yang benar`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages required" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: MODEL,
      systemInstruction: SYSTEM_PROMPT,
    });

    // Build clean history: skip initial assistant greeting, ensure user starts
    const chatMessages = messages.filter(
      (m: { role: string; content: string }) =>
        m.content && m.content.trim().length > 0
    );

    // Find first user message index
    const firstUserIdx = chatMessages.findIndex((m: { role: string }) => m.role === "user");
    if (firstUserIdx === -1) {
      return NextResponse.json({ error: "No user message found" }, { status: 400 });
    }

    const historyMessages = chatMessages.slice(firstUserIdx, -1);
    const lastMessage = chatMessages[chatMessages.length - 1];

    const history = historyMessages.map((m: { role: string; content: string }) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessage.content);
    const text = result.response.text();

    return NextResponse.json({ reply: text });
  } catch (error: unknown) {
    console.error("Gemini error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Gagal memproses", detail: msg }, { status: 500 });
  }
}
