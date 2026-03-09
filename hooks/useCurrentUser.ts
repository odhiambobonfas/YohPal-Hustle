"use client";

/**
 * hooks/useCurrentUser.ts
 * ─────────────────────────────────────────────────────────
 * Listens to Firebase Auth state changes and, once a user is
 * authenticated, fetches their profile document from Firestore.
 *
 * Returns:
 *   user        – Firebase Auth User | null
 *   profile     – Firestore UserData | null
 *   initials    – derived "FN" string (falls back to "YH")
 *   displayName – "FirstName LastName" (falls back to email prefix)
 *   loading     – true while auth state is resolving
 * ─────────────────────────────────────────────────────────
 */

import { useState, useEffect } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/services/server/firebase";
import { getUserDocument, type UserData } from "@/services/server/firestore";

export interface CurrentUserState {
  user: User | null;
  profile: UserData | null;
  initials: string;
  displayName: string;
  photoURL: string | null;
  loading: boolean;
}

function deriveInitials(profile: UserData | null, user: User | null): string {
  if (profile?.firstName && profile?.lastName) {
    return `${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase();
  }
  if (profile?.firstName) {
    return profile.firstName.slice(0, 2).toUpperCase();
  }
  if (user?.displayName) {
    const parts = user.displayName.trim().split(" ");
    return parts.length >= 2
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  }
  if (user?.email) {
    return user.email.slice(0, 2).toUpperCase();
  }
  return "YH";
}

function deriveDisplayName(profile: UserData | null, user: User | null): string {
  if (profile?.firstName || profile?.lastName) {
    return `${profile?.firstName ?? ""} ${profile?.lastName ?? ""}`.trim();
  }
  if (user?.displayName) return user.displayName;
  if (user?.email)       return user.email.split("@")[0];
  return "Hustler";
}

export function useCurrentUser(): CurrentUserState {
  const [user, setUser]       = useState<User | null>(null);
  const [profile, setProfile] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [photoURL, setPhotoURL] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const result = await getUserDocument(firebaseUser.uid);
          const data = result.success && result.data ? result.data : null;
          setProfile(data);
          setPhotoURL(data?.photoURL ?? firebaseUser.photoURL ?? null);
        } catch {
          setProfile(null);
          setPhotoURL(firebaseUser.photoURL ?? null);
        }
      } else {
        setProfile(null);
        setPhotoURL(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    profile,
    initials:    deriveInitials(profile, user),
    displayName: deriveDisplayName(profile, user),
    photoURL,
    loading,
  };
}
