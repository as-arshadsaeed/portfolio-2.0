import type { GallerySection as GallerySectionType } from "@portfolio/sanity";
import GalleryRow from "./galleryRow";

interface Props {
  section: GallerySectionType;
}

export default function GallerySection({ section }: Props) {
  return (
    <section className="pb-14 md:pb-20 overflow-hidden">
      <GalleryRow
        items={section.gallery.images}
        speed={section.gallery.speed}
      />
    </section>
  );
}
