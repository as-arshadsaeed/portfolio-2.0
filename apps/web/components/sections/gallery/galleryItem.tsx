"use client";

import Image from "next/image";
import { GalleryImage } from "@portfolio/sanity/types";
import { image } from "@/lib/sanity/image";

type Props = {
  item: GalleryImage;
  hiddenDesktop?: boolean;
};

const GalleryItem = ({ item, hiddenDesktop = false }: Props) => {
  const imageUrl = item.image;

  if (!imageUrl) {
    return null;
  }

  return (
    <div
      className={`
        w-1/2 p-[1vw]
        sm:w-1/2
        lg:w-1/4
        ${hiddenDesktop ? "hidden lg:block" : ""}
      `}
    >
      <div
        className="relative aspect-[4/3] overflow-hidden border-[5vw] md:border-[2vw]"
        style={{
          borderColor: item.backgroundColor ?? "#f5f5f5",
        }}
      >
        <Image
          src={image.preset(item?.image, {
            width: 500,
            quality: 75,
          })}
          alt={item.alt ?? ""}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          loading="lazy"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default GalleryItem;
