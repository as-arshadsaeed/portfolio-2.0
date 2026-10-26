import RichText from "@/components/ui/richText";
import type { ImageSection } from "@portfolio/sanity";

interface Props {
  section: ImageSection;
}

export default function ImageSectionDefault({ section }: Props) {
  return (
    <section>
      <div className="row-wide section">
        <h2 className="text-5xl font-medium mb-20">{section.heading}</h2>

        <div className="gap-10">
          <RichText value={section.content} />
        </div>
      </div>
    </section>
  );
}
