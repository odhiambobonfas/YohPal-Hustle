export const normalizePhoneNumber = (phone: string): string => {
  console.log("Normalizing phone number:", phone);
  // Remove all spaces, dashes, and parentheses
  let normalized = phone.replace(/[\s\-()]/g, "");
  
  console.log("Input phone:", phone, "After cleanup:", normalized);
  
  // If starts with 0, replace with +254
  if (normalized.startsWith("0")) {
    normalized = "+254" + normalized.substring(1);
  }
  // If starts with 254 (without +), add +
  else if (normalized.startsWith("254") && !normalized.startsWith("+")) {
    normalized = "+" + normalized;
  }
  // If doesn't start with + or 0 or 254, assume it's missing country code
  else if (!normalized.startsWith("+") && !normalized.startsWith("254")) {
    normalized = "+254" + normalized;
  }
  
  // Validate E.164 format: +254XXXXXXXXX (should be 13 characters total)
  console.log("Normalized phone:", normalized, "Length:", normalized.length);
  
  return normalized;
};
