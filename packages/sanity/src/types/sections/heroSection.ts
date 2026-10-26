import { PortableTextBlock } from "@portabletext/types";
import { CTA } from "../common";

export type HeroSection = {
  _key: string;
  _type: "heroSection";
  pageStyle: "home" | "default";
  title: string;
  subtitle?: string;
  content?: PortableTextBlock[];
  cta?: CTA;
  mediaType?: "image" | "video";
  image?: {
    _type: "image";
    asset?: {
      _ref: string;
      _type: "reference";
    };
    alt?: string;
  };
  video?: string;
  backgroundColor?: {
    _type: "color";
    hex: string;
  };
};
