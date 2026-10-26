import { notFound } from "next/navigation";
import RenderSections from "@/components/RenderSections";
import { getHomepage } from "@/lib/server/actions/page";
import { getPageLayout } from "@/lib/page/getPageLayout";
import { resolvePageSections } from "@/lib/resolvers/resolvePageSections";
import { APP_DESCRIPTION, APP_NAME } from "@/constants";

export const revalidate = 60;

export async function generateMetadata() {
  const page = await getHomepage();
  const description = page?.seo?.description?.trim() || APP_DESCRIPTION;
  return {
    title: page?.seo?.title ?? page?.title ?? APP_NAME,
    description: description,
    robots: {
      index: !page?.seo?.noIndex,
      follow: !page?.seo?.noIndex,
    },
  };
}

export default async function HomePage() {
  const page = await getHomepage();
  if (!page) notFound();
  const resolvedSections = await resolvePageSections(page.sections ?? []);
  const layout = getPageLayout(resolvedSections);

  return (
    <main className={getLayoutClass(page.layout)}>
      <RenderSections
        sections={layout.excludeGallerySections}
        ispage={page.slug.current}
      />
      <RenderSections sections={layout.gallerySections} />
    </main>
  );
}

function getLayoutClass(layout?: string) {
  switch (layout) {
    case "full":
      return "max-w-none";

    case "landing":
      return "max-w-screen";

    default:
      return "max-w-6xl mx-auto px-6";
  }
}
