import { Props } from "@portfolio/sanity";
import { Section, SectionText, SectionTitle } from "@/components/ui/section";

export default function WorkDetailHeader({ work }: Props) {
  return (
    <>
      <Section innerClass="row-wide section">
        <SectionTitle className="text-8xl font-medium leading-tight">
          {work.title}
        </SectionTitle>
        <SectionText className="text-2xl mt-5">{work.description}</SectionText>
      </Section>
    </>
  );
}
