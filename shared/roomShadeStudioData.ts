export interface RoomVariant {
  id: string;
  file: string;
  url: string;
  index: number;
  label: string;
  tone: string;
  hex: string;
  family: string;
  shadeCode: string;
}

export interface RoomScene {
  id: string;
  name: string;
  roomType: string;
  description: string;
  tags: string[];
  variants: RoomVariant[];
}

export const ROOM_SHADE_STUDIO_SCENES: RoomScene[] = [
  {
    "id": "room-1",
    "name": "Modern Living Lounge with Sectional Sofa",
    "roomType": "Living Room Studio",
    "description": "An airy contemporary lounge with low-profile sectional seating, round coffee tables, and panoramic light shifting across accent walls.",
    "tags": [
      "Lounge",
      "Sectional Sofa",
      "Natural Daylight",
      "Accent Wall"
    ],
    "variants": [
      {
        "id": "var-22",
        "file": "img22.jpg",
        "url": "/storage/same-room-shades/img22.jpg",
        "index": 1,
        "label": "Warm Cashmere",
        "tone": "Warm Cashmere",
        "hex": "#BEAD9D",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1240"
      },
      {
        "id": "var-27",
        "file": "img27.jpg",
        "url": "/storage/same-room-shades/img27.jpg",
        "index": 2,
        "label": "Pure Alabaster",
        "tone": "Pure Alabaster",
        "hex": "#E9E6E1",
        "family": "Luminous Whites",
        "shadeCode": "BO-1242"
      },
      {
        "id": "var-30",
        "file": "img30.jpg",
        "url": "/storage/same-room-shades/img30.jpg",
        "index": 3,
        "label": "Ivory Shimmer",
        "tone": "Ivory Shimmer",
        "hex": "#E6E1DB",
        "family": "Luminous Whites",
        "shadeCode": "BO-1244"
      },
      {
        "id": "var-33",
        "file": "img33.jpg",
        "url": "/storage/same-room-shades/img33.jpg",
        "index": 4,
        "label": "Roasted Almond",
        "tone": "Roasted Almond",
        "hex": "#F8E0C4",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1246"
      },
      {
        "id": "var-36",
        "file": "img36.jpg",
        "url": "/storage/same-room-shades/img36.jpg",
        "index": 5,
        "label": "Jaipur Terracotta",
        "tone": "Jaipur Terracotta",
        "hex": "#DDBFA3",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1248"
      },
      {
        "id": "var-46",
        "file": "img46.jpg",
        "url": "/storage/same-room-shades/img46.jpg",
        "index": 6,
        "label": "Gilded Amber",
        "tone": "Gilded Amber",
        "hex": "#E8E3DD",
        "family": "Luminous Whites",
        "shadeCode": "BO-1250"
      },
      {
        "id": "var-49",
        "file": "img49.jpg",
        "url": "/storage/same-room-shades/img49.jpg",
        "index": 7,
        "label": "Forest Moss",
        "tone": "Forest Moss",
        "hex": "#D9D193",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1252"
      },
      {
        "id": "var-52",
        "file": "img52.jpg",
        "url": "/storage/same-room-shades/img52.jpg",
        "index": 8,
        "label": "Himalayan Frost",
        "tone": "Himalayan Frost",
        "hex": "#ECEFF4",
        "family": "Ocean & Sky Hues",
        "shadeCode": "BO-1254"
      },
      {
        "id": "var-55",
        "file": "img55.jpg",
        "url": "/storage/same-room-shades/img55.jpg",
        "index": 9,
        "label": "Nilgiri Sage",
        "tone": "Nilgiri Sage",
        "hex": "#F0D07D",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1256"
      },
      {
        "id": "var-58",
        "file": "img58.jpg",
        "url": "/storage/same-room-shades/img58.jpg",
        "index": 10,
        "label": "Cardamom Green",
        "tone": "Cardamom Green",
        "hex": "#E0D6CC",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1258"
      },
      {
        "id": "var-61",
        "file": "img61.jpg",
        "url": "/storage/same-room-shades/img61.jpg",
        "index": 11,
        "label": "Turquoise Breeze",
        "tone": "Turquoise Breeze",
        "hex": "#E0DCD3",
        "family": "Luminous Whites",
        "shadeCode": "BO-1260"
      },
      {
        "id": "var-64",
        "file": "img64.jpg",
        "url": "/storage/same-room-shades/img64.jpg",
        "index": 12,
        "label": "Deep Aegean Blue",
        "tone": "Deep Aegean Blue",
        "hex": "#C6BAA4",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1262"
      },
      {
        "id": "var-67",
        "file": "img67.jpg",
        "url": "/storage/same-room-shades/img67.jpg",
        "index": 13,
        "label": "Mulberry Plum",
        "tone": "Mulberry Plum",
        "hex": "#E1CEBD",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1264"
      },
      {
        "id": "var-70",
        "file": "img70.jpg",
        "url": "/storage/same-room-shades/img70.jpg",
        "index": 14,
        "label": "Royal Orchid",
        "tone": "Royal Orchid",
        "hex": "#F0F0EE",
        "family": "Luminous Whites",
        "shadeCode": "BO-1266"
      },
      {
        "id": "var-73",
        "file": "img73.jpg",
        "url": "/storage/same-room-shades/img73.jpg",
        "index": 15,
        "label": "Coastal Sky",
        "tone": "Coastal Sky",
        "hex": "#92A7A2",
        "family": "Ocean & Sky Hues",
        "shadeCode": "BO-1268"
      },
      {
        "id": "var-80",
        "file": "img80.jpg",
        "url": "/storage/same-room-shades/img80.jpg",
        "index": 16,
        "label": "Lavender Mist",
        "tone": "Lavender Mist",
        "hex": "#B89C87",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1270"
      },
      {
        "id": "var-83",
        "file": "img83.jpg",
        "url": "/storage/same-room-shades/img83.jpg",
        "index": 17,
        "label": "Morning Mist",
        "tone": "Morning Mist",
        "hex": "#5A7088",
        "family": "Ocean & Sky Hues",
        "shadeCode": "BO-1272"
      },
      {
        "id": "var-86",
        "file": "img86.jpg",
        "url": "/storage/same-room-shades/img86.jpg",
        "index": 18,
        "label": "Pewter Slate",
        "tone": "Pewter Slate",
        "hex": "#F4F1DE",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1274"
      }
    ]
  },
  {
    "id": "room-2",
    "name": "Neo-Classical Salon with Tufted Sofa",
    "roomType": "Formal Salon",
    "description": "An elegant living space featuring a cream tufted chesterfield sofa, woven wall art, and sculpted arch alcoves.",
    "tags": [
      "Tufted Sofa",
      "Arch Alcove",
      "Boho Wall Art",
      "Warm Glow"
    ],
    "variants": [
      {
        "id": "var-89",
        "file": "img89.jpg",
        "url": "/storage/same-room-shades/img89.jpg",
        "index": 1,
        "label": "Warm Cashmere",
        "tone": "Warm Cashmere",
        "hex": "#DAD1C8",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1270"
      },
      {
        "id": "var-92",
        "file": "img92.jpg",
        "url": "/storage/same-room-shades/img92.jpg",
        "index": 2,
        "label": "Pure Alabaster",
        "tone": "Pure Alabaster",
        "hex": "#FFF9F4",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1272"
      },
      {
        "id": "var-95",
        "file": "img95.jpg",
        "url": "/storage/same-room-shades/img95.jpg",
        "index": 3,
        "label": "Jaipur Terracotta",
        "tone": "Jaipur Terracotta",
        "hex": "#F6EEEB",
        "family": "Warm Ochres & Terracotta",
        "shadeCode": "BO-1274"
      },
      {
        "id": "var-98",
        "file": "img98.jpg",
        "url": "/storage/same-room-shades/img98.jpg",
        "index": 4,
        "label": "Ivory Shimmer",
        "tone": "Ivory Shimmer",
        "hex": "#E1DBC5",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1276"
      },
      {
        "id": "var-101",
        "file": "img101.jpg",
        "url": "/storage/same-room-shades/img101.jpg",
        "index": 5,
        "label": "Roasted Almond",
        "tone": "Roasted Almond",
        "hex": "#FFF5F4",
        "family": "Warm Ochres & Terracotta",
        "shadeCode": "BO-1278"
      },
      {
        "id": "var-104",
        "file": "img104.jpg",
        "url": "/storage/same-room-shades/img104.jpg",
        "index": 6,
        "label": "Gilded Amber",
        "tone": "Gilded Amber",
        "hex": "#F0ECE1",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1280"
      },
      {
        "id": "var-107",
        "file": "img107.jpg",
        "url": "/storage/same-room-shades/img107.jpg",
        "index": 7,
        "label": "Forest Moss",
        "tone": "Forest Moss",
        "hex": "#D1C6C2",
        "family": "Luminous Whites",
        "shadeCode": "BO-1282"
      },
      {
        "id": "var-110",
        "file": "img110.jpg",
        "url": "/storage/same-room-shades/img110.jpg",
        "index": 8,
        "label": "Nilgiri Sage",
        "tone": "Nilgiri Sage",
        "hex": "#FAF7F2",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1284"
      },
      {
        "id": "var-113",
        "file": "img113.jpg",
        "url": "/storage/same-room-shades/img113.jpg",
        "index": 9,
        "label": "Himalayan Frost",
        "tone": "Himalayan Frost",
        "hex": "#D2E2F2",
        "family": "Ocean & Sky Hues",
        "shadeCode": "BO-1286"
      },
      {
        "id": "var-116",
        "file": "img116.jpg",
        "url": "/storage/same-room-shades/img116.jpg",
        "index": 10,
        "label": "Dusty Rose Sand",
        "tone": "Dusty Rose Sand",
        "hex": "#D7C6BE",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1288"
      },
      {
        "id": "var-119",
        "file": "img119.jpg",
        "url": "/storage/same-room-shades/img119.jpg",
        "index": 11,
        "label": "Cardamom Green",
        "tone": "Cardamom Green",
        "hex": "#DCE2E0",
        "family": "Luminous Whites",
        "shadeCode": "BO-1290"
      },
      {
        "id": "var-122",
        "file": "img122.jpg",
        "url": "/storage/same-room-shades/img122.jpg",
        "index": 12,
        "label": "Turquoise Breeze",
        "tone": "Turquoise Breeze",
        "hex": "#FDF6F0",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1292"
      }
    ]
  },
  {
    "id": "room-3",
    "name": "Minimalist Architectural Lounge",
    "roomType": "Open Living Area",
    "description": "Clean architectural geometry with minimalist console tables, soft indirect lighting, and crisp shadow play.",
    "tags": [
      "Minimalist",
      "Geometric",
      "Console Table",
      "Zen Ambient"
    ],
    "variants": [
      {
        "id": "var-125",
        "file": "img125.jpg",
        "url": "/storage/same-room-shades/img125.jpg",
        "index": 1,
        "label": "Warm Cashmere",
        "tone": "Warm Cashmere",
        "hex": "#F5F1E6",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1300"
      },
      {
        "id": "var-128",
        "file": "img128.jpg",
        "url": "/storage/same-room-shades/img128.jpg",
        "index": 2,
        "label": "Pure Alabaster",
        "tone": "Pure Alabaster",
        "hex": "#E5DDC6",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1302"
      },
      {
        "id": "var-131",
        "file": "img131.jpg",
        "url": "/storage/same-room-shades/img131.jpg",
        "index": 3,
        "label": "Ivory Shimmer",
        "tone": "Ivory Shimmer",
        "hex": "#EBDBB7",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1304"
      },
      {
        "id": "var-134",
        "file": "img134.jpg",
        "url": "/storage/same-room-shades/img134.jpg",
        "index": 4,
        "label": "Jaipur Terracotta",
        "tone": "Jaipur Terracotta",
        "hex": "#C27666",
        "family": "Warm Ochres & Terracotta",
        "shadeCode": "BO-1306"
      },
      {
        "id": "var-137",
        "file": "img137.jpg",
        "url": "/storage/same-room-shades/img137.jpg",
        "index": 5,
        "label": "Roasted Almond",
        "tone": "Roasted Almond",
        "hex": "#ECD2AF",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1308"
      },
      {
        "id": "var-144",
        "file": "img144.jpg",
        "url": "/storage/same-room-shades/img144.jpg",
        "index": 6,
        "label": "Gilded Amber",
        "tone": "Gilded Amber",
        "hex": "#F2D9A3",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1310"
      },
      {
        "id": "var-147",
        "file": "img147.jpg",
        "url": "/storage/same-room-shades/img147.jpg",
        "index": 7,
        "label": "Himalayan Frost",
        "tone": "Himalayan Frost",
        "hex": "#D4E6EA",
        "family": "Ocean & Sky Hues",
        "shadeCode": "BO-1312"
      },
      {
        "id": "var-150",
        "file": "img150.jpg",
        "url": "/storage/same-room-shades/img150.jpg",
        "index": 8,
        "label": "Forest Moss",
        "tone": "Forest Moss",
        "hex": "#C5786E",
        "family": "Warm Ochres & Terracotta",
        "shadeCode": "BO-1314"
      },
      {
        "id": "var-153",
        "file": "img153.jpg",
        "url": "/storage/same-room-shades/img153.jpg",
        "index": 9,
        "label": "Nilgiri Sage",
        "tone": "Nilgiri Sage",
        "hex": "#F2F1EF",
        "family": "Luminous Whites",
        "shadeCode": "BO-1316"
      }
    ]
  },
  {
    "id": "room-4",
    "name": "Serene Primary Master Bedroom",
    "roomType": "Master Bedroom Suite",
    "description": "A tranquil bedroom haven demonstrating how soothing neutrals, botanical tones, and deep accents influence restfulness.",
    "tags": [
      "Bedrooms",
      "Restful Pastels",
      "Tonal Balance",
      "Soft Glow"
    ],
    "variants": [
      {
        "id": "var-159",
        "file": "img159.jpg",
        "url": "/storage/same-room-shades/img159.jpg",
        "index": 1,
        "label": "Jaipur Terracotta",
        "tone": "Jaipur Terracotta",
        "hex": "#F4EAE8",
        "family": "Warm Ochres & Terracotta",
        "shadeCode": "BO-1330"
      },
      {
        "id": "var-162",
        "file": "img162.jpg",
        "url": "/storage/same-room-shades/img162.jpg",
        "index": 2,
        "label": "Himalayan Frost",
        "tone": "Himalayan Frost",
        "hex": "#D3E4EB",
        "family": "Ocean & Sky Hues",
        "shadeCode": "BO-1332"
      },
      {
        "id": "var-165",
        "file": "img165.jpg",
        "url": "/storage/same-room-shades/img165.jpg",
        "index": 3,
        "label": "Vanilla Sand",
        "tone": "Vanilla Sand",
        "hex": "#ECF0DF",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1334"
      },
      {
        "id": "var-168",
        "file": "img168.jpg",
        "url": "/storage/same-room-shades/img168.jpg",
        "index": 4,
        "label": "Pure Alabaster",
        "tone": "Pure Alabaster",
        "hex": "#E0C0AB",
        "family": "Warm Ochres & Terracotta",
        "shadeCode": "BO-1336"
      },
      {
        "id": "var-171",
        "file": "img171.jpg",
        "url": "/storage/same-room-shades/img171.jpg",
        "index": 5,
        "label": "Warm Cashmere",
        "tone": "Warm Cashmere",
        "hex": "#F5ECE3",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1338"
      },
      {
        "id": "var-174",
        "file": "img174.jpg",
        "url": "/storage/same-room-shades/img174.jpg",
        "index": 6,
        "label": "Ivory Shimmer",
        "tone": "Ivory Shimmer",
        "hex": "#C9CACE",
        "family": "Luminous Whites",
        "shadeCode": "BO-1340"
      },
      {
        "id": "var-177",
        "file": "img177.jpg",
        "url": "/storage/same-room-shades/img177.jpg",
        "index": 7,
        "label": "Roasted Almond",
        "tone": "Roasted Almond",
        "hex": "#E3E0E7",
        "family": "Luminous Whites",
        "shadeCode": "BO-1342"
      },
      {
        "id": "var-180",
        "file": "img180.jpg",
        "url": "/storage/same-room-shades/img180.jpg",
        "index": 8,
        "label": "Gilded Amber",
        "tone": "Gilded Amber",
        "hex": "#EDE6D6",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1344"
      },
      {
        "id": "var-183",
        "file": "img183.jpg",
        "url": "/storage/same-room-shades/img183.jpg",
        "index": 9,
        "label": "Forest Moss",
        "tone": "Forest Moss",
        "hex": "#CDC78B",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1346"
      },
      {
        "id": "var-186",
        "file": "img186.jpg",
        "url": "/storage/same-room-shades/img186.jpg",
        "index": 10,
        "label": "Nilgiri Sage",
        "tone": "Nilgiri Sage",
        "hex": "#E2E5D2",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1348"
      },
      {
        "id": "var-189",
        "file": "img189.jpg",
        "url": "/storage/same-room-shades/img189.jpg",
        "index": 11,
        "label": "Cardamom Green",
        "tone": "Cardamom Green",
        "hex": "#F9ECBF",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1350"
      },
      {
        "id": "var-192",
        "file": "img192.jpg",
        "url": "/storage/same-room-shades/img192.jpg",
        "index": 12,
        "label": "Turquoise Breeze",
        "tone": "Turquoise Breeze",
        "hex": "#D4D2C6",
        "family": "Luminous Whites",
        "shadeCode": "BO-1352"
      },
      {
        "id": "var-195",
        "file": "img195.jpg",
        "url": "/storage/same-room-shades/img195.jpg",
        "index": 13,
        "label": "Deep Aegean Blue",
        "tone": "Deep Aegean Blue",
        "hex": "#CDC4A5",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1354"
      },
      {
        "id": "var-198",
        "file": "img198.jpg",
        "url": "/storage/same-room-shades/img198.jpg",
        "index": 14,
        "label": "Mulberry Plum",
        "tone": "Mulberry Plum",
        "hex": "#E2DDD7",
        "family": "Luminous Whites",
        "shadeCode": "BO-1356"
      },
      {
        "id": "var-203",
        "file": "img203.jpg",
        "url": "/storage/same-room-shades/img203.jpg",
        "index": 15,
        "label": "Royal Orchid",
        "tone": "Royal Orchid",
        "hex": "#D0C4B6",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1358"
      },
      {
        "id": "var-206",
        "file": "img206.jpg",
        "url": "/storage/same-room-shades/img206.jpg",
        "index": 16,
        "label": "Lavender Mist",
        "tone": "Lavender Mist",
        "hex": "#C8C9CD",
        "family": "Luminous Whites",
        "shadeCode": "BO-1360"
      },
      {
        "id": "var-209",
        "file": "img209.jpg",
        "url": "/storage/same-room-shades/img209.jpg",
        "index": 17,
        "label": "Morning Mist",
        "tone": "Morning Mist",
        "hex": "#F0D09D",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1362"
      },
      {
        "id": "var-212",
        "file": "img212.jpg",
        "url": "/storage/same-room-shades/img212.jpg",
        "index": 18,
        "label": "Pewter Slate",
        "tone": "Pewter Slate",
        "hex": "#E6E3DE",
        "family": "Luminous Whites",
        "shadeCode": "BO-1364"
      },
      {
        "id": "var-215",
        "file": "img215.jpg",
        "url": "/storage/same-room-shades/img215.jpg",
        "index": 19,
        "label": "Charcoal Noir",
        "tone": "Charcoal Noir",
        "hex": "#D5B495",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1366"
      },
      {
        "id": "var-218",
        "file": "img218.jpg",
        "url": "/storage/same-room-shades/img218.jpg",
        "index": 20,
        "label": "Tuscan Ochre",
        "tone": "Tuscan Ochre",
        "hex": "#EFE6E1",
        "family": "Warm Ochres & Terracotta",
        "shadeCode": "BO-1368"
      },
      {
        "id": "var-221",
        "file": "img221.jpg",
        "url": "/storage/same-room-shades/img221.jpg",
        "index": 21,
        "label": "Ruby Vermillion",
        "tone": "Ruby Vermillion",
        "hex": "#C7C8CC",
        "family": "Luminous Whites",
        "shadeCode": "BO-1370"
      },
      {
        "id": "var-224",
        "file": "img224.jpg",
        "url": "/storage/same-room-shades/img224.jpg",
        "index": 22,
        "label": "Desert Dune",
        "tone": "Desert Dune",
        "hex": "#C8C9CD",
        "family": "Luminous Whites",
        "shadeCode": "BO-1372"
      },
      {
        "id": "var-227",
        "file": "img227.jpg",
        "url": "/storage/same-room-shades/img227.jpg",
        "index": 23,
        "label": "Coastal Sky",
        "tone": "Coastal Sky",
        "hex": "#C8C9CD",
        "family": "Luminous Whites",
        "shadeCode": "BO-1374"
      }
    ]
  },
  {
    "id": "room-5",
    "name": "Open-Concept Dining & Kitchen Studio",
    "roomType": "Dining & Culinary Space",
    "description": "A social dining and kitchen space illuminated by architectural downlights and natural morning sunlight.",
    "tags": [
      "Dining",
      "Open Kitchen",
      "Social Entertaining",
      "Daylight"
    ],
    "variants": [
      {
        "id": "var-230",
        "file": "img230.jpg",
        "url": "/storage/same-room-shades/img230.jpg",
        "index": 1,
        "label": "Warm Cashmere",
        "tone": "Warm Cashmere",
        "hex": "#FAF6F3",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1360"
      },
      {
        "id": "var-233",
        "file": "img233.jpg",
        "url": "/storage/same-room-shades/img233.jpg",
        "index": 2,
        "label": "Pure Alabaster",
        "tone": "Pure Alabaster",
        "hex": "#FDFAF5",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1362"
      },
      {
        "id": "var-236",
        "file": "img236.jpg",
        "url": "/storage/same-room-shades/img236.jpg",
        "index": 3,
        "label": "Vanilla Sand",
        "tone": "Vanilla Sand",
        "hex": "#FDFDFB",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1364"
      },
      {
        "id": "var-239",
        "file": "img239.jpg",
        "url": "/storage/same-room-shades/img239.jpg",
        "index": 4,
        "label": "Ruby Vermillion",
        "tone": "Ruby Vermillion",
        "hex": "#564033",
        "family": "Deep & Royal Accents",
        "shadeCode": "BO-1366"
      },
      {
        "id": "var-242",
        "file": "img242.jpg",
        "url": "/storage/same-room-shades/img242.jpg",
        "index": 5,
        "label": "Ivory Shimmer",
        "tone": "Ivory Shimmer",
        "hex": "#584235",
        "family": "Deep & Royal Accents",
        "shadeCode": "BO-1368"
      },
      {
        "id": "var-245",
        "file": "img245.jpg",
        "url": "/storage/same-room-shades/img245.jpg",
        "index": 6,
        "label": "Roasted Almond",
        "tone": "Roasted Almond",
        "hex": "#564033",
        "family": "Deep & Royal Accents",
        "shadeCode": "BO-1370"
      },
      {
        "id": "var-248",
        "file": "img248.jpg",
        "url": "/storage/same-room-shades/img248.jpg",
        "index": 7,
        "label": "Jaipur Terracotta",
        "tone": "Jaipur Terracotta",
        "hex": "#FCFDF8",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1372"
      },
      {
        "id": "var-251",
        "file": "img251.jpg",
        "url": "/storage/same-room-shades/img251.jpg",
        "index": 8,
        "label": "Dusty Rose Sand",
        "tone": "Dusty Rose Sand",
        "hex": "#D5BFB4",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1374"
      },
      {
        "id": "var-254",
        "file": "img254.jpg",
        "url": "/storage/same-room-shades/img254.jpg",
        "index": 9,
        "label": "Gilded Amber",
        "tone": "Gilded Amber",
        "hex": "#574134",
        "family": "Deep & Royal Accents",
        "shadeCode": "BO-1376"
      },
      {
        "id": "var-259",
        "file": "img259.jpg",
        "url": "/storage/same-room-shades/img259.jpg",
        "index": 10,
        "label": "Forest Moss",
        "tone": "Forest Moss",
        "hex": "#F9F8F6",
        "family": "Luminous Whites",
        "shadeCode": "BO-1378"
      },
      {
        "id": "var-262",
        "file": "img262.jpg",
        "url": "/storage/same-room-shades/img262.jpg",
        "index": 11,
        "label": "Nilgiri Sage",
        "tone": "Nilgiri Sage",
        "hex": "#F6F1ED",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1380"
      },
      {
        "id": "var-265",
        "file": "img265.jpg",
        "url": "/storage/same-room-shades/img265.jpg",
        "index": 12,
        "label": "Cardamom Green",
        "tone": "Cardamom Green",
        "hex": "#FBFAF6",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1382"
      }
    ]
  },
  {
    "id": "room-6",
    "name": "Creative Study & Reading Alcove",
    "roomType": "Home Office & Study",
    "description": "A focused executive workspace with ergonomic warmth and reflective balance tailored for prolonged productivity.",
    "tags": [
      "Home Office",
      "Study Nook",
      "Focus",
      "Warm Wood"
    ],
    "variants": [
      {
        "id": "var-268",
        "file": "img268.jpg",
        "url": "/storage/same-room-shades/img268.jpg",
        "index": 1,
        "label": "Lavender Mist",
        "tone": "Lavender Mist",
        "hex": "#F0E5EB",
        "family": "Deep & Royal Accents",
        "shadeCode": "BO-1390"
      },
      {
        "id": "var-271",
        "file": "img271.jpg",
        "url": "/storage/same-room-shades/img271.jpg",
        "index": 2,
        "label": "Jaipur Terracotta",
        "tone": "Jaipur Terracotta",
        "hex": "#E1986D",
        "family": "Warm Ochres & Terracotta",
        "shadeCode": "BO-1392"
      },
      {
        "id": "var-274",
        "file": "img274.jpg",
        "url": "/storage/same-room-shades/img274.jpg",
        "index": 3,
        "label": "Turquoise Breeze",
        "tone": "Turquoise Breeze",
        "hex": "#7EA9CB",
        "family": "Ocean & Sky Hues",
        "shadeCode": "BO-1394"
      },
      {
        "id": "var-277",
        "file": "img277.jpg",
        "url": "/storage/same-room-shades/img277.jpg",
        "index": 4,
        "label": "Warm Cashmere",
        "tone": "Warm Cashmere",
        "hex": "#EADEC4",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1396"
      },
      {
        "id": "var-280",
        "file": "img280.jpg",
        "url": "/storage/same-room-shades/img280.jpg",
        "index": 5,
        "label": "Royal Orchid",
        "tone": "Royal Orchid",
        "hex": "#FFF2FB",
        "family": "Deep & Royal Accents",
        "shadeCode": "BO-1398"
      }
    ]
  },
  {
    "id": "room-7",
    "name": "Contemporary Gallery Living Room",
    "roomType": "Living & Gallery Space",
    "description": "A modern open gallery living room with designer wall art, bespoke consoles, and textured area rugs.",
    "tags": [
      "Gallery",
      "Art Display",
      "Open Concept",
      "Contemporary"
    ],
    "variants": [
      {
        "id": "var-284",
        "file": "img284.jpg",
        "url": "/storage/same-room-shades/img284.jpg",
        "index": 1,
        "label": "Ivory Shimmer",
        "tone": "Ivory Shimmer",
        "hex": "#D9D6CF",
        "family": "Luminous Whites",
        "shadeCode": "BO-1420"
      },
      {
        "id": "var-302",
        "file": "img302.jpg",
        "url": "/storage/same-room-shades/img302.jpg",
        "index": 2,
        "label": "Jaipur Terracotta",
        "tone": "Jaipur Terracotta",
        "hex": "#F0E2D9",
        "family": "Warm Ochres & Terracotta",
        "shadeCode": "BO-1422"
      },
      {
        "id": "var-305",
        "file": "img305.jpg",
        "url": "/storage/same-room-shades/img305.jpg",
        "index": 3,
        "label": "Pure Alabaster",
        "tone": "Pure Alabaster",
        "hex": "#D9D6CF",
        "family": "Luminous Whites",
        "shadeCode": "BO-1424"
      },
      {
        "id": "var-308",
        "file": "img308.jpg",
        "url": "/storage/same-room-shades/img308.jpg",
        "index": 4,
        "label": "Warm Cashmere",
        "tone": "Warm Cashmere",
        "hex": "#D7D7CD",
        "family": "Luminous Whites",
        "shadeCode": "BO-1426"
      },
      {
        "id": "var-311",
        "file": "img311.jpg",
        "url": "/storage/same-room-shades/img311.jpg",
        "index": 5,
        "label": "Roasted Almond",
        "tone": "Roasted Almond",
        "hex": "#D9D6CF",
        "family": "Luminous Whites",
        "shadeCode": "BO-1428"
      },
      {
        "id": "var-314",
        "file": "img314.jpg",
        "url": "/storage/same-room-shades/img314.jpg",
        "index": 6,
        "label": "Gilded Amber",
        "tone": "Gilded Amber",
        "hex": "#DABCB4",
        "family": "Warm Ochres & Terracotta",
        "shadeCode": "BO-1430"
      },
      {
        "id": "var-317",
        "file": "img317.jpg",
        "url": "/storage/same-room-shades/img317.jpg",
        "index": 7,
        "label": "Forest Moss",
        "tone": "Forest Moss",
        "hex": "#CEBEAF",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1432"
      },
      {
        "id": "var-320",
        "file": "img320.jpg",
        "url": "/storage/same-room-shades/img320.jpg",
        "index": 8,
        "label": "Nilgiri Sage",
        "tone": "Nilgiri Sage",
        "hex": "#EAD9BD",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1434"
      },
      {
        "id": "var-323",
        "file": "img323.jpg",
        "url": "/storage/same-room-shades/img323.jpg",
        "index": 9,
        "label": "Cardamom Green",
        "tone": "Cardamom Green",
        "hex": "#D9D6CF",
        "family": "Luminous Whites",
        "shadeCode": "BO-1436"
      },
      {
        "id": "var-326",
        "file": "img326.jpg",
        "url": "/storage/same-room-shades/img326.jpg",
        "index": 10,
        "label": "Turquoise Breeze",
        "tone": "Turquoise Breeze",
        "hex": "#D9D6CF",
        "family": "Luminous Whites",
        "shadeCode": "BO-1438"
      }
    ]
  },
  {
    "id": "room-8",
    "name": "Sunlit Guest Suite & Bedside Studio",
    "roomType": "Guest Bedroom Suite",
    "description": "A welcoming guest room with sun-drenched windows, organic textures, and balanced tone transitions.",
    "tags": [
      "Guest Bedroom",
      "Daylight Window",
      "Linen Textures",
      "Cozy"
    ],
    "variants": [
      {
        "id": "var-329",
        "file": "img329.jpg",
        "url": "/storage/same-room-shades/img329.jpg",
        "index": 1,
        "label": "Warm Cashmere",
        "tone": "Warm Cashmere",
        "hex": "#FCE2A5",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1450"
      },
      {
        "id": "var-332",
        "file": "img332.jpg",
        "url": "/storage/same-room-shades/img332.jpg",
        "index": 2,
        "label": "Jaipur Terracotta",
        "tone": "Jaipur Terracotta",
        "hex": "#B06A6A",
        "family": "Warm Ochres & Terracotta",
        "shadeCode": "BO-1452"
      },
      {
        "id": "var-335",
        "file": "img335.jpg",
        "url": "/storage/same-room-shades/img335.jpg",
        "index": 3,
        "label": "Pure Alabaster",
        "tone": "Pure Alabaster",
        "hex": "#F2F0E1",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1454"
      },
      {
        "id": "var-338",
        "file": "img338.jpg",
        "url": "/storage/same-room-shades/img338.jpg",
        "index": 4,
        "label": "Ivory Shimmer",
        "tone": "Ivory Shimmer",
        "hex": "#EFC7BB",
        "family": "Warm Ochres & Terracotta",
        "shadeCode": "BO-1456"
      },
      {
        "id": "var-341",
        "file": "img341.jpg",
        "url": "/storage/same-room-shades/img341.jpg",
        "index": 5,
        "label": "Roasted Almond",
        "tone": "Roasted Almond",
        "hex": "#F9CF93",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1458"
      },
      {
        "id": "var-344",
        "file": "img344.jpg",
        "url": "/storage/same-room-shades/img344.jpg",
        "index": 6,
        "label": "Himalayan Frost",
        "tone": "Himalayan Frost",
        "hex": "#BEDBE9",
        "family": "Ocean & Sky Hues",
        "shadeCode": "BO-1460"
      },
      {
        "id": "var-347",
        "file": "img347.jpg",
        "url": "/storage/same-room-shades/img347.jpg",
        "index": 7,
        "label": "Deep Aegean Blue",
        "tone": "Deep Aegean Blue",
        "hex": "#355D76",
        "family": "Ocean & Sky Hues",
        "shadeCode": "BO-1462"
      },
      {
        "id": "var-350",
        "file": "img350.jpg",
        "url": "/storage/same-room-shades/img350.jpg",
        "index": 8,
        "label": "Nilgiri Sage",
        "tone": "Nilgiri Sage",
        "hex": "#CFE0C0",
        "family": "Botanical Greens",
        "shadeCode": "BO-1464"
      },
      {
        "id": "var-353",
        "file": "img353.jpg",
        "url": "/storage/same-room-shades/img353.jpg",
        "index": 9,
        "label": "Gilded Amber",
        "tone": "Gilded Amber",
        "hex": "#D4EEE5",
        "family": "Botanical Greens",
        "shadeCode": "BO-1466"
      },
      {
        "id": "var-356",
        "file": "img356.jpg",
        "url": "/storage/same-room-shades/img356.jpg",
        "index": 10,
        "label": "Lavender Mist",
        "tone": "Lavender Mist",
        "hex": "#C19DA9",
        "family": "Deep & Royal Accents",
        "shadeCode": "BO-1468"
      },
      {
        "id": "var-359",
        "file": "img359.jpg",
        "url": "/storage/same-room-shades/img359.jpg",
        "index": 11,
        "label": "Vanilla Sand",
        "tone": "Vanilla Sand",
        "hex": "#E1E7C1",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1470"
      },
      {
        "id": "var-362",
        "file": "img362.jpg",
        "url": "/storage/same-room-shades/img362.jpg",
        "index": 12,
        "label": "Cardamom Green",
        "tone": "Cardamom Green",
        "hex": "#9BB6A7",
        "family": "Botanical Greens",
        "shadeCode": "BO-1472"
      },
      {
        "id": "var-365",
        "file": "img365.jpg",
        "url": "/storage/same-room-shades/img365.jpg",
        "index": 13,
        "label": "Coastal Sky",
        "tone": "Coastal Sky",
        "hex": "#73839C",
        "family": "Ocean & Sky Hues",
        "shadeCode": "BO-1474"
      },
      {
        "id": "var-368",
        "file": "img368.jpg",
        "url": "/storage/same-room-shades/img368.jpg",
        "index": 14,
        "label": "Forest Moss",
        "tone": "Forest Moss",
        "hex": "#98B2B3",
        "family": "Ocean & Sky Hues",
        "shadeCode": "BO-1476"
      },
      {
        "id": "var-371",
        "file": "img371.jpg",
        "url": "/storage/same-room-shades/img371.jpg",
        "index": 15,
        "label": "Turquoise Breeze",
        "tone": "Turquoise Breeze",
        "hex": "#7D9CB8",
        "family": "Ocean & Sky Hues",
        "shadeCode": "BO-1478"
      }
    ]
  },
  {
    "id": "room-9",
    "name": "Chandelier Dining Room & Feature Wall",
    "roomType": "Formal Dining Suite",
    "description": "A dramatic dining space with statement lighting, accent walls, and ambient warmth for evening hosting.",
    "tags": [
      "Formal Dining",
      "Chandelier",
      "Feature Wall",
      "Evening Mood"
    ],
    "variants": [
      {
        "id": "var-374",
        "file": "img374.jpg",
        "url": "/storage/same-room-shades/img374.jpg",
        "index": 1,
        "label": "Warm Cashmere",
        "tone": "Warm Cashmere",
        "hex": "#DAD8C3",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1480"
      },
      {
        "id": "var-377",
        "file": "img377.jpg",
        "url": "/storage/same-room-shades/img377.jpg",
        "index": 2,
        "label": "Jaipur Terracotta",
        "tone": "Jaipur Terracotta",
        "hex": "#DBA988",
        "family": "Warm Ochres & Terracotta",
        "shadeCode": "BO-1482"
      },
      {
        "id": "var-380",
        "file": "img380.jpg",
        "url": "/storage/same-room-shades/img380.jpg",
        "index": 3,
        "label": "Pure Alabaster",
        "tone": "Pure Alabaster",
        "hex": "#F3EBE0",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1484"
      },
      {
        "id": "var-383",
        "file": "img383.jpg",
        "url": "/storage/same-room-shades/img383.jpg",
        "index": 4,
        "label": "Ivory Shimmer",
        "tone": "Ivory Shimmer",
        "hex": "#DFC183",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1486"
      },
      {
        "id": "var-386",
        "file": "img386.jpg",
        "url": "/storage/same-room-shades/img386.jpg",
        "index": 5,
        "label": "Roasted Almond",
        "tone": "Roasted Almond",
        "hex": "#ECDFD6",
        "family": "Warm Ochres & Terracotta",
        "shadeCode": "BO-1488"
      },
      {
        "id": "var-389",
        "file": "img389.jpg",
        "url": "/storage/same-room-shades/img389.jpg",
        "index": 6,
        "label": "Gilded Amber",
        "tone": "Gilded Amber",
        "hex": "#F2E8DC",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1490"
      },
      {
        "id": "var-392",
        "file": "img392.jpg",
        "url": "/storage/same-room-shades/img392.jpg",
        "index": 7,
        "label": "Forest Moss",
        "tone": "Forest Moss",
        "hex": "#F7EAC7",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1492"
      },
      {
        "id": "var-395",
        "file": "img395.jpg",
        "url": "/storage/same-room-shades/img395.jpg",
        "index": 8,
        "label": "Nilgiri Sage",
        "tone": "Nilgiri Sage",
        "hex": "#FFAA73",
        "family": "Warm Ochres & Terracotta",
        "shadeCode": "BO-1494"
      },
      {
        "id": "var-398",
        "file": "img398.jpg",
        "url": "/storage/same-room-shades/img398.jpg",
        "index": 9,
        "label": "Cardamom Green",
        "tone": "Cardamom Green",
        "hex": "#F8CBAA",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1496"
      },
      {
        "id": "var-401",
        "file": "img401.jpg",
        "url": "/storage/same-room-shades/img401.jpg",
        "index": 10,
        "label": "Tuscan Ochre",
        "tone": "Tuscan Ochre",
        "hex": "#C7BC6A",
        "family": "Warm Ochres & Terracotta",
        "shadeCode": "BO-1498"
      },
      {
        "id": "var-404",
        "file": "img404.jpg",
        "url": "/storage/same-room-shades/img404.jpg",
        "index": 11,
        "label": "Turquoise Breeze",
        "tone": "Turquoise Breeze",
        "hex": "#F8E9BE",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1500"
      },
      {
        "id": "var-407",
        "file": "img407.jpg",
        "url": "/storage/same-room-shades/img407.jpg",
        "index": 12,
        "label": "Deep Aegean Blue",
        "tone": "Deep Aegean Blue",
        "hex": "#F8B27F",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1502"
      },
      {
        "id": "var-410",
        "file": "img410.jpg",
        "url": "/storage/same-room-shades/img410.jpg",
        "index": 13,
        "label": "Himalayan Frost",
        "tone": "Himalayan Frost",
        "hex": "#D69987",
        "family": "Warm Ochres & Terracotta",
        "shadeCode": "BO-1504"
      },
      {
        "id": "var-413",
        "file": "img413.jpg",
        "url": "/storage/same-room-shades/img413.jpg",
        "index": 14,
        "label": "Mulberry Plum",
        "tone": "Mulberry Plum",
        "hex": "#DEA071",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1506"
      },
      {
        "id": "var-416",
        "file": "img416.jpg",
        "url": "/storage/same-room-shades/img416.jpg",
        "index": 15,
        "label": "Royal Orchid",
        "tone": "Royal Orchid",
        "hex": "#A9C9BE",
        "family": "Botanical Greens",
        "shadeCode": "BO-1508"
      }
    ]
  },
  {
    "id": "room-10",
    "name": "Architectural Exterior Terrace & Villa",
    "roomType": "Exterior & Sun Lounge",
    "description": "Modern exterior facade and covered veranda capturing varying exterior paints under full daylight and twilight.",
    "tags": [
      "Exterior Villa",
      "Terrace",
      "Weather-Proof",
      "Architectural"
    ],
    "variants": [
      {
        "id": "var-422",
        "file": "img422.jpg",
        "url": "/storage/same-room-shades/img422.jpg",
        "index": 1,
        "label": "Ruby Vermillion",
        "tone": "Ruby Vermillion",
        "hex": "#74452B",
        "family": "Deep & Royal Accents",
        "shadeCode": "BO-1510"
      },
      {
        "id": "var-425",
        "file": "img425.jpg",
        "url": "/storage/same-room-shades/img425.jpg",
        "index": 2,
        "label": "Dusty Rose Sand",
        "tone": "Dusty Rose Sand",
        "hex": "#9A715D",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1512"
      },
      {
        "id": "var-428",
        "file": "img428.jpg",
        "url": "/storage/same-room-shades/img428.jpg",
        "index": 3,
        "label": "Tuscan Ochre",
        "tone": "Tuscan Ochre",
        "hex": "#B38C3F",
        "family": "Warm Ochres & Terracotta",
        "shadeCode": "BO-1514"
      },
      {
        "id": "var-431",
        "file": "img431.jpg",
        "url": "/storage/same-room-shades/img431.jpg",
        "index": 4,
        "label": "Pure Alabaster",
        "tone": "Pure Alabaster",
        "hex": "#8F4A23",
        "family": "Deep & Royal Accents",
        "shadeCode": "BO-1516"
      },
      {
        "id": "var-434",
        "file": "img434.jpg",
        "url": "/storage/same-room-shades/img434.jpg",
        "index": 5,
        "label": "Ivory Shimmer",
        "tone": "Ivory Shimmer",
        "hex": "#824C34",
        "family": "Deep & Royal Accents",
        "shadeCode": "BO-1518"
      },
      {
        "id": "var-437",
        "file": "img437.jpg",
        "url": "/storage/same-room-shades/img437.jpg",
        "index": 6,
        "label": "Warm Cashmere",
        "tone": "Warm Cashmere",
        "hex": "#6F3C1D",
        "family": "Deep & Royal Accents",
        "shadeCode": "BO-1520"
      },
      {
        "id": "var-440",
        "file": "img440.jpg",
        "url": "/storage/same-room-shades/img440.jpg",
        "index": 7,
        "label": "Roasted Almond",
        "tone": "Roasted Almond",
        "hex": "#EFCC66",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1522"
      },
      {
        "id": "var-443",
        "file": "img443.jpg",
        "url": "/storage/same-room-shades/img443.jpg",
        "index": 8,
        "label": "Jaipur Terracotta",
        "tone": "Jaipur Terracotta",
        "hex": "#7E462F",
        "family": "Deep & Royal Accents",
        "shadeCode": "BO-1524"
      },
      {
        "id": "var-446",
        "file": "img446.jpg",
        "url": "/storage/same-room-shades/img446.jpg",
        "index": 9,
        "label": "Gilded Amber",
        "tone": "Gilded Amber",
        "hex": "#FDB235",
        "family": "Warm Ochres & Terracotta",
        "shadeCode": "BO-1526"
      },
      {
        "id": "var-449",
        "file": "img449.jpg",
        "url": "/storage/same-room-shades/img449.jpg",
        "index": 10,
        "label": "Forest Moss",
        "tone": "Forest Moss",
        "hex": "#924636",
        "family": "Deep & Royal Accents",
        "shadeCode": "BO-1528"
      },
      {
        "id": "var-452",
        "file": "img452.jpg",
        "url": "/storage/same-room-shades/img452.jpg",
        "index": 11,
        "label": "Nilgiri Sage",
        "tone": "Nilgiri Sage",
        "hex": "#FAE0BD",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1530"
      },
      {
        "id": "var-455",
        "file": "img455.jpg",
        "url": "/storage/same-room-shades/img455.jpg",
        "index": 12,
        "label": "Cardamom Green",
        "tone": "Cardamom Green",
        "hex": "#986F53",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1532"
      },
      {
        "id": "var-460",
        "file": "img460.jpg",
        "url": "/storage/same-room-shades/img460.jpg",
        "index": 13,
        "label": "Turquoise Breeze",
        "tone": "Turquoise Breeze",
        "hex": "#864A30",
        "family": "Deep & Royal Accents",
        "shadeCode": "BO-1534"
      },
      {
        "id": "var-463",
        "file": "img463.jpg",
        "url": "/storage/same-room-shades/img463.jpg",
        "index": 14,
        "label": "Deep Aegean Blue",
        "tone": "Deep Aegean Blue",
        "hex": "#804934",
        "family": "Deep & Royal Accents",
        "shadeCode": "BO-1536"
      },
      {
        "id": "var-466",
        "file": "img466.jpg",
        "url": "/storage/same-room-shades/img466.jpg",
        "index": 15,
        "label": "Himalayan Frost",
        "tone": "Himalayan Frost",
        "hex": "#7A4630",
        "family": "Deep & Royal Accents",
        "shadeCode": "BO-1538"
      },
      {
        "id": "var-469",
        "file": "img469.jpg",
        "url": "/storage/same-room-shades/img469.jpg",
        "index": 16,
        "label": "Mulberry Plum",
        "tone": "Mulberry Plum",
        "hex": "#7A472C",
        "family": "Deep & Royal Accents",
        "shadeCode": "BO-1540"
      },
      {
        "id": "var-472",
        "file": "img472.jpg",
        "url": "/storage/same-room-shades/img472.jpg",
        "index": 17,
        "label": "Royal Orchid",
        "tone": "Royal Orchid",
        "hex": "#75412B",
        "family": "Deep & Royal Accents",
        "shadeCode": "BO-1542"
      }
    ]
  },
  {
    "id": "room-11",
    "name": "Grand Foyer & Gallery Corridor",
    "roomType": "Entryway & Corridor",
    "description": "An inviting transition corridor emphasizing expansive perspective lines and wall reflectance values.",
    "tags": [
      "Grand Foyer",
      "Corridor",
      "First Impression",
      "High Ceilings"
    ],
    "variants": [
      {
        "id": "var-475",
        "file": "img475.jpg",
        "url": "/storage/same-room-shades/img475.jpg",
        "index": 1,
        "label": "Dusty Rose Sand",
        "tone": "Dusty Rose Sand",
        "hex": "#DBC9BD",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1540"
      },
      {
        "id": "var-478",
        "file": "img478.jpg",
        "url": "/storage/same-room-shades/img478.jpg",
        "index": 2,
        "label": "Warm Cashmere",
        "tone": "Warm Cashmere",
        "hex": "#DCCEC1",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1542"
      },
      {
        "id": "var-481",
        "file": "img481.jpg",
        "url": "/storage/same-room-shades/img481.jpg",
        "index": 3,
        "label": "Pure Alabaster",
        "tone": "Pure Alabaster",
        "hex": "#9B7A73",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1544"
      },
      {
        "id": "var-484",
        "file": "img484.jpg",
        "url": "/storage/same-room-shades/img484.jpg",
        "index": 4,
        "label": "Roasted Almond",
        "tone": "Roasted Almond",
        "hex": "#B6A78A",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1546"
      },
      {
        "id": "var-487",
        "file": "img487.jpg",
        "url": "/storage/same-room-shades/img487.jpg",
        "index": 5,
        "label": "Ivory Shimmer",
        "tone": "Ivory Shimmer",
        "hex": "#DDBD96",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1548"
      },
      {
        "id": "var-490",
        "file": "img490.jpg",
        "url": "/storage/same-room-shades/img490.jpg",
        "index": 6,
        "label": "Jaipur Terracotta",
        "tone": "Jaipur Terracotta",
        "hex": "#E6D6C6",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1550"
      },
      {
        "id": "var-493",
        "file": "img493.jpg",
        "url": "/storage/same-room-shades/img493.jpg",
        "index": 7,
        "label": "Gilded Amber",
        "tone": "Gilded Amber",
        "hex": "#D9CBBE",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1552"
      },
      {
        "id": "var-496",
        "file": "img496.jpg",
        "url": "/storage/same-room-shades/img496.jpg",
        "index": 8,
        "label": "Forest Moss",
        "tone": "Forest Moss",
        "hex": "#A7977E",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1554"
      },
      {
        "id": "var-499",
        "file": "img499.jpg",
        "url": "/storage/same-room-shades/img499.jpg",
        "index": 9,
        "label": "Desert Dune",
        "tone": "Desert Dune",
        "hex": "#8B965A",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1556"
      },
      {
        "id": "var-502",
        "file": "img502.jpg",
        "url": "/storage/same-room-shades/img502.jpg",
        "index": 10,
        "label": "Nilgiri Sage",
        "tone": "Nilgiri Sage",
        "hex": "#D9CBBE",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1558"
      },
      {
        "id": "var-505",
        "file": "img505.jpg",
        "url": "/storage/same-room-shades/img505.jpg",
        "index": 11,
        "label": "Cardamom Green",
        "tone": "Cardamom Green",
        "hex": "#C5B2A3",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1560"
      },
      {
        "id": "var-508",
        "file": "img508.jpg",
        "url": "/storage/same-room-shades/img508.jpg",
        "index": 12,
        "label": "Turquoise Breeze",
        "tone": "Turquoise Breeze",
        "hex": "#D9CCB9",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1562"
      },
      {
        "id": "var-511",
        "file": "img511.jpg",
        "url": "/storage/same-room-shades/img511.jpg",
        "index": 13,
        "label": "Deep Aegean Blue",
        "tone": "Deep Aegean Blue",
        "hex": "#D2702F",
        "family": "Warm Ochres & Terracotta",
        "shadeCode": "BO-1564"
      },
      {
        "id": "var-514",
        "file": "img514.jpg",
        "url": "/storage/same-room-shades/img514.jpg",
        "index": 14,
        "label": "Himalayan Frost",
        "tone": "Himalayan Frost",
        "hex": "#51499C",
        "family": "Ocean & Sky Hues",
        "shadeCode": "BO-1566"
      },
      {
        "id": "var-517",
        "file": "img517.jpg",
        "url": "/storage/same-room-shades/img517.jpg",
        "index": 15,
        "label": "Mulberry Plum",
        "tone": "Mulberry Plum",
        "hex": "#E7D6CC",
        "family": "Warm Ochres & Terracotta",
        "shadeCode": "BO-1568"
      }
    ]
  },
  {
    "id": "room-12",
    "name": "Luxury Powder Room & Dressing Suite",
    "roomType": "Bath & Vanity Suite",
    "description": "An intimate dressing lounge and vanity space featuring mood lighting, premium finishes, and rich accent tones.",
    "tags": [
      "Powder Room",
      "Vanity",
      "Luxury Finishes",
      "Intimate Mood"
    ],
    "variants": [
      {
        "id": "var-520",
        "file": "img520.jpg",
        "url": "/storage/same-room-shades/img520.jpg",
        "index": 1,
        "label": "Vanilla Sand",
        "tone": "Vanilla Sand",
        "hex": "#CED2AF",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1570"
      },
      {
        "id": "var-523",
        "file": "img523.jpg",
        "url": "/storage/same-room-shades/img523.jpg",
        "index": 2,
        "label": "Tuscan Ochre",
        "tone": "Tuscan Ochre",
        "hex": "#D89F2E",
        "family": "Warm Ochres & Terracotta",
        "shadeCode": "BO-1572"
      },
      {
        "id": "var-526",
        "file": "img526.jpg",
        "url": "/storage/same-room-shades/img526.jpg",
        "index": 3,
        "label": "Roasted Almond",
        "tone": "Roasted Almond",
        "hex": "#8B6340",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1574"
      },
      {
        "id": "var-529",
        "file": "img529.jpg",
        "url": "/storage/same-room-shades/img529.jpg",
        "index": 4,
        "label": "Warm Cashmere",
        "tone": "Warm Cashmere",
        "hex": "#EECC82",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1576"
      },
      {
        "id": "var-532",
        "file": "img532.jpg",
        "url": "/storage/same-room-shades/img532.jpg",
        "index": 5,
        "label": "Charcoal Noir",
        "tone": "Charcoal Noir",
        "hex": "#646C6F",
        "family": "Deep & Royal Accents",
        "shadeCode": "BO-1578"
      },
      {
        "id": "var-535",
        "file": "img535.jpg",
        "url": "/storage/same-room-shades/img535.jpg",
        "index": 6,
        "label": "Pure Alabaster",
        "tone": "Pure Alabaster",
        "hex": "#68633D",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1580"
      },
      {
        "id": "var-538",
        "file": "img538.jpg",
        "url": "/storage/same-room-shades/img538.jpg",
        "index": 7,
        "label": "Pewter Slate",
        "tone": "Pewter Slate",
        "hex": "#9693A4",
        "family": "Crisp Greys",
        "shadeCode": "BO-1582"
      },
      {
        "id": "var-541",
        "file": "img541.jpg",
        "url": "/storage/same-room-shades/img541.jpg",
        "index": 8,
        "label": "Dusty Rose Sand",
        "tone": "Dusty Rose Sand",
        "hex": "#B7A193",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1584"
      },
      {
        "id": "var-544",
        "file": "img544.jpg",
        "url": "/storage/same-room-shades/img544.jpg",
        "index": 9,
        "label": "Ivory Shimmer",
        "tone": "Ivory Shimmer",
        "hex": "#B28475",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1586"
      },
      {
        "id": "var-547",
        "file": "img547.jpg",
        "url": "/storage/same-room-shades/img547.jpg",
        "index": 10,
        "label": "Deep Aegean Blue",
        "tone": "Deep Aegean Blue",
        "hex": "#33615F",
        "family": "Ocean & Sky Hues",
        "shadeCode": "BO-1588"
      },
      {
        "id": "var-550",
        "file": "img550.jpg",
        "url": "/storage/same-room-shades/img550.jpg",
        "index": 11,
        "label": "Coastal Sky",
        "tone": "Coastal Sky",
        "hex": "#959BA9",
        "family": "Ocean & Sky Hues",
        "shadeCode": "BO-1590"
      },
      {
        "id": "var-553",
        "file": "img553.jpg",
        "url": "/storage/same-room-shades/img553.jpg",
        "index": 12,
        "label": "Morning Mist",
        "tone": "Morning Mist",
        "hex": "#B1BCB4",
        "family": "Crisp Greys",
        "shadeCode": "BO-1592"
      },
      {
        "id": "var-556",
        "file": "img556.jpg",
        "url": "/storage/same-room-shades/img556.jpg",
        "index": 13,
        "label": "Jaipur Terracotta",
        "tone": "Jaipur Terracotta",
        "hex": "#D89C54",
        "family": "Warm Ochres & Terracotta",
        "shadeCode": "BO-1594"
      },
      {
        "id": "var-559",
        "file": "img559.jpg",
        "url": "/storage/same-room-shades/img559.jpg",
        "index": 14,
        "label": "Gilded Amber",
        "tone": "Gilded Amber",
        "hex": "#D68896",
        "family": "Warm Ochres & Terracotta",
        "shadeCode": "BO-1596"
      }
    ]
  }
];
