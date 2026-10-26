export type GalleryItemData = {
  src: string;
  background?: string;
};

export type GalleryRowData = {
  items: GalleryItemData[];
  speed?: number;
};
