import { Page } from "@portfolio/sanity";
import { Section, SectionText, SectionTitle } from "../ui/section";
import { normalizeText } from "@/app/utils/text";

const PageHeader = ({ page }: { page: Page }) => {
  const rawHeading = page.heading?.trim() || page.title;
  return (
    <Section innerClass="row-wide section">
      <SectionTitle className="text-8xl font-medium leading-tight max-w-5xl whitespace-pre-line">
        {normalizeText(rawHeading)}
      </SectionTitle>

      <SectionText className="mt-5 text-2xl ">{page.description}</SectionText>
    </Section>
  );
};

export default PageHeader;
