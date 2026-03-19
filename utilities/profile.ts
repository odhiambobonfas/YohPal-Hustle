
export function deriveInitials(firstName: string | undefined, lastName: string | undefined): string {
  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }
  if (firstName) {
    return firstName.slice(0, 2).toUpperCase();
  }
  return "YH";
}

export function deriveDisplayName(firstName: string | undefined, lastName: string | undefined): string {
  if (firstName || lastName) {
    return `${firstName ?? ""} ${lastName ?? ""}`.trim();
  }
  return "Hustler";
}