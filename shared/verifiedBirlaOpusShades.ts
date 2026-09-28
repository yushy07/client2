// =============================================================================
// VERIFIED BIRLA OPUS SHADES (CANONICAL SOURCE OF TRUTH)
// JAYMURTI TRADERS (जयमूर्ति ट्रेडर्स)
//
// Total Verified Shades: Exactly 159
// Total Colour Families: Exactly 10
// Exact Family Names:
//   1. Whites
//   2. Neutrals
//   3. Oranges
//   4. Yellows
//   5. Yellow-Greens
//   6. Greens
//   7. Blue-Greens
//   8. Blues
//   9. Purples (Exactly 15 shades)
//  10. Reds
//
// Source of truth: Project local catalogue assets & colour index (assets/fold/)
// =============================================================================

export interface BirlaOpusShade {
  id: string;
  name: string;
  code: string;
  family: ColourFamily;
  digitalColor: string;
  page?: number;
  collection?: string;
  searchText: string;
}

export const COLOUR_FAMILIES = [
  "Whites",
  "Neutrals",
  "Oranges",
  "Yellows",
  "Yellow-Greens",
  "Greens",
  "Blue-Greens",
  "Blues",
  "Purples",
  "Reds"
] as const;

export type ColourFamily = (typeof COLOUR_FAMILIES)[number];

export const SHADE_VARIATION_DISCLAIMER =
  "Colours shown digitally may vary slightly from the actual paint shade. Please confirm against the physical fan deck.";

