import Image from "next/image";
import type { Project } from "@portfolio/sanity";
import { image } from "@/lib/sanity/image";

type Props = {
  item: Project;
};

export default function WorkGridPreview({ item }: Props) {
  if (!item.thumbnail) return null;

  return (
    <div
      className="
        work-grid-preview
        pointer-events-none
        fixed
        left-0
        top-0
        z-50
        hidden
        h-112
        w-150
        overflow-hidden
        md:block
        will-change-transform
      "
      style={{
        backgroundColor: item.backgroundColor || "#f9f9f9",
      }}
    >
      <div className="relative h-full w-full overflow-hidden">
        <div className="work-grid-preview-image absolute inset-0">
          <Image
            src={image.preset(item.thumbnail, {
              width: 600,
              quality: 80,
            })}
            alt={item.title || "Project preview"}
            fill
            sizes="600px"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
