export type CheckStatus = "verified" | "in_review" | "not_started";

export type Reference = {
  who: string;
  detail: string;
  status: CheckStatus;
  checkedOn?: string;
};

export type Worker = {
  id: string;
  name: string;
  initials: string;
  tone: string;
  work: WorkType;
  specialty: string;
  years: number;
  languages: string[];
  locality: string;
  rate: string;
  limits: string[];
  introSeconds: number;
  idCheck: { status: CheckStatus; checkedOn?: string };
  references: Reference[];
  createdOn: string;
  updatedOn: string;
  sharedPhone?: boolean;
};

export const WORK_TYPES = ["Cleaning", "Cooking", "House help", "Electrical", "Painting"] as const;
export type WorkType = (typeof WORK_TYPES)[number];

export const LOCALITIES = [
  "Kondapur",
  "Madhapur",
  "Kukatpally",
  "Tolichowki",
  "Miyapur",
  "Mehdipatnam",
] as const;

export const workers: Worker[] = [
  {
    id: "lakshmi",
    name: "Lakshmi",
    initials: "L",
    tone: "#b5651d",
    work: "Cleaning",
    specialty: "Home cleaning, utensils and laundry",
    years: 12,
    languages: ["Telugu"],
    locality: "Kondapur",
    rate: "₹4,500 a month for daily mornings",
    limits: ["Mornings only", "No pets"],
    introSeconds: 18,
    idCheck: { status: "verified", checkedOn: "4 Nov 2026" },
    references: [
      { who: "Family in Kondapur", detail: "Worked 4 years, mornings", status: "verified", checkedOn: "6 Nov 2026" },
      { who: "Family in Madhapur", detail: "Worked 2 years", status: "in_review" },
    ],
    createdOn: "2 Nov 2026",
    updatedOn: "9 Nov 2026",
    sharedPhone: true,
  },
  {
    id: "ramesh",
    name: "Ramesh",
    initials: "R",
    tone: "#2f6f5e",
    work: "House help",
    specialty: "Cleaning, shopping, help with elderly parents",
    years: 8,
    languages: ["Telugu", "Hindi"],
    locality: "Kukatpally",
    rate: "₹120 an hour",
    limits: ["No late evenings"],
    introSeconds: 22,
    idCheck: { status: "verified", checkedOn: "1 Nov 2026" },
    references: [
      { who: "Family in Kukatpally", detail: "Worked 5 years", status: "verified", checkedOn: "3 Nov 2026" },
      { who: "Family in Miyapur", detail: "Worked 1 year", status: "verified", checkedOn: "3 Nov 2026" },
    ],
    createdOn: "28 Oct 2026",
    updatedOn: "12 Nov 2026",
  },
  {
    id: "mohammed",
    name: "Mohammed",
    initials: "M",
    tone: "#1f3a5f",
    work: "Electrical",
    specialty: "Wiring, fans, inverters, fault finding",
    years: 15,
    languages: ["Urdu", "Hindi", "Telugu"],
    locality: "Tolichowki",
    rate: "₹300 a visit, parts extra",
    limits: ["Quote agreed before work starts"],
    introSeconds: 25,
    idCheck: { status: "verified", checkedOn: "30 Oct 2026" },
    references: [
      { who: "Shop in Mehdipatnam", detail: "Regular work for 6 years", status: "verified", checkedOn: "31 Oct 2026" },
    ],
    createdOn: "25 Oct 2026",
    updatedOn: "10 Nov 2026",
  },
  {
    id: "sunitha",
    name: "Sunitha",
    initials: "S",
    tone: "#8a3b5c",
    work: "Cooking",
    specialty: "Andhra and North Indian home cooking",
    years: 6,
    languages: ["Telugu", "Hindi"],
    locality: "Madhapur",
    rate: "₹5,000 a month for one meal a day",
    limits: ["Vegetarian kitchens only"],
    introSeconds: 15,
    idCheck: { status: "in_review" },
    references: [{ who: "Family in Kondapur", detail: "Worked 3 years", status: "not_started" }],
    createdOn: "11 Nov 2026",
    updatedOn: "11 Nov 2026",
  },
  {
    id: "venkat",
    name: "Venkat",
    initials: "V",
    tone: "#6b5b2a",
    work: "Painting",
    specialty: "Wall painting, waterproofing",
    years: 10,
    languages: ["Telugu"],
    locality: "Miyapur",
    rate: "Quote per job",
    limits: ["Weekdays only"],
    introSeconds: 20,
    idCheck: { status: "not_started" },
    references: [],
    createdOn: "8 Nov 2026",
    updatedOn: "8 Nov 2026",
  },
];

export function getWorker(id: string) {
  return workers.find((w) => w.id === id);
}

export type IncomingRequest = {
  id: string;
  work: string;
  when: string;
  locality: string;
  employerVerified: boolean;
  note: string;
  employerPhone: string;
};

export const lakshmiRequests: IncomingRequest[] = [
  {
    id: "r1",
    work: "Home cleaning",
    when: "Mornings, Monday to Saturday",
    locality: "Kondapur",
    employerVerified: true,
    note: "2 bedroom flat, family of three",
    employerPhone: "+91 90000 00011",
  },
  {
    id: "r2",
    work: "Utensils and laundry",
    when: "Mornings, starting next week",
    locality: "Gachibowli",
    employerVerified: false,
    note: "Small flat, one person",
    employerPhone: "+91 90000 00012",
  },
];
