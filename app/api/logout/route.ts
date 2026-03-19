import { tokenStorage } from "@/services/cookie.service";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await tokenStorage.remove();
    return NextResponse.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to logout" },
      { status: 500 }
    );
  }
}
