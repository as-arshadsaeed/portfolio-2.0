import type { ImageSection as ImageSectionType } from "@portfolio/sanity";

import ImageSectionAbout from "./imageSectionAbout";
import ImageSectionDefault from "./imageSectionDefault";

interface Props {
  section: ImageSectionType;
}

export default function ImageSection({ section }: Props) {
  switch (section.pageStyle) {
    case "about":
      return <ImageSectionAbout section={section} />;

    default:
      return <ImageSectionDefault section={section} />;
  }
}
