import { IMAGE } from "../common";

export type GalleryImage = {
  _key: string;
  alt?: string;
  backgroundColor?: string;
  image?: IMAGE;
};

export type GallerySection = {
  _key: string;
  _type: "gallerySection";
  gallery: {
    _id: string;
    title: string;
    description?: string;
    speed?: number;
    images: GalleryImage[];
  };
};
