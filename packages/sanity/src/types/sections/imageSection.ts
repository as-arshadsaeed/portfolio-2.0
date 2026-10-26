import { PortableTextBlock } from "@portabletext/types";

export type ImageSection = {
  _key: string;
  _type: "imageSection";
  heading?: string;
  content?: PortableTextBlock[];
  imageDirection?: "left" | "right" | "center";
  caption?: string;
  pageStyle: "home" | "about" | "default";
  image?: {
    _type: "image";
    asset?: {
      _ref: string;
      _type: "reference";
    };
  };
};
