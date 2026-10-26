import type { HeroSection as HeroSectionType } from "@portfolio/sanity";
import HeroSectionHome from "./heroSectionHome";
import HeroSectionDefault from "./heroSectionDefault";

interface Props {
  section: HeroSectionType;
}

const HeroSection = ({ section }: Props) => {
  switch (section.pageStyle) {
    case "home":
      return <HeroSectionHome section={section} />;

    default:
      return <HeroSectionDefault section={section} />;
  }
};

export default HeroSection;
