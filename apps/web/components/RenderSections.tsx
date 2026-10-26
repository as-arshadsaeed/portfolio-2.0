import type { PageSection } from "@portfolio/sanity";
import HeroSection from "./sections/hero";
import TextSection from "./sections/text";
import ImageSection from "./sections/image";
import ServiceSection from "./sections/service";
import GallerySection from "./sections/gallery";
import { ProjectsSection } from "./sections/projects";
import FormSection from "./sections/form";

type Props = {
  sections: PageSection[];
  ispage?: string;
};

export default function RenderSections({ sections, ispage }: Props) {
  //console.log(ispage, "**********");
  return sections.map((section) => {
    switch (section._type) {
      case "heroSection":
        return <HeroSection key={section._key} section={section} />;

      case "textSection":
        return <TextSection key={section._key} section={section} />;

      case "imageSection":
        return <ImageSection key={section._key} section={section} />;

      case "serviceSection":
        return <ServiceSection key={section._key} section={section} />;

      case "gallerySection":
        return <GallerySection key={section._key} section={section} />;

      case "projectsSection":
        return (
          <ProjectsSection
            key={section._key}
            section={section}
            ispage={ispage}
          />
        );

      case "formSection":
        return <FormSection key={section._key} section={section} />;

      default:
        return null;
    }
  });
}
