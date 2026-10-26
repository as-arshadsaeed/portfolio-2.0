import { sanityClient } from "./client";
import { createImageUrlBuilder } from "@sanity/image-url";

const builder = createImageUrlBuilder(sanityClient);

export type SanityImage = {
  asset?: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
};

export const image = {
  urlFor: (source?: SanityImage) => {
    if (!source) return "";

    return builder.image(source);
  },

  preset: (
    source?: SanityImage,
    options?: {
      width?: number;
      height?: number;
      quality?: number;
    },
  ) => {
    if (!source) return "";

    const width = options?.width ?? 300;
    const quality = options?.quality ?? 75;

    return builder
      .image(source)
      .width(width)
      .quality(quality)
      .auto("format")
      .url();
  },
};
