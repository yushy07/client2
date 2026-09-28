// Room Library data registry representing all 102 pages of the Birla Opus Rooms & House Catalogue
// Scanned architectural spaces covering living, bedroom, dining, kitchen, exterior, and details.

export type RoomCategory = 
  | "Living & Lounge"
  | "Bedroom Sanctuary"
  | "Dining & Kitchen"
  | "Exterior & Facade"
  | "Study & Accent Spaces";

export interface RoomLibraryPage {
  index: number;
  fileName: string;
  url: string;
  category: RoomCategory;
  title: string;
  styleContext: string;
  suggestedFinish: string;
}

export const ROOM_LIBRARY_PAGES: RoomLibraryPage[] = Array.from({ length: 102 }, (_, i) => {
  const pageNum = i + 1;
  const pad = String(pageNum).padStart(4, "0");
  const fileName = `phone-view_compressed_page-${pad}.jpg`;

  let category: RoomCategory = "Living & Lounge";
  let title = `Space ${pageNum}`;
  let styleContext = "Contemporary residential composition with harmonious ambient finishes";
  let suggestedFinish = "Calista Everclear / One Pure Elegance";

  if (pageNum <= 25) {
    category = "Living & Lounge";
    title = `Living Room Architectural Study ${pageNum}`;
    styleContext = "Open-concept conversational salon emphasizing spatial depth and light";
    suggestedFinish = "One Pure Elegance Matt / Calista Everwash";
  } else if (pageNum <= 50) {
    category = "Bedroom Sanctuary";
    title = `Master Suite & Bedroom Retreat ${pageNum}`;
    styleContext = "Quiet residential quarters styled with tactile soothing tones";
    suggestedFinish = "Calista Everclear Soft Sheen / Luxury Emulsion";
  } else if (pageNum <= 70) {
    category = "Dining & Kitchen";
    title = `Dining Hall & Culinary Space ${pageNum}`;
    styleContext = "Vibrant gathering hub engineered for washable durability and warmth";
    suggestedFinish = "Calista Ever Wash Stain-Resistant Emulsion";
  } else if (pageNum <= 88) {
    category = "Exterior & Facade";
    title = `Exterior Elevation & Facade Study ${pageNum}`;
    styleContext = "All-weather architectural exterior treatment with structural protection";
    suggestedFinish = "One True Life / Style Power Bright Exterior";
  } else {
    category = "Study & Accent Spaces";
    title = `Accent Wall & Studio Nook ${pageNum}`;
    styleContext = "Focused spatial vignette showcasing high-impact focal walls";
    suggestedFinish = "Birla Opus Designer Textures & Accent Finishes";
  }

  return {
    index: pageNum,
    fileName,
    url: `/storage/rooms-catalogue/${fileName}`,
    category,
    title,
    styleContext,
    suggestedFinish,
  };
});
