import { notFound } from "next/navigation";
import { resolvePageSections } from "@/lib/resolvers/resolvePageSections";
import { getPageLayout } from "@/lib/page/getPageLayout";
import { getPageBySlug } from "@/lib/server/actions/page";
import BlendEffect from "@/components/blendEffect";
import PageHeader from "@/components/page/pageHeader";
import PageContent from "@/components/page/pageContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const page = await getPageBySlug(slug);

  return {
    title: page?.seo?.title ?? page?.title,
    description: page?.seo?.description,
    robots: {
      index: !page?.seo?.noIndex,
      follow: !page?.seo?.noIndex,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const page = await getPageBySlug(slug);

  if (!page) notFound();

  const layout = getPageLayout(page);

  const resolvedSections = await resolvePageSections(page.sections ?? []);

  const isAbout = slug === "about";

  return (
    <>
      {isAbout && <BlendEffect />}
      {!layout.hasHeroSection && <PageHeader page={page} />}
      <PageContent
        page={{
          ...page,
          sections: resolvedSections,
        }}
      />
    </>
  );
}