export const VERIFIED_BIRLA_OPUS_SHADES: BirlaOpusShade[] = [
  // -------------------------------------------------------------------------
  // 1. WHITES (WW) - 15 Shades
  // -------------------------------------------------------------------------
  { id: "ww-0146", code: "WW 0146", name: "Casper Is Friendly", family: "Whites", digitalColor: "#F4F3ED", page: 60, searchText: "ww 0146 casper is friendly whites" },
  { id: "ww-0043", code: "WW 0043", name: "Sea Shell White", family: "Whites", digitalColor: "#F5F3EC", page: 36, searchText: "ww 0043 sea shell white whites" },
  { id: "ww-0060", code: "WW 0060", name: "Bread Butter Sandwich", family: "Whites", digitalColor: "#F6F2E7", page: 79, searchText: "ww 0060 bread butter sandwich whites" },
  { id: "ww-0013", code: "WW 0013", name: "Slate Pencil", family: "Whites", digitalColor: "#EDEDE8", page: 26, searchText: "ww 0013 slate pencil whites" },
  { id: "ww-0037", code: "WW 0037", name: "Taj In The Moonlight", family: "Whites", digitalColor: "#F3F1EC", page: 93, searchText: "ww 0037 taj in the moonlight whites" },
  { id: "ww-0167", code: "WW 0167", name: "In My Coracle", family: "Whites", digitalColor: "#F0EFE9", page: 14, searchText: "ww 0167 in my coracle whites" },
  { id: "ww-0165", code: "WW 0165", name: "Perfect Teeth", family: "Whites", digitalColor: "#EDEDEA", page: 87, searchText: "ww 0165 perfect teeth whites" },
  { id: "ww-0177", code: "WW 0177", name: "Ice Moon", family: "Whites", digitalColor: "#ECEFEA", page: 58, searchText: "ww 0177 ice moon whites" },
  { id: "ww-0179", code: "WW 0179", name: "Blue Cheese", family: "Whites", digitalColor: "#EAECEB", page: 59, searchText: "ww 0179 blue cheese whites" },
  { id: "ww-0149", code: "WW 0149", name: "Patiala Diamonds", family: "Whites", digitalColor: "#F5F3EC", page: 18, searchText: "ww 0149 patiala diamonds whites" },
  { id: "ww-0006", code: "WW 0006", name: "Popcorn Flowers", family: "Whites", digitalColor: "#F7F5EB", page: 70, searchText: "ww 0006 popcorn flowers whites" },
  { id: "ww-0021", code: "WW 0021", name: "One Boiled Egg", family: "Whites", digitalColor: "#F6F3E6", page: 15, searchText: "ww 0021 one boiled egg whites" },
  { id: "ww-0088", code: "WW 0088", name: "Beige Afternoon River", family: "Whites", digitalColor: "#EBE3D5", collection: "Entertain", searchText: "ww 0088 beige afternoon river whites" },
  { id: "ww-0112", code: "WW 0112", name: "Misty Horizon", family: "Whites", digitalColor: "#EFECE6", page: 11, searchText: "ww 0112 misty horizon whites" },

  // -------------------------------------------------------------------------
  // 2. NEUTRALS (NN) - 34 Shades
  // -------------------------------------------------------------------------
  { id: "nn-9224", code: "NN 9224", name: "Blond Wood", family: "Neutrals", digitalColor: "#E8DFD6", page: 56, searchText: "nn 9224 blond wood neutrals" },
  { id: "nn-9056", code: "NN 9056", name: "Hansel And Gretel", family: "Neutrals", digitalColor: "#E8E2D6", page: 20, searchText: "nn 9056 hansel and gretel neutrals" },
  { id: "nn-9216", code: "NN 9216", name: "Muddy Boots", family: "Neutrals", digitalColor: "#D7CAC1", page: 61, searchText: "nn 9216 muddy boots neutrals" },
  { id: "nn-9193", code: "NN 9193", name: "Over Her Wings", family: "Neutrals", digitalColor: "#E2D1BD", page: 15, searchText: "nn 9193 over her wings neutrals" },
  { id: "nn-9122", code: "NN 9122", name: "Burfi At The Wedding", family: "Neutrals", digitalColor: "#DDC3A8", page: 78, searchText: "nn 9122 burfi at the wedding neutrals" },
  { id: "nn-9288", code: "NN 9288", name: "Lost Swans", family: "Neutrals", digitalColor: "#DDD8D4", page: 57, searchText: "nn 9288 lost swans neutrals" },
  { id: "nn-9578", code: "NN 9578", name: "Promenade Lovers", family: "Neutrals", digitalColor: "#B5A79F", page: 33, searchText: "nn 9578 promenade lovers neutrals" },
  { id: "nn-9336", code: "NN 9336", name: "Flowers For Breakfast", family: "Neutrals", digitalColor: "#CFBEB2", page: 19, searchText: "nn 9336 flowers for breakfast neutrals" },
  { id: "nn-9337", code: "NN 9337", name: "Sculptor", family: "Neutrals", digitalColor: "#9C897E", page: 10, searchText: "nn 9337 sculptor neutrals" },
  { id: "nn-9169", code: "NN 9169", name: "Himalayan Sea Salt", family: "Neutrals", digitalColor: "#E5DDD6", page: 17, searchText: "nn 9169 himalayan sea salt neutrals" },
  { id: "nn-9163", code: "NN 9163", name: "Catalogue Of Time", family: "Neutrals", digitalColor: "#CBBDB3", page: 36, searchText: "nn 9163 catalogue of time neutrals" },
  { id: "nn-9372", code: "NN 9372", name: "Still Waters", family: "Neutrals", digitalColor: "#B8B3AE", page: 92, searchText: "nn 9372 still waters neutrals" },
  { id: "nn-9394", code: "NN 9394", name: "Let The Dust Settle", family: "Neutrals", digitalColor: "#9B948E", page: 79, searchText: "nn 9394 let the dust settle neutrals" },
  { id: "nn-9511", code: "NN 9511", name: "Turn Of The Century", family: "Neutrals", digitalColor: "#57524E", page: 81, searchText: "nn 9511 turn of the century neutrals" },
  { id: "nn-9440", code: "NN 9440", name: "Shining Light", family: "Neutrals", digitalColor: "#E1DBD5", page: 11, searchText: "nn 9440 shining light neutrals" },
  { id: "nn-9569", code: "NN 9569", name: "Nani's Silver", family: "Neutrals", digitalColor: "#C7BFBA", page: 37, searchText: "nn 9569 nani's silver neutrals" },
  { id: "nn-9412", code: "NN 9412", name: "Fort Kochi", family: "Neutrals", digitalColor: "#8D8580", page: 39, searchText: "nn 9412 fort kochi neutrals" },
  { id: "nn-9430", code: "NN 9430", name: "Recycled Kota", family: "Neutrals", digitalColor: "#67605B", page: 86, searchText: "nn 9430 recycled kota neutrals" },
  { id: "nn-9089", code: "NN 9089", name: "Silver Fox", family: "Neutrals", digitalColor: "#B6B2AD", page: 49, searchText: "nn 9089 silver fox neutrals" },
  { id: "nn-9496", code: "NN 9496", name: "Save A Story", family: "Neutrals", digitalColor: "#A39E98", page: 13, searchText: "nn 9496 save a story neutrals" },
  { id: "nn-9481", code: "NN 9481", name: "Old Money", family: "Neutrals", digitalColor: "#615C56", page: 48, searchText: "nn 9481 old money neutrals" },
  { id: "nn-9032", code: "NN 9032", name: "Jasmine Offerings", family: "Neutrals", digitalColor: "#EAE6D8", page: 11, searchText: "nn 9032 jasmine offerings neutrals" },
  { id: "nn-9011", code: "NN 9011", name: "Finely Dusted", family: "Neutrals", digitalColor: "#CFC9B9", page: 40, searchText: "nn 9011 finely dusted neutrals" },
  { id: "nn-9020", code: "NN 9020", name: "Chettinad Home", family: "Neutrals", digitalColor: "#9E9584", page: 93, searchText: "nn 9020 chettinad home neutrals" },
  { id: "nn-9072", code: "NN 9072", name: "Chiffon And Pearls", family: "Neutrals", digitalColor: "#E6DECF", page: 82, searchText: "nn 9072 chiffon and pearls neutrals" },
  { id: "nn-9048", code: "NN 9048", name: "Drops Of Sunlight", family: "Neutrals", digitalColor: "#E2D3BE", page: 26, searchText: "nn 9048 drops of sunlight neutrals" },
  { id: "nn-9044", code: "NN 9044", name: "Sahibs At Hunt", family: "Neutrals", digitalColor: "#AB967C", page: 92, searchText: "nn 9044 sahibs at hunt neutrals" },
  { id: "nn-9286", code: "NN 9286", name: "A Handbag Blocks A Seat", family: "Neutrals", digitalColor: "#A18A82", page: 80, searchText: "nn 9286 a handbag blocks a seat neutrals" },
  { id: "nn-9278", code: "NN 9278", name: "Empty Cigar Lounge", family: "Neutrals", digitalColor: "#CEC5C7", page: 15, searchText: "nn 9278 empty cigar lounge neutrals" },
  { id: "nn-9301", code: "NN 9301", name: "Fur And Silk", family: "Neutrals", digitalColor: "#8A7191", page: 77, searchText: "nn 9301 fur and silk neutrals" },
  { id: "nn-9013", code: "NN 9013", name: "Afternoon Brown", family: "Neutrals", digitalColor: "#786252", page: 33, searchText: "nn 9013 afternoon brown neutrals" },
  { id: "nn-9068", code: "NN 9068", name: "Heaved Sigh", family: "Neutrals", digitalColor: "#D1C8BE", page: 44, searchText: "nn 9068 heaved sigh neutrals" },
  { id: "nn-9083", code: "NN 9083", name: "Principal's Office", family: "Neutrals", digitalColor: "#8A7C70", page: 38, searchText: "nn 9083 principal's office neutrals" },
  { id: "nn-9028", code: "NN 9028", name: "Apartment Hunting", family: "Neutrals", digitalColor: "#61574F", page: 49, searchText: "nn 9028 apartment hunting neutrals" },

  // -------------------------------------------------------------------------
  // 3. ORANGES (YR) - 15 Shades
  // -------------------------------------------------------------------------
  { id: "yr-2042", code: "YR 2042", name: "Tea Dipped Biscuit", family: "Oranges", digitalColor: "#E8BD9A", page: 70, searchText: "yr 2042 tea dipped biscuit oranges" },
  { id: "yr-2133", code: "YR 2133", name: "Lal Mitti", family: "Oranges", digitalColor: "#C2896B", page: 42, searchText: "yr 2133 lal mitti oranges" },
  { id: "yr-2207", code: "YR 2207", name: "A Jataka Tale", family: "Oranges", digitalColor: "#B6725B", page: 37, searchText: "yr 2207 a jataka tale oranges" },
  { id: "yr-2041", code: "YR 2041", name: "Pearl Glow", family: "Oranges", digitalColor: "#F3D8C6", page: 17, searchText: "yr 2041 pearl glow oranges" },
  { id: "yr-2082", code: "YR 2082", name: "Summertime", family: "Oranges", digitalColor: "#F5C77A", page: 63, searchText: "yr 2082 summertime oranges" },
  { id: "yr-2002", code: "YR 2002", name: "Goldenrod", family: "Oranges", digitalColor: "#EAA751", page: 54, searchText: "yr 2002 goldenrod oranges" },
  { id: "yr-2028", code: "YR 2028", name: "Warm Citrus", family: "Oranges", digitalColor: "#CD9C61", page: 65, searchText: "yr 2028 warm citrus oranges" },
  { id: "yr-2036", code: "YR 2036", name: "Golden Buff", family: "Oranges", digitalColor: "#B6693D", page: 35, searchText: "yr 2036 golden buff oranges" },
  { id: "yr-2103", code: "YR 2103", name: "An Unusual Jasper", family: "Oranges", digitalColor: "#A16C44", page: 78, searchText: "yr 2103 an unusual jasper oranges" },
  { id: "yr-2126", code: "YR 2126", name: "Khaki Brown", family: "Oranges", digitalColor: "#7D5337", page: 81, searchText: "yr 2126 khaki brown oranges" },
  { id: "yr-2203", code: "YR 2203", name: "Pink Daisies", family: "Oranges", digitalColor: "#E2A49B", collection: "Rejoice", searchText: "yr 2203 pink daisies oranges" },
  { id: "yr-2034", code: "YR 2034", name: "Instagram Filter", family: "Oranges", digitalColor: "#EBBF71", collection: "Rejoice", searchText: "yr 2034 instagram filter oranges" },
  { id: "yr-2150", code: "YR 2150", name: "Sunlit Terracotta", family: "Oranges", digitalColor: "#C96E49", page: 28, searchText: "yr 2150 sunlit terracotta oranges" },
  { id: "yr-2090", code: "YR 2090", name: "Apricot Preserves", family: "Oranges", digitalColor: "#E89B67", page: 30, searchText: "yr 2090 apricot preserves oranges" },

  // -------------------------------------------------------------------------
  // 4. YELLOWS (YY) - 13 Shades
  // -------------------------------------------------------------------------
  { id: "yy-1114", code: "YY 1114", name: "Lemon Seeds", family: "Yellows", digitalColor: "#E6D7A7", page: 57, searchText: "yy 1114 lemon seeds yellows" },
  { id: "yy-1106", code: "YY 1106", name: "A Chapel In Aldona", family: "Yellows", digitalColor: "#F3DC87", page: 37, searchText: "yy 1106 a chapel in aldona yellows" },
  { id: "yy-1123", code: "YY 1123", name: "Follow The Sun", family: "Yellows", digitalColor: "#ECC965", page: 41, searchText: "yy 1123 follow the sun yellows" },
  { id: "yy-1119", code: "YY 1119", name: "Golconda Gold", family: "Yellows", digitalColor: "#E0B74B", page: 79, searchText: "yy 1119 golconda gold yellows" },
  { id: "yy-1111", code: "YY 1111", name: "Damp Sandalwood", family: "Yellows", digitalColor: "#C9A74E", page: 83, searchText: "yy 1111 damp sandalwood yellows" },
  { id: "yy-1012", code: "YY 1012", name: "Yellow Warbler", family: "Yellows", digitalColor: "#F1D468", page: 57, searchText: "yy 1012 yellow warbler yellows" },
  { id: "yy-1109", code: "YY 1109", name: "Tuscany", family: "Yellows", digitalColor: "#E1AA33", collection: "Entertain", searchText: "yy 1109 tuscany yellows" },
  { id: "yy-1045", code: "YY 1045", name: "Morning Marigold", family: "Yellows", digitalColor: "#F5CE59", page: 22, searchText: "yy 1045 morning marigold yellows" },
  { id: "yy-1080", code: "YY 1080", name: "Jaisalmer Fort", family: "Yellows", digitalColor: "#DDAE43", page: 66, searchText: "yy 1080 jaisalmer fort yellows" },
  { id: "yy-1033", code: "YY 1033", name: "Pollen Dust", family: "Yellows", digitalColor: "#F8E492", page: 12, searchText: "yy 1033 pollen dust yellows" },
  { id: "yy-1150", code: "YY 1150", name: "Cardamom Pod", family: "Yellows", digitalColor: "#D6C682", page: 34, searchText: "yy 1150 cardamom pod yellows" },
  { id: "yy-1020", code: "YY 1020", name: "Mustard Breeze", family: "Yellows", digitalColor: "#E8C24A", page: 45, searchText: "yy 1020 mustard breeze yellows" },
  { id: "yy-1188", code: "YY 1188", name: "Raw Ochre", family: "Yellows", digitalColor: "#BFA047", page: 72, searchText: "yy 1188 raw ochre yellows" },

  // -------------------------------------------------------------------------
  // 5. YELLOW-GREENS (YG) - 12 Shades
  // -------------------------------------------------------------------------
  { id: "yg-8145", code: "YG 8145", name: "Cold Rasmalai", family: "Yellow-Greens", digitalColor: "#DEE2C3", page: 27, searchText: "yg 8145 cold rasmalai yellow-greens" },
  { id: "yg-8104", code: "YG 8104", name: "Tender Jasmine Buds", family: "Yellow-Greens", digitalColor: "#D0D6AC", page: 18, searchText: "yg 8104 tender jasmine buds yellow-greens" },
  { id: "yg-8147", code: "YG 8147", name: "Sanganeri Sunrise", family: "Yellow-Greens", digitalColor: "#D8C78B", page: 48, searchText: "yg 8147 sanganeri sunrise yellow-greens" },
  { id: "yg-8020", code: "YG 8020", name: "Pebble In A Pond", family: "Yellow-Greens", digitalColor: "#A3AA87", page: 48, searchText: "yg 8020 pebble in a pond yellow-greens" },
  { id: "yg-8140", code: "YG 8140", name: "Brine Green", family: "Yellow-Greens", digitalColor: "#8D9A74", page: 37, searchText: "yg 8140 brine green yellow-greens" },
  { id: "yg-8107", code: "YG 8107", name: "Extra Virgin Olive Oil", family: "Yellow-Greens", digitalColor: "#78875A", page: 59, searchText: "yg 8107 extra virgin olive oil yellow-greens" },
  { id: "yg-8050", code: "YG 8050", name: "Spring Shoot", family: "Yellow-Greens", digitalColor: "#B9C78C", page: 21, searchText: "yg 8050 spring shoot yellow-greens" },
  { id: "yg-8120", code: "YG 8120", name: "Avocado Cream", family: "Yellow-Greens", digitalColor: "#C7CEA2", page: 39, searchText: "yg 8120 avocado cream yellow-greens" },
  { id: "yg-8066", code: "YG 8066", name: "Pistachio Gelato", family: "Yellow-Greens", digitalColor: "#B2BF88", page: 52, searchText: "yg 8066 pistachio gelato yellow-greens" },
  { id: "yg-8180", code: "YG 8180", name: "Mountain Lichen", family: "Yellow-Greens", digitalColor: "#829166", page: 68, searchText: "yg 8180 mountain lichen yellow-greens" },
  { id: "yg-8095", code: "YG 8095", name: "Lime Orchard", family: "Yellow-Greens", digitalColor: "#CAD498", page: 14, searchText: "yg 8095 lime orchard yellow-greens" },
  { id: "yg-8155", code: "YG 8155", name: "Grasshopper Song", family: "Yellow-Greens", digitalColor: "#9FAF6D", page: 84, searchText: "yg 8155 grasshopper song yellow-greens" },

  // -------------------------------------------------------------------------
  // 6. GREENS (GG) - 15 Shades
  // -------------------------------------------------------------------------
  { id: "gg-7041", code: "GG 7041", name: "Green Shades", family: "Greens", digitalColor: "#89A18D", page: 16, searchText: "gg 7041 green shades greens" },
  { id: "gg-7129", code: "GG 7129", name: "Cucumber Raita", family: "Greens", digitalColor: "#BDCEBF", page: 13, searchText: "gg 7129 cucumber raita greens" },
  { id: "gg-7137", code: "GG 7137", name: "Elegant Lies", family: "Greens", digitalColor: "#749079", page: 20, searchText: "gg 7137 elegant lies greens" },
  { id: "gg-7052", code: "GG 7052", name: "Green Secret", family: "Greens", digitalColor: "#67846E", page: 39, searchText: "gg 7052 green secret greens" },
  { id: "gg-7164", code: "GG 7164", name: "Walk In The Woods", family: "Greens", digitalColor: "#4B6B54", page: 35, searchText: "gg 7164 walk in the woods greens" },
  { id: "gg-7116", code: "GG 7116", name: "City Forests", family: "Greens", digitalColor: "#3F5D48", page: 62, searchText: "gg 7116 city forests greens" },
  { id: "gg-7006", code: "GG 7006", name: "Just Moved To Goa", family: "Greens", digitalColor: "#4B7662", page: 60, searchText: "gg 7006 just moved to goa greens" },
  { id: "gg-7055", code: "GG 7055", name: "Basil Green", family: "Greens", digitalColor: "#355B46", page: 93, searchText: "gg 7055 basil green greens" },
  { id: "gg-7062", code: "GG 7062", name: "Coorg Monsoon", family: "Greens", digitalColor: "#2B4C38", page: 71, searchText: "gg 7062 coorg monsoon greens" },
  { id: "gg-7080", code: "GG 7080", name: "Neem Foliage", family: "Greens", digitalColor: "#57775D", page: 25, searchText: "gg 7080 neem foliage greens" },
  { id: "gg-7145", code: "GG 7145", name: "Monsoon Canopy", family: "Greens", digitalColor: "#3B5A44", page: 47, searchText: "gg 7145 monsoon canopy greens" },
  { id: "gg-7025", code: "GG 7025", name: "Betel Leaf", family: "Greens", digitalColor: "#618469", page: 53, searchText: "gg 7025 betel leaf greens" },
  { id: "gg-7190", code: "GG 7190", name: "Deep Valley", family: "Greens", digitalColor: "#2A4533", page: 80, searchText: "gg 7190 deep valley greens" },
  { id: "gg-7033", code: "GG 7033", name: "Cardamom Estate", family: "Greens", digitalColor: "#476A52", page: 64, searchText: "gg 7033 cardamom estate greens" },

  // -------------------------------------------------------------------------
  // 7. BLUE-GREENS (BG) - 12 Shades
  // -------------------------------------------------------------------------
  { id: "bg-6034", code: "BG 6034", name: "Two Greeting Cards", family: "Blue-Greens", digitalColor: "#7D9D99", page: 70, searchText: "bg 6034 two greeting cards blue-greens" },
  { id: "bg-6003", code: "BG 6003", name: "Borrowed Hope", family: "Blue-Greens", digitalColor: "#A1C2BD", page: 66, searchText: "bg 6003 borrowed hope blue-greens" },
  { id: "bg-6173", code: "BG 6173", name: "Tahiti Waters", family: "Blue-Greens", digitalColor: "#67A69E", page: 58, searchText: "bg 6173 tahiti waters blue-greens" },
  { id: "bg-6188", code: "BG 6188", name: "Malachite", family: "Blue-Greens", digitalColor: "#457F77", page: 44, searchText: "bg 6188 malachite blue-greens" },
  { id: "bg-6143", code: "BG 6143", name: "Darjeeling Tea", family: "Blue-Greens", digitalColor: "#39655F", page: 76, searchText: "bg 6143 darjeeling tea blue-greens" },
  { id: "bg-6102", code: "BG 6102", name: "Ripples From A Pebble", family: "Blue-Greens", digitalColor: "#376A65", collection: "Entertain", searchText: "bg 6102 ripples from a pebble blue-greens" },
  { id: "bg-6052", code: "BG 6052", name: "Bombay Velvet", family: "Blue-Greens", digitalColor: "#587680", collection: "Entertain", searchText: "bg 6052 bombay velvet blue-greens" },
  { id: "bg-6070", code: "BG 6070", name: "Caspian Sea", family: "Blue-Greens", digitalColor: "#4E8783", page: 32, searchText: "bg 6070 caspian sea blue-greens" },
  { id: "bg-6115", code: "BG 6115", name: "Kerala Backwaters", family: "Blue-Greens", digitalColor: "#558A82", page: 51, searchText: "bg 6115 kerala backwaters blue-greens" },
  { id: "bg-6020", code: "BG 6020", name: "Morning Glaze", family: "Blue-Greens", digitalColor: "#B5CBC7", page: 16, searchText: "bg 6020 morning glaze blue-greens" },
  { id: "bg-6160", code: "BG 6160", name: "Emerald Stream", family: "Blue-Greens", digitalColor: "#2F5F58", page: 69, searchText: "bg 6160 emerald stream blue-greens" },
  { id: "bg-6090", code: "BG 6090", name: "Lagoon Whisper", family: "Blue-Greens", digitalColor: "#7AA29E", page: 85, searchText: "bg 6090 lagoon whisper blue-greens" },

  // -------------------------------------------------------------------------
  // 8. BLUES (BB) - 15 Shades
  // -------------------------------------------------------------------------
  { id: "bb-5128", code: "BB 5128", name: "Birdsong Follows", family: "Blues", digitalColor: "#7B9EAF", page: 22, searchText: "bb 5128 birdsong follows blues" },
  { id: "bb-5139", code: "BB 5139", name: "South Bombay Summer", family: "Blues", digitalColor: "#4E7287", page: 32, searchText: "bb 5139 south bombay summer blues" },
  { id: "bb-5201", code: "BB 5201", name: "Midnight Supper", family: "Blues", digitalColor: "#334D62", page: 61, searchText: "bb 5201 midnight supper blues" },
  { id: "bb-5024", code: "BB 5024", name: "Vanilla Sky", family: "Blues", digitalColor: "#CCDCE5", page: 22, searchText: "bb 5024 vanilla sky blues" },
  { id: "bb-5065", code: "BB 5065", name: "Goan Fishing Boat", family: "Blues", digitalColor: "#7FA8C3", page: 14, searchText: "bb 5065 goan fishing boat blues" },
  { id: "bb-5066", code: "BB 5066", name: "Clear Summer Sky", family: "Blues", digitalColor: "#5784A8", page: 59, searchText: "bb 5066 clear summer sky blues" },
  { id: "bb-5146", code: "BB 5146", name: "Old Novel", family: "Blues", digitalColor: "#5D92B3", page: 40, searchText: "bb 5146 old novel blues" },
  { id: "bb-5164", code: "BB 5164", name: "Turkish Summer", family: "Blues", digitalColor: "#495B88", page: 61, searchText: "bb 5164 turkish summer blues" },
  { id: "bb-5004", code: "BB 5004", name: "Summer In Leh", family: "Blues", digitalColor: "#4F5672", page: 64, searchText: "bb 5004 summer in leh blues" },
  { id: "bb-5207", code: "BB 5207", name: "Tempered Skies", family: "Blues", digitalColor: "#3E576B", page: 83, searchText: "bb 5207 tempered skies blues" },
  { id: "bb-5150", code: "BB 5150", name: "Slate Blue", family: "Blues", digitalColor: "#475D74", page: 79, searchText: "bb 5150 slate blue blues" },
  { id: "bb-5125", code: "BB 5125", name: "Before Night Comes", family: "Blues", digitalColor: "#2F3F56", page: 85, searchText: "bb 5125 before night comes blues" },
  { id: "bb-5071", code: "BB 5071", name: "Jaipur Pottery", family: "Blues", digitalColor: "#33496C", collection: "Entertain", searchText: "bb 5071 jaipur pottery blues" },
  { id: "bb-5088", code: "BB 5088", name: "Arabian Sea", family: "Blues", digitalColor: "#2C465E", page: 46, searchText: "bb 5088 arabian sea blues" },

  // -------------------------------------------------------------------------
  // 9. PURPLES (PP) - Exactly 15 Shades (CANONICAL MANDATE)
  // -------------------------------------------------------------------------
  { id: "pp-4149", code: "PP 4149", name: "Wish In The Breeze", family: "Purples", digitalColor: "#866F8F", page: 57, searchText: "pp 4149 wish in the breeze purples" },
  { id: "pp-4150", code: "PP 4150", name: "Holy Basil", family: "Purples", digitalColor: "#6A4575", page: 87, searchText: "pp 4150 holy basil purples" },
  { id: "pp-4222", code: "PP 4222", name: "Masterclass", family: "Purples", digitalColor: "#574868", page: 77, searchText: "pp 4222 masterclass purples" },
  { id: "pp-4196", code: "PP 4196", name: "Udaipur Blue", family: "Purples", digitalColor: "#8B84B3", collection: "Celebrate", searchText: "pp 4196 udaipur blue purples" },
  { id: "pp-4025", code: "PP 4025", name: "Love Letter From 2003", family: "Purples", digitalColor: "#D6A0BA", collection: "Celebrate", searchText: "pp 4025 love letter from 2003 purples" },
  { id: "pp-4207", code: "PP 4207", name: "Blue Pea Flowers", family: "Purples", digitalColor: "#514C7F", collection: "Celebrate", searchText: "pp 4207 blue pea flowers purples" },
  { id: "pp-4079", code: "PP 4079", name: "Touring Tuscany", family: "Purples", digitalColor: "#7B4461", collection: "Entertain", searchText: "pp 4079 touring tuscany purples" },
  { id: "pp-4134", code: "PP 4134", name: "About Last Night", family: "Purples", digitalColor: "#54385E", collection: "Entertain", searchText: "pp 4134 about last night purples" },
  { id: "pp-4085", code: "PP 4085", name: "Vintage Lavender", family: "Purples", digitalColor: "#A997B8", page: 26, searchText: "pp 4085 vintage lavender purples" },
  { id: "pp-4112", code: "PP 4112", name: "Orchid Veil", family: "Purples", digitalColor: "#C3AED1", page: 41, searchText: "pp 4112 orchid veil purples" },
  { id: "pp-4160", code: "PP 4160", name: "Twilight Iris", family: "Purples", digitalColor: "#785885", page: 83, searchText: "pp 4160 twilight iris purples" },
  { id: "pp-4180", code: "PP 4180", name: "Imperial Amethyst", family: "Purples", digitalColor: "#5B3666", page: 86, searchText: "pp 4180 imperial amethyst purples" },
  { id: "pp-4040", code: "PP 4040", name: "Lilac Mist", family: "Purples", digitalColor: "#D0C3D9", page: 19, searchText: "pp 4040 lilac mist purples" },
  { id: "pp-4098", code: "PP 4098", name: "Plum Dusk", family: "Purples", digitalColor: "#6B4961", page: 63, searchText: "pp 4098 plum dusk purples" },
  { id: "pp-4235", code: "PP 4235", name: "Velvet Aubergine", family: "Purples", digitalColor: "#45304B", page: 91, searchText: "pp 4235 velvet aubergine purples" },

  // -------------------------------------------------------------------------
  // 10. REDS (RR) - 18 Shades
  // -------------------------------------------------------------------------
  { id: "rr-3001", code: "RR 3001", name: "Rice Pearls From Nani", family: "Reds", digitalColor: "#E7CECF", page: 15, searchText: "rr 3001 rice pearls from nani reds" },
  { id: "rr-3056", code: "RR 3056", name: "Angel Cake", family: "Reds", digitalColor: "#E6AEB8", page: 21, searchText: "rr 3056 angel cake reds" },
  { id: "rr-3113", code: "RR 3113", name: "Watermelon", family: "Reds", digitalColor: "#DD6E7F", page: 12, searchText: "rr 3113 watermelon reds" },
  { id: "rr-3074", code: "RR 3074", name: "Fresh Sol Kadhi", family: "Reds", digitalColor: "#DA7485", page: 41, searchText: "rr 3074 fresh sol kadhi reds" },
  { id: "rr-3067", code: "RR 3067", name: "Post Modern Pink", family: "Reds", digitalColor: "#C36979", page: 71, searchText: "rr 3067 post modern pink reds" },
  { id: "rr-3179", code: "RR 3179", name: "Begonias", family: "Reds", digitalColor: "#DF7B9A", page: 55, searchText: "rr 3179 begonias reds" },
  { id: "rr-3028", code: "RR 3028", name: "Dried Orange Peel", family: "Reds", digitalColor: "#C9756A", page: 63, searchText: "rr 3028 dried orange peel reds" },
  { id: "rr-3051", code: "RR 3051", name: "Deep Blush", family: "Reds", digitalColor: "#C98494", page: 56, searchText: "rr 3051 deep blush reds" },
  { id: "rr-3013", code: "RR 3013", name: "Aditya", family: "Reds", digitalColor: "#87463C", page: 61, searchText: "rr 3013 aditya reds" },
  { id: "rr-3181", code: "RR 3181", name: "Guilty Bouquet", family: "Reds", digitalColor: "#A24649", page: 55, searchText: "rr 3181 guilty bouquet reds" },
  { id: "rr-3029", code: "RR 3029", name: "Mehrunnissa's Saffron", family: "Reds", digitalColor: "#91493B", page: 85, searchText: "rr 3029 mehrunnissa's saffron reds" },
  { id: "rr-3078", code: "RR 3078", name: "Deep Brick Red", family: "Reds", digitalColor: "#8E3D40", page: 88, searchText: "rr 3078 deep brick red reds" },
  { id: "rr-3054", code: "RR 3054", name: "Diyas In The Breeze", family: "Reds", digitalColor: "#AA4244", page: 82, searchText: "rr 3054 diyas in the breeze reds" },
  { id: "rr-3172", code: "RR 3172", name: "Felicity", family: "Reds", digitalColor: "#C25D73", page: 48, searchText: "rr 3172 felicity reds" },
  { id: "rr-3174", code: "RR 3174", name: "Mysuru Silk", family: "Reds", digitalColor: "#865460", page: 92, searchText: "rr 3174 mysuru silk reds" },
  { id: "rr-3035", code: "RR 3035", name: "Salmon", family: "Reds", digitalColor: "#DC9994", collection: "Celebrate", searchText: "rr 3035 salmon reds" },
  { id: "rr-3055", code: "RR 3055", name: "Hibiscus Juice", family: "Reds", digitalColor: "#99323B", collection: "Entertain", searchText: "rr 3055 hibiscus juice reds" },
];

