import type { TextSection as TextSectionType } from "@portfolio/sanity";

import TextSectionHome from "./textSectionHome";
import TextSectionDefault from "./textSectionDefault";

interface Props {
  section: TextSectionType;
}

export default function TextSection({ section }: Props) {
  switch (section.pageStyle) {
    case "home":
      return <TextSectionHome section={section} />;

    default:
      return <TextSectionDefault section={section} />;
  }
}
