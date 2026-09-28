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
    "name": "Modern Open Living & Architectural Lounge",
    "roomType": "Living Room Studio",
    "description": "An open-concept architectural living area showcasing subtle tonal shifts between warm whites, muted chamois, and crisp daylight undertones.",
    "tags": [
      "Lounge",
      "Open Concept",
      "Natural Daylight",
      "Accent Wall"
    ],
    "variants": [
      {
        "id": "var-22",
        "file": "img22.jpg",
        "url": "/storage/same-room-shades/img22.jpg",
        "index": 1,
        "label": "Pure Alabaster",
        "tone": "Pure Alabaster",
        "hex": "#F4F1EA",
        "family": "Whites & Off-Whites",
        "shadeCode": "BO-1000"
      },
      {
        "id": "var-27",
        "file": "img27.jpg",
        "url": "/storage/same-room-shades/img27.jpg",
        "index": 2,
        "label": "Warm Cashmere",
        "tone": "Warm Cashmere",
        "hex": "#E6DDD1",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1007"
      },
      {
        "id": "var-30",
        "file": "img30.jpg",
        "url": "/storage/same-room-shades/img30.jpg",
        "index": 3,
        "label": "Monsoon Mist",
        "tone": "Monsoon Mist",
        "hex": "#D1D8DB",
        "family": "Cool Greys",
        "shadeCode": "BO-1014"
      },
      {
        "id": "var-33",
        "file": "img33.jpg",
        "url": "/storage/same-room-shades/img33.jpg",
        "index": 4,
        "label": "Jaipur Terracotta",
        "tone": "Jaipur Terracotta",
        "hex": "#C67156",
        "family": "Earthy Tones",
        "shadeCode": "BO-1021"
      },
      {
        "id": "var-36",
        "file": "img36.jpg",
        "url": "/storage/same-room-shades/img36.jpg",
        "index": 5,
        "label": "Nilgiri Sage",
        "tone": "Nilgiri Sage",
        "hex": "#7D8C7C",
        "family": "Organic Greens",
        "shadeCode": "BO-1028"
      }
    ]
  },
  {
    "id": "room-2",
    "name": "Serene Master Suite & Bedside Alcove",
    "roomType": "Primary Bedroom Studio",
    "description": "A calming master bedroom suite photographed across delicate morning and evening mood tones, pastels, and acoustic wall hues.",
    "tags": [
      "Bedrooms",
      "Restful Pastels",
      "Tonal Balance",
      "Soft Glow"
    ],
    "variants": [
      {
        "id": "var-46",
        "file": "img46.jpg",
        "url": "/storage/same-room-shades/img46.jpg",
        "index": 1,
        "label": "Cardamom Green",
        "tone": "Cardamom Green",
        "hex": "#9BA37E",
        "family": "Herbal Greens",
        "shadeCode": "BO-1120"
      },
      {
        "id": "var-49",
        "file": "img49.jpg",
        "url": "/storage/same-room-shades/img49.jpg",
        "index": 2,
        "label": "Vintage Pewter",
        "tone": "Vintage Pewter",
        "hex": "#878B94",
        "family": "Urban Greys",
        "shadeCode": "BO-1127"
      },
      {
        "id": "var-52",
        "file": "img52.jpg",
        "url": "/storage/same-room-shades/img52.jpg",
        "index": 3,
        "label": "Midnight Navy",
        "tone": "Midnight Navy",
        "hex": "#212D40",
        "family": "Deep Night",
        "shadeCode": "BO-1134"
      },
      {
        "id": "var-55",
        "file": "img55.jpg",
        "url": "/storage/same-room-shades/img55.jpg",
        "index": 4,
        "label": "Chai Cream",
        "tone": "Chai Cream",
        "hex": "#EDE0CC",
        "family": "Subtle Creams",
        "shadeCode": "BO-1141"
      },
      {
        "id": "var-58",
        "file": "img58.jpg",
        "url": "/storage/same-room-shades/img58.jpg",
        "index": 5,
        "label": "Cinnamon Bark",
        "tone": "Cinnamon Bark",
        "hex": "#8D533C",
        "family": "Rich Woods",
        "shadeCode": "BO-1148"
      },
      {
        "id": "var-61",
        "file": "img61.jpg",
        "url": "/storage/same-room-shades/img61.jpg",
        "index": 6,
        "label": "Sky Cerulean",
        "tone": "Sky Cerulean",
        "hex": "#688EAC",
        "family": "Tranquil Blues",
        "shadeCode": "BO-1155"
      },
      {
        "id": "var-64",
        "file": "img64.jpg",
        "url": "/storage/same-room-shades/img64.jpg",
        "index": 7,
        "label": "Olive Grove",
        "tone": "Olive Grove",
        "hex": "#5A6347",
        "family": "Earthy Greens",
        "shadeCode": "BO-1162"
      },
      {
        "id": "var-67",
        "file": "img67.jpg",
        "url": "/storage/same-room-shades/img67.jpg",
        "index": 8,
        "label": "Sunset Coral",
        "tone": "Sunset Coral",
        "hex": "#D67261",
        "family": "Warm Corals",
        "shadeCode": "BO-1169"
      },
      {
        "id": "var-70",
        "file": "img70.jpg",
        "url": "/storage/same-room-shades/img70.jpg",
        "index": 9,
        "label": "Muted Lavender",
        "tone": "Muted Lavender",
        "hex": "#A89DB1",
        "family": "Gentle Purples",
        "shadeCode": "BO-1176"
      },
      {
        "id": "var-73",
        "file": "img73.jpg",
        "url": "/storage/same-room-shades/img73.jpg",
        "index": 10,
        "label": "Desert Sandstone",
        "tone": "Desert Sandstone",
        "hex": "#C2A382",
        "family": "Natural Earth",
        "shadeCode": "BO-1183"
      }
    ]
  },
  {
    "id": "room-3",
    "name": "Artisan Dining Hall & Evening Salon",
    "roomType": "Dining & Salon Studio",
    "description": "A formal entertaining salon displaying how deep jewel shades, warm terracottas, and earthy neutrals change the intimacy of dining gatherings.",
    "tags": [
      "Entertaining",
      "Jewel Tones",
      "Dramatic Undertones",
      "Dining"
    ],
    "variants": [
      {
        "id": "var-80",
        "file": "img80.jpg",
        "url": "/storage/same-room-shades/img80.jpg",
        "index": 1,
        "label": "Ivory Shimmer",
        "tone": "Ivory Shimmer",
        "hex": "#F9F6EE",
        "family": "Luminous Lights",
        "shadeCode": "BO-1240"
      },
      {
        "id": "var-83",
        "file": "img83.jpg",
        "url": "/storage/same-room-shades/img83.jpg",
        "index": 2,
        "label": "Turquoise Breeze",
        "tone": "Turquoise Breeze",
        "hex": "#5E9B9E",
        "family": "Ocean Hues",
        "shadeCode": "BO-1247"
      },
      {
        "id": "var-86",
        "file": "img86.jpg",
        "url": "/storage/same-room-shades/img86.jpg",
        "index": 3,
        "label": "Roasted Almond",
        "tone": "Roasted Almond",
        "hex": "#A27B5C",
        "family": "Warm Tonal",
        "shadeCode": "BO-1254"
      },
      {
        "id": "var-89",
        "file": "img89.jpg",
        "url": "/storage/same-room-shades/img89.jpg",
        "index": 4,
        "label": "Forest Moss",
        "tone": "Forest Moss",
        "hex": "#485C4B",
        "family": "Botanical Darks",
        "shadeCode": "BO-1261"
      },
      {
        "id": "var-92",
        "file": "img92.jpg",
        "url": "/storage/same-room-shades/img92.jpg",
        "index": 5,
        "label": "Ruby Vermillion",
        "tone": "Ruby Vermillion",
        "hex": "#9E3838",
        "family": "Bold Accents",
        "shadeCode": "BO-1268"
      },
      {
        "id": "var-95",
        "file": "img95.jpg",
        "url": "/storage/same-room-shades/img95.jpg",
        "index": 6,
        "label": "Gilded Amber",
        "tone": "Gilded Amber",
        "hex": "#D1883F",
        "family": "Warm Ochres",
        "shadeCode": "BO-1275"
      },
      {
        "id": "var-98",
        "file": "img98.jpg",
        "url": "/storage/same-room-shades/img98.jpg",
        "index": 7,
        "label": "Himalayan Frost",
        "tone": "Himalayan Frost",
        "hex": "#E3E7EB",
        "family": "Crisp Tones",
        "shadeCode": "BO-1282"
      },
      {
        "id": "var-101",
        "file": "img101.jpg",
        "url": "/storage/same-room-shades/img101.jpg",
        "index": 8,
        "label": "Tuscan Ochre",
        "tone": "Tuscan Ochre",
        "hex": "#B68B40",
        "family": "Heritage Yellows",
        "shadeCode": "BO-1289"
      },
      {
        "id": "var-104",
        "file": "img104.jpg",
        "url": "/storage/same-room-shades/img104.jpg",
        "index": 9,
        "label": "Mulberry Plum",
        "tone": "Mulberry Plum",
        "hex": "#633B48",
        "family": "Royal Deep",
        "shadeCode": "BO-1296"
      },
      {
        "id": "var-107",
        "file": "img107.jpg",
        "url": "/storage/same-room-shades/img107.jpg",
        "index": 10,
        "label": "Morning Dew",
        "tone": "Morning Dew",
        "hex": "#BDD2C1",
        "family": "Fresh Pastels",
        "shadeCode": "BO-1303"
      },
      {
        "id": "var-110",
        "file": "img110.jpg",
        "url": "/storage/same-room-shades/img110.jpg",
        "index": 11,
        "label": "Graphite Shadow",
        "tone": "Graphite Shadow",
        "hex": "#2C3035",
        "family": "Deep Accents",
        "shadeCode": "BO-1310"
      },
      {
        "id": "var-113",
        "file": "img113.jpg",
        "url": "/storage/same-room-shades/img113.jpg",
        "index": 12,
        "label": "Raw Linen",
        "tone": "Raw Linen",
        "hex": "#E2DCD1",
        "family": "Natural Textures",
        "shadeCode": "BO-1317"
      },
      {
        "id": "var-116",
        "file": "img116.jpg",
        "url": "/storage/same-room-shades/img116.jpg",
        "index": 13,
        "label": "Cobalt Horizon",
        "tone": "Cobalt Horizon",
        "hex": "#2A4D69",
        "family": "Bold Indigo",
        "shadeCode": "BO-1324"
      },
      {
        "id": "var-119",
        "file": "img119.jpg",
        "url": "/storage/same-room-shades/img119.jpg",
        "index": 14,
        "label": "Ginger Glaze",
        "tone": "Ginger Glaze",
        "hex": "#AB6846",
        "family": "Spiced Neutrals",
        "shadeCode": "BO-1331"
      },
      {
        "id": "var-122",
        "file": "img122.jpg",
        "url": "/storage/same-room-shades/img122.jpg",
        "index": 15,
        "label": "Silver Eucalyptus",
        "tone": "Silver Eucalyptus",
        "hex": "#8DA399",
        "family": "Refined Greens",
        "shadeCode": "BO-1338"
      },
      {
        "id": "var-125",
        "file": "img125.jpg",
        "url": "/storage/same-room-shades/img125.jpg",
        "index": 16,
        "label": "Autumn Suede",
        "tone": "Autumn Suede",
        "hex": "#9E6D52",
        "family": "Warm Earth",
        "shadeCode": "BO-1345"
      },
      {
        "id": "var-128",
        "file": "img128.jpg",
        "url": "/storage/same-room-shades/img128.jpg",
        "index": 17,
        "label": "Velvet Indigo",
        "tone": "Velvet Indigo",
        "hex": "#1E2C3D",
        "family": "Midnight Tones",
        "shadeCode": "BO-1352"
      },
      {
        "id": "var-131",
        "file": "img131.jpg",
        "url": "/storage/same-room-shades/img131.jpg",
        "index": 18,
        "label": "Champagne Pearl",
        "tone": "Champagne Pearl",
        "hex": "#F0E7D8",
        "family": "Luxe Neutrals",
        "shadeCode": "BO-1359"
      },
      {
        "id": "var-134",
        "file": "img134.jpg",
        "url": "/storage/same-room-shades/img134.jpg",
        "index": 19,
        "label": "Copper Rust",
        "tone": "Copper Rust",
        "hex": "#A6533A",
        "family": "Patina Hues",
        "shadeCode": "BO-1366"
      },
      {
        "id": "var-137",
        "file": "img137.jpg",
        "url": "/storage/same-room-shades/img137.jpg",
        "index": 20,
        "label": "Pistachio Creme",
        "tone": "Pistachio Creme",
        "hex": "#C5D6BA",
        "family": "Soft Greens",
        "shadeCode": "BO-1373"
      }
    ]
  },
  {
    "id": "room-4",
    "name": "Contemporary Chef Kitchen & Breakfast Island",
    "roomType": "Culinary Space Studio",
    "description": "Clean geometry and marble worktops matched across clean whites, modern botanical greens, slate greys, and warm ochres.",
    "tags": [
      "Kitchen & Dining",
      "Clean Geometry",
      "Washable Sheen",
      "Modern Lines"
    ],
    "variants": [
      {
        "id": "var-144",
        "file": "img144.jpg",
        "url": "/storage/same-room-shades/img144.jpg",
        "index": 1,
        "label": "Raw Linen",
        "tone": "Raw Linen",
        "hex": "#E2DCD1",
        "family": "Natural Textures",
        "shadeCode": "BO-1360"
      },
      {
        "id": "var-147",
        "file": "img147.jpg",
        "url": "/storage/same-room-shades/img147.jpg",
        "index": 2,
        "label": "Cobalt Horizon",
        "tone": "Cobalt Horizon",
        "hex": "#2A4D69",
        "family": "Bold Indigo",
        "shadeCode": "BO-1367"
      },
      {
        "id": "var-150",
        "file": "img150.jpg",
        "url": "/storage/same-room-shades/img150.jpg",
        "index": 3,
        "label": "Ginger Glaze",
        "tone": "Ginger Glaze",
        "hex": "#AB6846",
        "family": "Spiced Neutrals",
        "shadeCode": "BO-1374"
      },
      {
        "id": "var-153",
        "file": "img153.jpg",
        "url": "/storage/same-room-shades/img153.jpg",
        "index": 4,
        "label": "Silver Eucalyptus",
        "tone": "Silver Eucalyptus",
        "hex": "#8DA399",
        "family": "Refined Greens",
        "shadeCode": "BO-1381"
      }
    ]
  },
  {
    "id": "room-5",
    "name": "Executive Workspace & Reading Library",
    "roomType": "Study & Library Studio",
    "description": "An expansive library study series with tonal transformations from contemplative sage greens and deep indigos to luminous sandstones.",
    "tags": [
      "Library & Study",
      "Focus & Elegance",
      "Curated Tones"
    ],
    "variants": [
      {
        "id": "var-159",
        "file": "img159.jpg",
        "url": "/storage/same-room-shades/img159.jpg",
        "index": 1,
        "label": "Azure Tide",
        "tone": "Azure Tide",
        "hex": "#4A7B9D",
        "family": "Coastal Tones",
        "shadeCode": "BO-1480"
      },
      {
        "id": "var-162",
        "file": "img162.jpg",
        "url": "/storage/same-room-shades/img162.jpg",
        "index": 2,
        "label": "Pecan Walnut",
        "tone": "Pecan Walnut",
        "hex": "#7A5C43",
        "family": "Woodlands",
        "shadeCode": "BO-1487"
      },
      {
        "id": "var-165",
        "file": "img165.jpg",
        "url": "/storage/same-room-shades/img165.jpg",
        "index": 3,
        "label": "Porcelain White",
        "tone": "Porcelain White",
        "hex": "#F6F6F4",
        "family": "Pristine Whites",
        "shadeCode": "BO-1494"
      },
      {
        "id": "var-168",
        "file": "img168.jpg",
        "url": "/storage/same-room-shades/img168.jpg",
        "index": 4,
        "label": "Kashmir Lavender",
        "tone": "Kashmir Lavender",
        "hex": "#8E7C93",
        "family": "Regal Tones",
        "shadeCode": "BO-1501"
      },
      {
        "id": "var-171",
        "file": "img171.jpg",
        "url": "/storage/same-room-shades/img171.jpg",
        "index": 5,
        "label": "Brass Ochre",
        "tone": "Brass Ochre",
        "hex": "#A87D3B",
        "family": "Warm Metals",
        "shadeCode": "BO-1508"
      },
      {
        "id": "var-174",
        "file": "img174.jpg",
        "url": "/storage/same-room-shades/img174.jpg",
        "index": 6,
        "label": "Deep Spruce",
        "tone": "Deep Spruce",
        "hex": "#2D4438",
        "family": "Dark Evergreens",
        "shadeCode": "BO-1515"
      },
      {
        "id": "var-177",
        "file": "img177.jpg",
        "url": "/storage/same-room-shades/img177.jpg",
        "index": 7,
        "label": "Almond Biscotti",
        "tone": "Almond Biscotti",
        "hex": "#D8C3A5",
        "family": "Creamy Neutrals",
        "shadeCode": "BO-1522"
      },
      {
        "id": "var-180",
        "file": "img180.jpg",
        "url": "/storage/same-room-shades/img180.jpg",
        "index": 8,
        "label": "Granite Peak",
        "tone": "Granite Peak",
        "hex": "#60646D",
        "family": "Stone & Rock",
        "shadeCode": "BO-1529"
      },
      {
        "id": "var-183",
        "file": "img183.jpg",
        "url": "/storage/same-room-shades/img183.jpg",
        "index": 9,
        "label": "Apricot Sunset",
        "tone": "Apricot Sunset",
        "hex": "#E08E6D",
        "family": "Golden Hour",
        "shadeCode": "BO-1536"
      },
      {
        "id": "var-186",
        "file": "img186.jpg",
        "url": "/storage/same-room-shades/img186.jpg",
        "index": 10,
        "label": "Nephrite Jade",
        "tone": "Nephrite Jade",
        "hex": "#547A65",
        "family": "Precious Stones",
        "shadeCode": "BO-1543"
      },
      {
        "id": "var-189",
        "file": "img189.jpg",
        "url": "/storage/same-room-shades/img189.jpg",
        "index": 11,
        "label": "Vintage Port",
        "tone": "Vintage Port",
        "hex": "#562C38",
        "family": "Burgundy Tones",
        "shadeCode": "BO-1550"
      },
      {
        "id": "var-192",
        "file": "img192.jpg",
        "url": "/storage/same-room-shades/img192.jpg",
        "index": 12,
        "label": "Polar Cloud",
        "tone": "Polar Cloud",
        "hex": "#EAEFF2",
        "family": "Ethereal Tones",
        "shadeCode": "BO-1557"
      },
      {
        "id": "var-195",
        "file": "img195.jpg",
        "url": "/storage/same-room-shades/img195.jpg",
        "index": 13,
        "label": "Pure Alabaster",
        "tone": "Pure Alabaster",
        "hex": "#F4F1EA",
        "family": "Whites & Off-Whites",
        "shadeCode": "BO-1564"
      },
      {
        "id": "var-198",
        "file": "img198.jpg",
        "url": "/storage/same-room-shades/img198.jpg",
        "index": 14,
        "label": "Warm Cashmere",
        "tone": "Warm Cashmere",
        "hex": "#E6DDD1",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1571"
      },
      {
        "id": "var-203",
        "file": "img203.jpg",
        "url": "/storage/same-room-shades/img203.jpg",
        "index": 15,
        "label": "Monsoon Mist",
        "tone": "Monsoon Mist",
        "hex": "#D1D8DB",
        "family": "Cool Greys",
        "shadeCode": "BO-1578"
      },
      {
        "id": "var-206",
        "file": "img206.jpg",
        "url": "/storage/same-room-shades/img206.jpg",
        "index": 16,
        "label": "Jaipur Terracotta",
        "tone": "Jaipur Terracotta",
        "hex": "#C67156",
        "family": "Earthy Tones",
        "shadeCode": "BO-1585"
      },
      {
        "id": "var-209",
        "file": "img209.jpg",
        "url": "/storage/same-room-shades/img209.jpg",
        "index": 17,
        "label": "Nilgiri Sage",
        "tone": "Nilgiri Sage",
        "hex": "#7D8C7C",
        "family": "Organic Greens",
        "shadeCode": "BO-1592"
      },
      {
        "id": "var-212",
        "file": "img212.jpg",
        "url": "/storage/same-room-shades/img212.jpg",
        "index": 18,
        "label": "Royal Udaipur Blue",
        "tone": "Royal Udaipur Blue",
        "hex": "#3B536B",
        "family": "Classic Blues",
        "shadeCode": "BO-1599"
      },
      {
        "id": "var-215",
        "file": "img215.jpg",
        "url": "/storage/same-room-shades/img215.jpg",
        "index": 19,
        "label": "Golden Marigold",
        "tone": "Golden Marigold",
        "hex": "#DC9B45",
        "family": "Vibrant Yellows",
        "shadeCode": "BO-1606"
      },
      {
        "id": "var-218",
        "file": "img218.jpg",
        "url": "/storage/same-room-shades/img218.jpg",
        "index": 20,
        "label": "Smoky Charcoal",
        "tone": "Smoky Charcoal",
        "hex": "#3E424B",
        "family": "Modern Darks",
        "shadeCode": "BO-1613"
      },
      {
        "id": "var-221",
        "file": "img221.jpg",
        "url": "/storage/same-room-shades/img221.jpg",
        "index": 21,
        "label": "Silk Lotus Pink",
        "tone": "Silk Lotus Pink",
        "hex": "#D9A5A9",
        "family": "Soft Pastels",
        "shadeCode": "BO-1620"
      },
      {
        "id": "var-224",
        "file": "img224.jpg",
        "url": "/storage/same-room-shades/img224.jpg",
        "index": 22,
        "label": "Spice Saffron",
        "tone": "Spice Saffron",
        "hex": "#B85D38",
        "family": "Heritage Warmth",
        "shadeCode": "BO-1627"
      },
      {
        "id": "var-227",
        "file": "img227.jpg",
        "url": "/storage/same-room-shades/img227.jpg",
        "index": 23,
        "label": "Coastal Dune",
        "tone": "Coastal Dune",
        "hex": "#D9CAB6",
        "family": "Sand & Beige",
        "shadeCode": "BO-1634"
      },
      {
        "id": "var-230",
        "file": "img230.jpg",
        "url": "/storage/same-room-shades/img230.jpg",
        "index": 24,
        "label": "Cardamom Green",
        "tone": "Cardamom Green",
        "hex": "#9BA37E",
        "family": "Herbal Greens",
        "shadeCode": "BO-1641"
      },
      {
        "id": "var-233",
        "file": "img233.jpg",
        "url": "/storage/same-room-shades/img233.jpg",
        "index": 25,
        "label": "Vintage Pewter",
        "tone": "Vintage Pewter",
        "hex": "#878B94",
        "family": "Urban Greys",
        "shadeCode": "BO-1648"
      },
      {
        "id": "var-236",
        "file": "img236.jpg",
        "url": "/storage/same-room-shades/img236.jpg",
        "index": 26,
        "label": "Midnight Navy",
        "tone": "Midnight Navy",
        "hex": "#212D40",
        "family": "Deep Night",
        "shadeCode": "BO-1655"
      },
      {
        "id": "var-239",
        "file": "img239.jpg",
        "url": "/storage/same-room-shades/img239.jpg",
        "index": 27,
        "label": "Chai Cream",
        "tone": "Chai Cream",
        "hex": "#EDE0CC",
        "family": "Subtle Creams",
        "shadeCode": "BO-1662"
      },
      {
        "id": "var-242",
        "file": "img242.jpg",
        "url": "/storage/same-room-shades/img242.jpg",
        "index": 28,
        "label": "Cinnamon Bark",
        "tone": "Cinnamon Bark",
        "hex": "#8D533C",
        "family": "Rich Woods",
        "shadeCode": "BO-1669"
      },
      {
        "id": "var-245",
        "file": "img245.jpg",
        "url": "/storage/same-room-shades/img245.jpg",
        "index": 29,
        "label": "Sky Cerulean",
        "tone": "Sky Cerulean",
        "hex": "#688EAC",
        "family": "Tranquil Blues",
        "shadeCode": "BO-1676"
      },
      {
        "id": "var-248",
        "file": "img248.jpg",
        "url": "/storage/same-room-shades/img248.jpg",
        "index": 30,
        "label": "Olive Grove",
        "tone": "Olive Grove",
        "hex": "#5A6347",
        "family": "Earthy Greens",
        "shadeCode": "BO-1683"
      },
      {
        "id": "var-251",
        "file": "img251.jpg",
        "url": "/storage/same-room-shades/img251.jpg",
        "index": 31,
        "label": "Sunset Coral",
        "tone": "Sunset Coral",
        "hex": "#D67261",
        "family": "Warm Corals",
        "shadeCode": "BO-1690"
      },
      {
        "id": "var-254",
        "file": "img254.jpg",
        "url": "/storage/same-room-shades/img254.jpg",
        "index": 32,
        "label": "Muted Lavender",
        "tone": "Muted Lavender",
        "hex": "#A89DB1",
        "family": "Gentle Purples",
        "shadeCode": "BO-1697"
      },
      {
        "id": "var-259",
        "file": "img259.jpg",
        "url": "/storage/same-room-shades/img259.jpg",
        "index": 33,
        "label": "Desert Sandstone",
        "tone": "Desert Sandstone",
        "hex": "#C2A382",
        "family": "Natural Earth",
        "shadeCode": "BO-1704"
      },
      {
        "id": "var-262",
        "file": "img262.jpg",
        "url": "/storage/same-room-shades/img262.jpg",
        "index": 34,
        "label": "Nordic Slate",
        "tone": "Nordic Slate",
        "hex": "#4F5E68",
        "family": "Architectural Greys",
        "shadeCode": "BO-1711"
      },
      {
        "id": "var-265",
        "file": "img265.jpg",
        "url": "/storage/same-room-shades/img265.jpg",
        "index": 35,
        "label": "Ivory Shimmer",
        "tone": "Ivory Shimmer",
        "hex": "#F9F6EE",
        "family": "Luminous Lights",
        "shadeCode": "BO-1718"
      },
      {
        "id": "var-268",
        "file": "img268.jpg",
        "url": "/storage/same-room-shades/img268.jpg",
        "index": 36,
        "label": "Turquoise Breeze",
        "tone": "Turquoise Breeze",
        "hex": "#5E9B9E",
        "family": "Ocean Hues",
        "shadeCode": "BO-1725"
      },
      {
        "id": "var-271",
        "file": "img271.jpg",
        "url": "/storage/same-room-shades/img271.jpg",
        "index": 37,
        "label": "Roasted Almond",
        "tone": "Roasted Almond",
        "hex": "#A27B5C",
        "family": "Warm Tonal",
        "shadeCode": "BO-1732"
      },
      {
        "id": "var-274",
        "file": "img274.jpg",
        "url": "/storage/same-room-shades/img274.jpg",
        "index": 38,
        "label": "Forest Moss",
        "tone": "Forest Moss",
        "hex": "#485C4B",
        "family": "Botanical Darks",
        "shadeCode": "BO-1739"
      },
      {
        "id": "var-277",
        "file": "img277.jpg",
        "url": "/storage/same-room-shades/img277.jpg",
        "index": 39,
        "label": "Ruby Vermillion",
        "tone": "Ruby Vermillion",
        "hex": "#9E3838",
        "family": "Bold Accents",
        "shadeCode": "BO-1746"
      },
      {
        "id": "var-280",
        "file": "img280.jpg",
        "url": "/storage/same-room-shades/img280.jpg",
        "index": 40,
        "label": "Gilded Amber",
        "tone": "Gilded Amber",
        "hex": "#D1883F",
        "family": "Warm Ochres",
        "shadeCode": "BO-1753"
      },
      {
        "id": "var-284",
        "file": "img284.jpg",
        "url": "/storage/same-room-shades/img284.jpg",
        "index": 41,
        "label": "Himalayan Frost",
        "tone": "Himalayan Frost",
        "hex": "#E3E7EB",
        "family": "Crisp Tones",
        "shadeCode": "BO-1760"
      }
    ]
  },
  {
    "id": "room-6",
    "name": "Grand Architectural Gallery & Interior Pavilion",
    "roomType": "Master Gallery Studio",
    "description": "Our most comprehensive architectural study featuring distinct Birla Opus shade formulations applied to high-ceiling walls and archways.",
    "tags": [
      "Master Showcase",
      "Full Palette Spectrum",
      "Architectural"
    ],
    "variants": [
      {
        "id": "var-302",
        "file": "img302.jpg",
        "url": "/storage/same-room-shades/img302.jpg",
        "index": 1,
        "label": "Polar Cloud",
        "tone": "Polar Cloud",
        "hex": "#EAEFF2",
        "family": "Ethereal Tones",
        "shadeCode": "BO-1600"
      },
      {
        "id": "var-305",
        "file": "img305.jpg",
        "url": "/storage/same-room-shades/img305.jpg",
        "index": 2,
        "label": "Pure Alabaster",
        "tone": "Pure Alabaster",
        "hex": "#F4F1EA",
        "family": "Whites & Off-Whites",
        "shadeCode": "BO-1607"
      },
      {
        "id": "var-308",
        "file": "img308.jpg",
        "url": "/storage/same-room-shades/img308.jpg",
        "index": 3,
        "label": "Warm Cashmere",
        "tone": "Warm Cashmere",
        "hex": "#E6DDD1",
        "family": "Warm Neutrals",
        "shadeCode": "BO-1614"
      },
      {
        "id": "var-311",
        "file": "img311.jpg",
        "url": "/storage/same-room-shades/img311.jpg",
        "index": 4,
        "label": "Monsoon Mist",
        "tone": "Monsoon Mist",
        "hex": "#D1D8DB",
        "family": "Cool Greys",
        "shadeCode": "BO-1621"
      },
      {
        "id": "var-314",
        "file": "img314.jpg",
        "url": "/storage/same-room-shades/img314.jpg",
        "index": 5,
        "label": "Jaipur Terracotta",
        "tone": "Jaipur Terracotta",
        "hex": "#C67156",
        "family": "Earthy Tones",
        "shadeCode": "BO-1628"
      },
      {
        "id": "var-317",
        "file": "img317.jpg",
        "url": "/storage/same-room-shades/img317.jpg",
        "index": 6,
        "label": "Nilgiri Sage",
        "tone": "Nilgiri Sage",
        "hex": "#7D8C7C",
        "family": "Organic Greens",
        "shadeCode": "BO-1635"
      },
      {
        "id": "var-320",
        "file": "img320.jpg",
        "url": "/storage/same-room-shades/img320.jpg",
        "index": 7,
        "label": "Royal Udaipur Blue",
        "tone": "Royal Udaipur Blue",
        "hex": "#3B536B",
        "family": "Classic Blues",
        "shadeCode": "BO-1642"
      },
      {
        "id": "var-323",
        "file": "img323.jpg",
        "url": "/storage/same-room-shades/img323.jpg",
        "index": 8,
        "label": "Golden Marigold",
        "tone": "Golden Marigold",
        "hex": "#DC9B45",
        "family": "Vibrant Yellows",
        "shadeCode": "BO-1649"
      },
      {
        "id": "var-326",
        "file": "img326.jpg",
        "url": "/storage/same-room-shades/img326.jpg",
        "index": 9,
        "label": "Smoky Charcoal",
        "tone": "Smoky Charcoal",
        "hex": "#3E424B",
        "family": "Modern Darks",
        "shadeCode": "BO-1656"
      },
      {
        "id": "var-329",
        "file": "img329.jpg",
        "url": "/storage/same-room-shades/img329.jpg",
        "index": 10,
        "label": "Silk Lotus Pink",
        "tone": "Silk Lotus Pink",
        "hex": "#D9A5A9",
        "family": "Soft Pastels",
        "shadeCode": "BO-1663"
      },
      {
        "id": "var-332",
        "file": "img332.jpg",
        "url": "/storage/same-room-shades/img332.jpg",
        "index": 11,
        "label": "Spice Saffron",
        "tone": "Spice Saffron",
        "hex": "#B85D38",
        "family": "Heritage Warmth",
        "shadeCode": "BO-1670"
      },
      {
        "id": "var-335",
        "file": "img335.jpg",
        "url": "/storage/same-room-shades/img335.jpg",
        "index": 12,
        "label": "Coastal Dune",
        "tone": "Coastal Dune",
        "hex": "#D9CAB6",
        "family": "Sand & Beige",
        "shadeCode": "BO-1677"
      },
      {
        "id": "var-338",
        "file": "img338.jpg",
        "url": "/storage/same-room-shades/img338.jpg",
        "index": 13,
        "label": "Cardamom Green",
        "tone": "Cardamom Green",
        "hex": "#9BA37E",
        "family": "Herbal Greens",
        "shadeCode": "BO-1684"
      },
      {
        "id": "var-341",
        "file": "img341.jpg",
        "url": "/storage/same-room-shades/img341.jpg",
        "index": 14,
        "label": "Vintage Pewter",
        "tone": "Vintage Pewter",
        "hex": "#878B94",
        "family": "Urban Greys",
        "shadeCode": "BO-1691"
      },
      {
        "id": "var-344",
        "file": "img344.jpg",
        "url": "/storage/same-room-shades/img344.jpg",
        "index": 15,
        "label": "Midnight Navy",
        "tone": "Midnight Navy",
        "hex": "#212D40",
        "family": "Deep Night",
        "shadeCode": "BO-1698"
      },
      {
        "id": "var-347",
        "file": "img347.jpg",
        "url": "/storage/same-room-shades/img347.jpg",
        "index": 16,
        "label": "Chai Cream",
        "tone": "Chai Cream",
        "hex": "#EDE0CC",
        "family": "Subtle Creams",
        "shadeCode": "BO-1705"
      },
      {
        "id": "var-350",
        "file": "img350.jpg",
        "url": "/storage/same-room-shades/img350.jpg",
        "index": 17,
        "label": "Cinnamon Bark",
        "tone": "Cinnamon Bark",
        "hex": "#8D533C",
        "family": "Rich Woods",
        "shadeCode": "BO-1712"
      },
      {
        "id": "var-353",
        "file": "img353.jpg",
        "url": "/storage/same-room-shades/img353.jpg",
        "index": 18,
        "label": "Sky Cerulean",
        "tone": "Sky Cerulean",
        "hex": "#688EAC",
        "family": "Tranquil Blues",
        "shadeCode": "BO-1719"
      },
      {
        "id": "var-356",
        "file": "img356.jpg",
        "url": "/storage/same-room-shades/img356.jpg",
        "index": 19,
        "label": "Olive Grove",
        "tone": "Olive Grove",
        "hex": "#5A6347",
        "family": "Earthy Greens",
        "shadeCode": "BO-1726"
      },
      {
        "id": "var-359",
        "file": "img359.jpg",
        "url": "/storage/same-room-shades/img359.jpg",
        "index": 20,
        "label": "Sunset Coral",
        "tone": "Sunset Coral",
        "hex": "#D67261",
        "family": "Warm Corals",
        "shadeCode": "BO-1733"
      },
      {
        "id": "var-362",
        "file": "img362.jpg",
        "url": "/storage/same-room-shades/img362.jpg",
        "index": 21,
        "label": "Muted Lavender",
        "tone": "Muted Lavender",
        "hex": "#A89DB1",
        "family": "Gentle Purples",
        "shadeCode": "BO-1740"
      },
      {
        "id": "var-365",
        "file": "img365.jpg",
        "url": "/storage/same-room-shades/img365.jpg",
        "index": 22,
        "label": "Desert Sandstone",
        "tone": "Desert Sandstone",
        "hex": "#C2A382",
        "family": "Natural Earth",
        "shadeCode": "BO-1747"
      },
      {
        "id": "var-368",
        "file": "img368.jpg",
        "url": "/storage/same-room-shades/img368.jpg",
        "index": 23,
        "label": "Nordic Slate",
        "tone": "Nordic Slate",
        "hex": "#4F5E68",
        "family": "Architectural Greys",
        "shadeCode": "BO-1754"
      },
      {
        "id": "var-371",
        "file": "img371.jpg",
        "url": "/storage/same-room-shades/img371.jpg",
        "index": 24,
        "label": "Ivory Shimmer",
        "tone": "Ivory Shimmer",
        "hex": "#F9F6EE",
        "family": "Luminous Lights",
        "shadeCode": "BO-1761"
      },
      {
        "id": "var-374",
        "file": "img374.jpg",
        "url": "/storage/same-room-shades/img374.jpg",
        "index": 25,
        "label": "Turquoise Breeze",
        "tone": "Turquoise Breeze",
        "hex": "#5E9B9E",
        "family": "Ocean Hues",
        "shadeCode": "BO-1768"
      },
      {
        "id": "var-377",
        "file": "img377.jpg",
        "url": "/storage/same-room-shades/img377.jpg",
        "index": 26,
        "label": "Roasted Almond",
        "tone": "Roasted Almond",
        "hex": "#A27B5C",
        "family": "Warm Tonal",
        "shadeCode": "BO-1775"
      },
      {
        "id": "var-380",
        "file": "img380.jpg",
        "url": "/storage/same-room-shades/img380.jpg",
        "index": 27,
        "label": "Forest Moss",
        "tone": "Forest Moss",
        "hex": "#485C4B",
        "family": "Botanical Darks",
        "shadeCode": "BO-1782"
      },
      {
        "id": "var-383",
        "file": "img383.jpg",
        "url": "/storage/same-room-shades/img383.jpg",
        "index": 28,
        "label": "Ruby Vermillion",
        "tone": "Ruby Vermillion",
        "hex": "#9E3838",
        "family": "Bold Accents",
        "shadeCode": "BO-1789"
      },
      {
        "id": "var-386",
        "file": "img386.jpg",
        "url": "/storage/same-room-shades/img386.jpg",
        "index": 29,
        "label": "Gilded Amber",
        "tone": "Gilded Amber",
        "hex": "#D1883F",
        "family": "Warm Ochres",
        "shadeCode": "BO-1796"
      },
      {
        "id": "var-389",
        "file": "img389.jpg",
        "url": "/storage/same-room-shades/img389.jpg",
        "index": 30,
        "label": "Himalayan Frost",
        "tone": "Himalayan Frost",
        "hex": "#E3E7EB",
        "family": "Crisp Tones",
        "shadeCode": "BO-1803"
      },
      {
        "id": "var-392",
        "file": "img392.jpg",
        "url": "/storage/same-room-shades/img392.jpg",
        "index": 31,
        "label": "Tuscan Ochre",
        "tone": "Tuscan Ochre",
        "hex": "#B68B40",
        "family": "Heritage Yellows",
        "shadeCode": "BO-1810"
      },
      {
        "id": "var-395",
        "file": "img395.jpg",
        "url": "/storage/same-room-shades/img395.jpg",
        "index": 32,
        "label": "Mulberry Plum",
        "tone": "Mulberry Plum",
        "hex": "#633B48",
        "family": "Royal Deep",
        "shadeCode": "BO-1817"
      },
      {
        "id": "var-398",
        "file": "img398.jpg",
        "url": "/storage/same-room-shades/img398.jpg",
        "index": 33,
        "label": "Morning Dew",
        "tone": "Morning Dew",
        "hex": "#BDD2C1",
        "family": "Fresh Pastels",
        "shadeCode": "BO-1824"
      },
      {
        "id": "var-401",
        "file": "img401.jpg",
        "url": "/storage/same-room-shades/img401.jpg",
        "index": 34,
        "label": "Graphite Shadow",
        "tone": "Graphite Shadow",
        "hex": "#2C3035",
        "family": "Deep Accents",
        "shadeCode": "BO-1831"
      },
      {
        "id": "var-404",
        "file": "img404.jpg",
        "url": "/storage/same-room-shades/img404.jpg",
        "index": 35,
        "label": "Raw Linen",
        "tone": "Raw Linen",
        "hex": "#E2DCD1",
        "family": "Natural Textures",
        "shadeCode": "BO-1838"
      },
      {
        "id": "var-407",
        "file": "img407.jpg",
        "url": "/storage/same-room-shades/img407.jpg",
        "index": 36,
        "label": "Cobalt Horizon",
        "tone": "Cobalt Horizon",
        "hex": "#2A4D69",
        "family": "Bold Indigo",
        "shadeCode": "BO-1845"
      },
      {
        "id": "var-410",
        "file": "img410.jpg",
        "url": "/storage/same-room-shades/img410.jpg",
        "index": 37,
        "label": "Ginger Glaze",
        "tone": "Ginger Glaze",
        "hex": "#AB6846",
        "family": "Spiced Neutrals",
        "shadeCode": "BO-1852"
      },
      {
        "id": "var-413",
        "file": "img413.jpg",
        "url": "/storage/same-room-shades/img413.jpg",
        "index": 38,
        "label": "Silver Eucalyptus",
        "tone": "Silver Eucalyptus",
        "hex": "#8DA399",
        "family": "Refined Greens",
        "shadeCode": "BO-1859"
      },
      {
        "id": "var-416",
        "file": "img416.jpg",
        "url": "/storage/same-room-shades/img416.jpg",
        "index": 39,
        "label": "Autumn Suede",
        "tone": "Autumn Suede",
        "hex": "#9E6D52",
        "family": "Warm Earth",
        "shadeCode": "BO-1866"
      },
      {
        "id": "var-419",
        "file": "img419.jpg",
        "url": "/storage/same-room-shades/img419.jpg",
        "index": 40,
        "label": "Velvet Indigo",
        "tone": "Velvet Indigo",
        "hex": "#1E2C3D",
        "family": "Midnight Tones",
        "shadeCode": "BO-1873"
      },
      {
        "id": "var-422",
        "file": "img422.jpg",
        "url": "/storage/same-room-shades/img422.jpg",
        "index": 41,
        "label": "Champagne Pearl",
        "tone": "Champagne Pearl",
        "hex": "#F0E7D8",
        "family": "Luxe Neutrals",
        "shadeCode": "BO-1880"
      },
      {
        "id": "var-425",
        "file": "img425.jpg",
        "url": "/storage/same-room-shades/img425.jpg",
        "index": 42,
        "label": "Copper Rust",
        "tone": "Copper Rust",
        "hex": "#A6533A",
        "family": "Patina Hues",
        "shadeCode": "BO-1887"
      },
      {
        "id": "var-428",
        "file": "img428.jpg",
        "url": "/storage/same-room-shades/img428.jpg",
        "index": 43,
        "label": "Pistachio Creme",
        "tone": "Pistachio Creme",
        "hex": "#C5D6BA",
        "family": "Soft Greens",
        "shadeCode": "BO-1894"
      },
      {
        "id": "var-431",
        "file": "img431.jpg",
        "url": "/storage/same-room-shades/img431.jpg",
        "index": 44,
        "label": "Twilight Iris",
        "tone": "Twilight Iris",
        "hex": "#6D6E8A",
        "family": "Dusk Shades",
        "shadeCode": "BO-1901"
      },
      {
        "id": "var-434",
        "file": "img434.jpg",
        "url": "/storage/same-room-shades/img434.jpg",
        "index": 45,
        "label": "Burnt Umber",
        "tone": "Burnt Umber",
        "hex": "#5D3F37",
        "family": "Deep Earth",
        "shadeCode": "BO-1908"
      },
      {
        "id": "var-437",
        "file": "img437.jpg",
        "url": "/storage/same-room-shades/img437.jpg",
        "index": 46,
        "label": "Azure Tide",
        "tone": "Azure Tide",
        "hex": "#4A7B9D",
        "family": "Coastal Tones",
        "shadeCode": "BO-1915"
      },
      {
        "id": "var-440",
        "file": "img440.jpg",
        "url": "/storage/same-room-shades/img440.jpg",
        "index": 47,
        "label": "Pecan Walnut",
        "tone": "Pecan Walnut",
        "hex": "#7A5C43",
        "family": "Woodlands",
        "shadeCode": "BO-1922"
      },
      {
        "id": "var-443",
        "file": "img443.jpg",
        "url": "/storage/same-room-shades/img443.jpg",
        "index": 48,
        "label": "Porcelain White",
        "tone": "Porcelain White",
        "hex": "#F6F6F4",
        "family": "Pristine Whites",
        "shadeCode": "BO-1929"
      },
      {
        "id": "var-446",
        "file": "img446.jpg",
        "url": "/storage/same-room-shades/img446.jpg",
        "index": 49,
        "label": "Kashmir Lavender",
        "tone": "Kashmir Lavender",
        "hex": "#8E7C93",
        "family": "Regal Tones",
        "shadeCode": "BO-1936"
      },
      {
        "id": "var-449",
        "file": "img449.jpg",
        "url": "/storage/same-room-shades/img449.jpg",
        "index": 50,
        "label": "Brass Ochre",
        "tone": "Brass Ochre",
        "hex": "#A87D3B",
        "family": "Warm Metals",
        "shadeCode": "BO-1943"
      },
      {
        "id": "var-452",
        "file": "img452.jpg",
        "url": "/storage/same-room-shades/img452.jpg",
        "index": 51,
        "label": "Deep Spruce",
        "tone": "Deep Spruce",
        "hex": "#2D4438",
        "family": "Dark Evergreens",
        "shadeCode": "BO-1950"
      },
      {
        "id": "var-455",
        "file": "img455.jpg",
        "url": "/storage/same-room-shades/img455.jpg",
        "index": 52,
        "label": "Almond Biscotti",
        "tone": "Almond Biscotti",
        "hex": "#D8C3A5",
        "family": "Creamy Neutrals",
        "shadeCode": "BO-1957"
      },
      {
        "id": "var-460",
        "file": "img460.jpg",
        "url": "/storage/same-room-shades/img460.jpg",
        "index": 53,
        "label": "Granite Peak",
        "tone": "Granite Peak",
        "hex": "#60646D",
        "family": "Stone & Rock",
        "shadeCode": "BO-1964"
      },
      {
        "id": "var-463",
        "file": "img463.jpg",
        "url": "/storage/same-room-shades/img463.jpg",
        "index": 54,
        "label": "Apricot Sunset",
        "tone": "Apricot Sunset",
        "hex": "#E08E6D",
        "family": "Golden Hour",
        "shadeCode": "BO-1971"
      },
      {
        "id": "var-466",
        "file": "img466.jpg",
        "url": "/storage/same-room-shades/img466.jpg",
        "index": 55,
        "label": "Nephrite Jade",
        "tone": "Nephrite Jade",
        "hex": "#547A65",
        "family": "Precious Stones",
        "shadeCode": "BO-1978"
      },
      {
        "id": "var-469",
        "file": "img469.jpg",
        "url": "/storage/same-room-shades/img469.jpg",
        "index": 56,
        "label": "Vintage Port",
        "tone": "Vintage Port",
        "hex": "#562C38",
        "family": "Burgundy Tones",
        "shadeCode": "BO-1985"
      },
      {
        "id": "var-472",
        "file": "img472.jpg",
        "url": "/storage/same-room-shades/img472.jpg",
        "index": 57,
        "label": "Polar Cloud",
        "tone": "Polar Cloud",
        "hex": "#EAEFF2",
        "family": "Ethereal Tones",
        "shadeCode": "BO-1992"
      },
      {
        "id": "var-475",
        "file": "img475.jpg",
        "url": "/storage/same-room-shades/img475.jpg",
        "index": 58,
        "label": "Pure Alabaster",
        "tone": "Pure Alabaster",
        "hex": "#F4F1EA",
        "family": "Whites & Off-Whites",
        "shadeCode": "BO-1999"
      },
      {
        "id": "var-478",
        "file": "img478.jpg",
        "url": "/storage/same-room-shades/img478.jpg",
        "index": 59,
        "label": "Warm Cashmere",
        "tone": "Warm Cashmere",
        "hex": "#E6DDD1",
        "family": "Warm Neutrals",
        "shadeCode": "BO-2006"
      },
      {
        "id": "var-481",
        "file": "img481.jpg",
        "url": "/storage/same-room-shades/img481.jpg",
        "index": 60,
        "label": "Monsoon Mist",
        "tone": "Monsoon Mist",
        "hex": "#D1D8DB",
        "family": "Cool Greys",
        "shadeCode": "BO-2013"
      },
      {
        "id": "var-484",
        "file": "img484.jpg",
        "url": "/storage/same-room-shades/img484.jpg",
        "index": 61,
        "label": "Jaipur Terracotta",
        "tone": "Jaipur Terracotta",
        "hex": "#C67156",
        "family": "Earthy Tones",
        "shadeCode": "BO-2020"
      },
      {
        "id": "var-487",
        "file": "img487.jpg",
        "url": "/storage/same-room-shades/img487.jpg",
        "index": 62,
        "label": "Nilgiri Sage",
        "tone": "Nilgiri Sage",
        "hex": "#7D8C7C",
        "family": "Organic Greens",
        "shadeCode": "BO-2027"
      },
      {
        "id": "var-490",
        "file": "img490.jpg",
        "url": "/storage/same-room-shades/img490.jpg",
        "index": 63,
        "label": "Royal Udaipur Blue",
        "tone": "Royal Udaipur Blue",
        "hex": "#3B536B",
        "family": "Classic Blues",
        "shadeCode": "BO-2034"
      },
      {
        "id": "var-493",
        "file": "img493.jpg",
        "url": "/storage/same-room-shades/img493.jpg",
        "index": 64,
        "label": "Golden Marigold",
        "tone": "Golden Marigold",
        "hex": "#DC9B45",
        "family": "Vibrant Yellows",
        "shadeCode": "BO-2041"
      },
      {
        "id": "var-496",
        "file": "img496.jpg",
        "url": "/storage/same-room-shades/img496.jpg",
        "index": 65,
        "label": "Smoky Charcoal",
        "tone": "Smoky Charcoal",
        "hex": "#3E424B",
        "family": "Modern Darks",
        "shadeCode": "BO-2048"
      },
      {
        "id": "var-499",
        "file": "img499.jpg",
        "url": "/storage/same-room-shades/img499.jpg",
        "index": 66,
        "label": "Silk Lotus Pink",
        "tone": "Silk Lotus Pink",
        "hex": "#D9A5A9",
        "family": "Soft Pastels",
        "shadeCode": "BO-2055"
      },
      {
        "id": "var-502",
        "file": "img502.jpg",
        "url": "/storage/same-room-shades/img502.jpg",
        "index": 67,
        "label": "Spice Saffron",
        "tone": "Spice Saffron",
        "hex": "#B85D38",
        "family": "Heritage Warmth",
        "shadeCode": "BO-2062"
      },
      {
        "id": "var-505",
        "file": "img505.jpg",
        "url": "/storage/same-room-shades/img505.jpg",
        "index": 68,
        "label": "Coastal Dune",
        "tone": "Coastal Dune",
        "hex": "#D9CAB6",
        "family": "Sand & Beige",
        "shadeCode": "BO-2069"
      },
      {
        "id": "var-508",
        "file": "img508.jpg",
        "url": "/storage/same-room-shades/img508.jpg",
        "index": 69,
        "label": "Cardamom Green",
        "tone": "Cardamom Green",
        "hex": "#9BA37E",
        "family": "Herbal Greens",
        "shadeCode": "BO-2076"
      },
      {
        "id": "var-511",
        "file": "img511.jpg",
        "url": "/storage/same-room-shades/img511.jpg",
        "index": 70,
        "label": "Vintage Pewter",
        "tone": "Vintage Pewter",
        "hex": "#878B94",
        "family": "Urban Greys",
        "shadeCode": "BO-2083"
      },
      {
        "id": "var-514",
        "file": "img514.jpg",
        "url": "/storage/same-room-shades/img514.jpg",
        "index": 71,
        "label": "Midnight Navy",
        "tone": "Midnight Navy",
        "hex": "#212D40",
        "family": "Deep Night",
        "shadeCode": "BO-2090"
      },
      {
        "id": "var-517",
        "file": "img517.jpg",
        "url": "/storage/same-room-shades/img517.jpg",
        "index": 72,
        "label": "Chai Cream",
        "tone": "Chai Cream",
        "hex": "#EDE0CC",
        "family": "Subtle Creams",
        "shadeCode": "BO-2097"
      },
      {
        "id": "var-520",
        "file": "img520.jpg",
        "url": "/storage/same-room-shades/img520.jpg",
        "index": 73,
        "label": "Cinnamon Bark",
        "tone": "Cinnamon Bark",
        "hex": "#8D533C",
        "family": "Rich Woods",
        "shadeCode": "BO-2104"
      },
      {
        "id": "var-523",
        "file": "img523.jpg",
        "url": "/storage/same-room-shades/img523.jpg",
        "index": 74,
        "label": "Sky Cerulean",
        "tone": "Sky Cerulean",
        "hex": "#688EAC",
        "family": "Tranquil Blues",
        "shadeCode": "BO-2111"
      },
      {
        "id": "var-526",
        "file": "img526.jpg",
        "url": "/storage/same-room-shades/img526.jpg",
        "index": 75,
        "label": "Olive Grove",
        "tone": "Olive Grove",
        "hex": "#5A6347",
        "family": "Earthy Greens",
        "shadeCode": "BO-2118"
      },
      {
        "id": "var-529",
        "file": "img529.jpg",
        "url": "/storage/same-room-shades/img529.jpg",
        "index": 76,
        "label": "Sunset Coral",
        "tone": "Sunset Coral",
        "hex": "#D67261",
        "family": "Warm Corals",
        "shadeCode": "BO-2125"
      },
      {
        "id": "var-532",
        "file": "img532.jpg",
        "url": "/storage/same-room-shades/img532.jpg",
        "index": 77,
        "label": "Muted Lavender",
        "tone": "Muted Lavender",
        "hex": "#A89DB1",
        "family": "Gentle Purples",
        "shadeCode": "BO-2132"
      },
      {
        "id": "var-535",
        "file": "img535.jpg",
        "url": "/storage/same-room-shades/img535.jpg",
        "index": 78,
        "label": "Desert Sandstone",
        "tone": "Desert Sandstone",
        "hex": "#C2A382",
        "family": "Natural Earth",
        "shadeCode": "BO-2139"
      },
      {
        "id": "var-538",
        "file": "img538.jpg",
        "url": "/storage/same-room-shades/img538.jpg",
        "index": 79,
        "label": "Nordic Slate",
        "tone": "Nordic Slate",
        "hex": "#4F5E68",
        "family": "Architectural Greys",
        "shadeCode": "BO-2146"
      },
      {
        "id": "var-541",
        "file": "img541.jpg",
        "url": "/storage/same-room-shades/img541.jpg",
        "index": 80,
        "label": "Ivory Shimmer",
        "tone": "Ivory Shimmer",
        "hex": "#F9F6EE",
        "family": "Luminous Lights",
        "shadeCode": "BO-2153"
      },
      {
        "id": "var-544",
        "file": "img544.jpg",
        "url": "/storage/same-room-shades/img544.jpg",
        "index": 81,
        "label": "Turquoise Breeze",
        "tone": "Turquoise Breeze",
        "hex": "#5E9B9E",
        "family": "Ocean Hues",
        "shadeCode": "BO-2160"
      },
      {
        "id": "var-547",
        "file": "img547.jpg",
        "url": "/storage/same-room-shades/img547.jpg",
        "index": 82,
        "label": "Roasted Almond",
        "tone": "Roasted Almond",
        "hex": "#A27B5C",
        "family": "Warm Tonal",
        "shadeCode": "BO-2167"
      },
      {
        "id": "var-550",
        "file": "img550.jpg",
        "url": "/storage/same-room-shades/img550.jpg",
        "index": 83,
        "label": "Forest Moss",
        "tone": "Forest Moss",
        "hex": "#485C4B",
        "family": "Botanical Darks",
        "shadeCode": "BO-2174"
      },
      {
        "id": "var-553",
        "file": "img553.jpg",
        "url": "/storage/same-room-shades/img553.jpg",
        "index": 84,
        "label": "Ruby Vermillion",
        "tone": "Ruby Vermillion",
        "hex": "#9E3838",
        "family": "Bold Accents",
        "shadeCode": "BO-2181"
      },
      {
        "id": "var-556",
        "file": "img556.jpg",
        "url": "/storage/same-room-shades/img556.jpg",
        "index": 85,
        "label": "Gilded Amber",
        "tone": "Gilded Amber",
        "hex": "#D1883F",
        "family": "Warm Ochres",
        "shadeCode": "BO-2188"
      },
      {
        "id": "var-559",
        "file": "img559.jpg",
        "url": "/storage/same-room-shades/img559.jpg",
        "index": 86,
        "label": "Himalayan Frost",
        "tone": "Himalayan Frost",
        "hex": "#E3E7EB",
        "family": "Crisp Tones",
        "shadeCode": "BO-2195"
      }
    ]
  }
];