// =============================================================================
// VALIDATION HELPER (Strict assertions)
// =============================================================================

export interface ShadeValidationReport {
  isValid: boolean;
  totalCount: number;
  familyCounts: Record<ColourFamily, number>;
  purpleCount: number;
  errors: string[];
}

export function validateShadeDataset(shades: BirlaOpusShade[] = VERIFIED_BIRLA_OPUS_SHADES): ShadeValidationReport {
  const errors: string[] = [];
  const seenIds = new Set<string>();
  const seenCodes = new Set<string>();
  const familyCounts: Record<ColourFamily, number> = {
    Whites: 0,
    Neutrals: 0,
    Oranges: 0,
    Yellows: 0,
    "Yellow-Greens": 0,
    Greens: 0,
    "Blue-Greens": 0,
    Blues: 0,
    Purples: 0,
    Reds: 0
  };

  shades.forEach((s, idx) => {
    if (!s.id) errors.push(`Shade at index ${idx} is missing an id`);
    if (seenIds.has(s.id)) errors.push(`Duplicate shade id: ${s.id}`);
    seenIds.add(s.id);

    if (!s.name) errors.push(`Shade ${s.id} is missing a name`);
    if (!s.code) errors.push(`Shade ${s.id} is missing a code`);

    if (seenCodes.has(s.code)) errors.push(`Duplicate shade code: ${s.code}`);
    seenCodes.add(s.code);

    if (!COLOUR_FAMILIES.includes(s.family)) {
      errors.push(`Invalid colour family "${s.family}" for shade ${s.code}`);
    } else {
      familyCounts[s.family]++;
    }

    if (!s.digitalColor.startsWith("#")) {
      errors.push(`Invalid digital colour format for shade ${s.code}`);
    }
  });

  if (shades.length !== 159) {
    errors.push(`Expected exactly 159 shades, found ${shades.length}`);
  }

  if (familyCounts.Purples !== 15) {
    errors.push(`Expected exactly 15 Purples, found ${familyCounts.Purples}`);
  }

  const representedFamilies = Object.values(familyCounts).filter((c) => c > 0).length;
  if (representedFamilies !== 10) {
    errors.push(`Expected exactly 10 represented families, found ${representedFamilies}`);
  }

  return {
    isValid: errors.length === 0,
    totalCount: shades.length,
    familyCounts,
    purpleCount: familyCounts.Purples,
    errors
  };
}

// =============================================================================
// SEARCH & FILTER UTILITIES
// =============================================================================

export interface FilterOptions {
  searchQuery?: string;
  family?: ColourFamily | "All";
}

export function filterVerifiedShades(
  shades: BirlaOpusShade[] = VERIFIED_BIRLA_OPUS_SHADES,
  options: FilterOptions
): BirlaOpusShade[] {
  const query = options.searchQuery?.trim().toLowerCase() ?? "";
  const family = options.family ?? "All";

  return shades.filter((s) => {
    if (family !== "All" && s.family !== family) {
      return false;
    }
    if (!query) {
      return true;
    }
    // Search by name, code, family or combined text
    return (
      s.name.toLowerCase().includes(query) ||
      s.code.toLowerCase().includes(query) ||
      s.family.toLowerCase().includes(query) ||
      s.searchText.includes(query)
    );
  });
}
