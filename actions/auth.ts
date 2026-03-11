"use server";

import { createUserDocument, type UserData } from "@/services/server/firestore";

export async function createUserProfile(userId: string, userData: Omit<UserData, "createdAt">) {
  try {
    const result = await createUserDocument(userId, {
      ...userData,
      createdAt: new Date(),
    });
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to create user profile",
    };
  }
}
