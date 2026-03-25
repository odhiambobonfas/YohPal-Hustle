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
import { deriveInitials } from "@/utilities/profile";
import { deriveDisplayName } from "@/utilities/profile";

export interface CurrentUserState {
  user: User | null;
  profile: UserData | null;
  initials: string;
  displayName: string;
  photoURL: string | null;
  loading: boolean;
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
    initials:    deriveInitials(profile?.firstName, profile?.lastName),
    displayName: deriveDisplayName(profile?.firstName, profile?.lastName),
    photoURL,
    loading,
  };
}
