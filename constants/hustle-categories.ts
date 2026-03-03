/**
 * constants/hustle-categories.ts
 * ─────────────────────────────────────────────────────────
 * Static data for all hustle categories, filter tags, and
 * the role-parsing helper used across the app.
 * ─────────────────────────────────────────────────────────
 */

import type { HustleCategory } from "@/types/actions/hustle.types";

// ─── Category registry ────────────────────────────────────────────────────────
export const CATEGORIES: HustleCategory[] = [
  // Agriculture
  { id: 1,  name: "Animal Farming",               subtitle: "Herdsman (cattle, goats, sheep), Poultry farmer",                             icon: "🐄", accent: "#2d6a4f", tag: "Agriculture" },
  { id: 25, name: "Crop Farming & Harvesting",     subtitle: "Crop farmer, Harvest laborer, Irrigation technician",                        icon: "🌾", accent: "#4d7c0f", tag: "Agriculture" },
  { id: 26, name: "Agro-Processing",               subtitle: "Grain miller, Oil presser, Dairy processor",                                 icon: "🏡", accent: "#65a30d", tag: "Agriculture" },
  // Automotive
  { id: 2,  name: "Automotive Support",            subtitle: "Car park attendant, Car wash operator",                                      icon: "🚗", accent: "#4a7c9e", tag: "Automotive"  },
  { id: 3,  name: "Car Body & Maintenance",        subtitle: "Panel beater (body repair), Spray painter (car painting)",                   icon: "🔧", accent: "#6b7280", tag: "Automotive"  },
  { id: 7,  name: "Drivers & Operators",           subtitle: "Matatu driver, Tuk tuk driver, Forklift operator",                          icon: "🚌", accent: "#4b5fa6", tag: "Automotive"  },
  { id: 11, name: "Mechanical & Repair Services",  subtitle: "Car mechanic, Motorcycle mechanic, Auto-electrician",                       icon: "⚙️", accent: "#6b7280", tag: "Automotive"  },
  { id: 16, name: "Public Transport Staff",        subtitle: "Matatu conductor, Driving school instructor",                                icon: "🚦", accent: "#4f46e5", tag: "Automotive"  },
  // Community
  { id: 17, name: "Religious & Cultural Services", subtitle: "Street preacher, Cultural event organizer, Choir director",                 icon: "👥", accent: "#7c3aed", tag: "Community"   },
  { id: 27, name: "Community Support Workers",     subtitle: "Social worker, Youth mentor, Community health volunteer",                   icon: "🤝", accent: "#6d28d9", tag: "Community"   },
  { id: 28, name: "Childcare & Elderly Care",      subtitle: "Babysitter, Nanny, Elder care attendant",                                  icon: "👶", accent: "#a855f7", tag: "Community"   },
  // Creative
  { id: 14, name: "Photography & Videography",     subtitle: "Street photographer (instant photos), Baby photographer, Videographer",    icon: "📷", accent: "#ca8a04", tag: "Creative"    },
  { id: 22, name: "Visual & Print Arts",           subtitle: "Street artist (drawing, portraits), Poster printer and stickers",           icon: "🎨", accent: "#c2410c", tag: "Creative"    },
  { id: 29, name: "Music & Entertainment",         subtitle: "DJ, Live musician, MC / Emcee, Event entertainer",                         icon: "🎵", accent: "#9333ea", tag: "Creative"    },
  { id: 30, name: "Content & Design",              subtitle: "Graphic designer, Social media manager, Copywriter",                       icon: "💻", accent: "#0284c7", tag: "Creative"    },
  // Environment
  { id: 13, name: "Outdoor & Grounds Maintenance", subtitle: "Gardener, Groundskeeper, Landscape designer",                             icon: "🌲", accent: "#16a34a", tag: "Environment" },
  { id: 23, name: "Waste Collection & Recycling",  subtitle: "Scrap metal collector, Waste paper collector, E-waste handler",            icon: "♻️", accent: "#15803d", tag: "Environment" },
  { id: 31, name: "Solar & Renewable Energy",      subtitle: "Solar panel installer, Solar repair technician, Biogas technician",        icon: "☀️", accent: "#eab308", tag: "Environment" },
  { id: 32, name: "Pest Control & Sanitation",     subtitle: "Pest control fundi, Fumigator, Sanitation worker",                         icon: "🦟", accent: "#16a34a", tag: "Environment" },
  // Events
  { id: 33, name: "Event Planning & Coordination", subtitle: "Event planner, Wedding coordinator, Party organizer",                     icon: "🎉", accent: "#db2777", tag: "Events"      },
  { id: 34, name: "Event Decoration & Setup",      subtitle: "Decorator, Florist, Tent & furniture setup crew",                         icon: "🎊", accent: "#ec4899", tag: "Events"      },
  { id: 35, name: "Catering & Banquet Services",   subtitle: "Event caterer, Waiter / waitress, Bartender",                             icon: "🍽️", accent: "#f97316", tag: "Events"      },
  // Finance
  { id: 6,  name: "Digital Financial Agents",      subtitle: "Mobile money agent (M-Pesa, Airtel Money), Sim card agent",                icon: "💳", accent: "#2563eb", tag: "Finance"     },
  { id: 36, name: "Savings & Credit Groups",       subtitle: "Chama treasurer, SACCO agent, Table banking coordinator",                  icon: "🏦", accent: "#1d4ed8", tag: "Finance"     },
  { id: 37, name: "Insurance & Pension Agents",    subtitle: "Insurance sales agent, Pension fund agent",                               icon: "📋", accent: "#3b82f6", tag: "Finance"     },
  // Food
  { id: 8,  name: "Grocery Kiosks",                subtitle: "Grocery kiosk owner, Kibanda owner, Green grocer",                        icon: "🏪", accent: "#dc2626", tag: "Food"        },
  { id: 21, name: "Street Food Vendors",           subtitle: "Chips mwitu vendor, Chapati seller, Mutura vendor, Mandazi seller",        icon: "🍟", accent: "#dc2626", tag: "Food"        },
  { id: 38, name: "Restaurant & Canteen Staff",    subtitle: "Cook, Waiter, Hotel cleaner, Kibanda chef",                               icon: "🍳", accent: "#ea580c", tag: "Food"        },
  { id: 39, name: "Baking & Confectionery",        subtitle: "Baker, Cake decorator, Pastry seller",                                   icon: "🍞", accent: "#d97706", tag: "Food"        },
  // Health
  { id: 9,  name: "Herbal & Wellness",             subtitle: "Herbal medicine seller, Traditional healer, Herbalist",                   icon: "🌿", accent: "#059669", tag: "Health"      },
  { id: 40, name: "Community Health Workers",      subtitle: "Community health promoter, Birth attendant, Health educator",              icon: "🩺", accent: "#0891b2", tag: "Health"      },
  { id: 41, name: "Fitness & Personal Training",   subtitle: "Personal trainer, Yoga instructor, Gym attendant",                        icon: "💪", accent: "#0284c7", tag: "Health"      },
  { id: 42, name: "Salon & Beauty Services",       subtitle: "Barber, Hair stylist, Nail technician, Masseuse",                         icon: "💇", accent: "#a21caf", tag: "Health"      },
  // Labor
  { id: 4,  name: "Casual & Manual Labor",         subtitle: "Casual laborer (vibarua), Porter, Loader / offloader",                   icon: "💼", accent: "#78716c", tag: "Labor"       },
  { id: 43, name: "Domestic Workers",              subtitle: "House help, Cook, Watchman (domestic), Gardener (domestic)",              icon: "🏠", accent: "#57534e", tag: "Labor"       },
  { id: 10, name: "Housekeeping & Cleaning",       subtitle: "Mama fua (laundry lady), Maid / house help, Office cleaner",              icon: "🧹", accent: "#0891b2", tag: "Labor"       },
  // Repair
  { id: 12, name: "Metal Works & Welding",         subtitle: "Welder (fundi wa chuma), Jua kali welder, Blacksmith",                   icon: "🔩", accent: "#d97706", tag: "Repair"      },
  { id: 15, name: "Plumbing & Electrical",         subtitle: "Plumber, Electrician, Water technician",                                 icon: "🔌", accent: "#ea580c", tag: "Repair"      },
  { id: 24, name: "Wood & Furniture",              subtitle: "Carpenter (fundi wa mbao), Sofa repair fundi, Cabinet maker",             icon: "🪑", accent: "#d97706", tag: "Repair"      },
  { id: 44, name: "Electronics & Appliance Repair",subtitle: "Phone repair technician, TV/Radio repair fundi, Fridge technician",       icon: "📱", accent: "#0891b2", tag: "Repair"      },
  { id: 45, name: "Shoe & Leather Repair",         subtitle: "Cobbler, Shoe repair fundi, Leather goods repair",                       icon: "👟", accent: "#92400e", tag: "Repair"      },
  // Retail
  { id: 19, name: "Second-Hand & Thrift Sellers",  subtitle: "Mitumba clothes seller, Second-hand book seller, Vintage goods",         icon: "🛍️", accent: "#e11d48", tag: "Retail"      },
  { id: 46, name: "Market & Street Vending",       subtitle: "Market vendor, Hawker, Street stall operator",                           icon: "🏬", accent: "#be185d", tag: "Retail"      },
  { id: 47, name: "Mobile & Online Selling",       subtitle: "Online reseller, Social media seller, Delivery agent",                   icon: "📦", accent: "#7c3aed", tag: "Retail"      },
  // Security
  { id: 20, name: "Security Services",             subtitle: "Watchman (security guard), Bouncer (club security), Gate guard",         icon: "🛡️", accent: "#78716c", tag: "Security"    },
  { id: 48, name: "Alarm & CCTV Installation",     subtitle: "Security system installer, CCTV technician, Electric fence installer",   icon: "📹", accent: "#374151", tag: "Security"    },
  { id: 49, name: "Escort & Patrol Services",      subtitle: "Security escort, Night patrol guard, Event security",                    icon: "🔦", accent: "#4b5563", tag: "Security"    },
  // Trades
  { id: 5,  name: "Construction & Building",       subtitle: "Mason / mjengo worker, Painter, Tiler, Concrete mixer",                  icon: "🏗️", accent: "#d97706", tag: "Trades"      },
  // Transport
  { id: 18, name: "Riders & Delivery",             subtitle: "Boda boda rider, Delivery rider, Courier",                              icon: "🛵", accent: "#4b5fa6", tag: "Transport"   },
  { id: 50, name: "Goods Transport & Moving",      subtitle: "Pickup truck operator, Moving company crew, Lorry driver",               icon: "🚚", accent: "#0369a1", tag: "Transport"   },
  { id: 51, name: "Airport & Executive Transfers", subtitle: "Airport transfer driver, Executive chauffeur, VIP transport",            icon: "✈️", accent: "#1e40af", tag: "Transport"   },
];

// ─── Filter tags ──────────────────────────────────────────────────────────────
export const CATEGORY_FILTERS = [
  "All", "Agriculture", "Automotive", "Community", "Creative",
  "Environment", "Events", "Finance", "Food", "Health",
  "Labor", "Repair", "Retail", "Security", "Trades", "Transport",
] as const;
export type CategoryFilter = (typeof CATEGORY_FILTERS)[number];

// ─── Role parser ──────────────────────────────────────────────────────────────
/**
 * Splits a comma-separated subtitle string into individual role names,
 * correctly handling commas that appear inside parentheses.
 *
 * e.g. "Herdsman (cattle, goats, sheep), Poultry farmer"
 *   → ["Herdsman (cattle, goats, sheep)", "Poultry farmer"]
 */
export function parseRoles(subtitle: string): string[] {
  const roles: string[] = [];
  let current = "";
  let depth = 0;
  for (const char of subtitle) {
    if (char === "(") depth++;
    else if (char === ")") depth--;
    if (char === "," && depth === 0) {
      const trimmed = current.trim();
      if (trimmed) roles.push(trimmed);
      current = "";
    } else {
      current += char;
    }
  }
  const trimmed = current.trim();
  if (trimmed) roles.push(trimmed);
  return roles;
}
