import RichText from "@/components/ui/richText";

import type { TextSection } from "@portfolio/sanity";

import TextSectionCTA from "./textSectionCTA";

interface Props {
  section: TextSection;
}

export default function TextSectionDefault({ section }: Props) {
  return (
    <section>
      <div className="row-wide section">
        <h2 className="text-5xl font-medium mb-20">{section.heading}</h2>

        <div className="gap-10">
          <RichText value={section.content} />

          <TextSectionCTA cta={section.cta} pageStyle={section.pageStyle} />
        </div>
      </div>
    </section>
  );
}
