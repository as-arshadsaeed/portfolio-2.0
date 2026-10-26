import { Page } from "@portfolio/sanity";
import RenderSections from "../RenderSections";

const PageContent = ({ page }: { page: Page }) => {
  return <RenderSections sections={page.sections} ispage={page.slug.current} />;
};
export default PageContent;
