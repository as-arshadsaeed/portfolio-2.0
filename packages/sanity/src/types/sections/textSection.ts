import { PortableTextBlock } from "@portabletext/types";
import { CTA } from "../common";

export interface TextSection {
  _key: string;
  _type: "textSection";
  heading?: string;
  content?: PortableTextBlock[];
  pageStyle: "home" | "about" | "default";
  cta?: CTA;
}
