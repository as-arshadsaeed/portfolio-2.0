import { notFound } from "next/navigation";
import { getPageBySlug, getWorkPageSlug } from "@/lib/server/actions/page";
import { getProject, getAllProjects } from "@/lib/server/actions/projects";
import WorkDetailSection from "@/components/work/workDetail";
import WorkDetailNextCase from "@/components/work/workDetailNextCase";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; projectSlug: string }>;
}) {
  const { slug, projectSlug } = await params;

  const [page, project] = await Promise.all([
    getPageBySlug(slug),
    getProject(projectSlug),
  ]);

  return {
    title: project?.title ?? page?.seo?.title,
    description: project.description ?? page?.seo?.description,
    robots: {
      index: !page?.seo?.noIndex,
      follow: !page?.seo?.noIndex,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{
    slug: string;
    projectSlug: string;
  }>;
}) {
  const { slug, projectSlug } = await params;

  const page = await getPageBySlug(slug);

  if (!page || page.pageType !== "work") {
    notFound();
  }

  const project = await getProject(projectSlug);

  if (!project) {
    notFound();
  }
  const [workPage, projects] = await Promise.all([
    getWorkPageSlug(),
    getAllProjects(),
  ]);

  const index = projects.findIndex((p) => p.slug === projectSlug);
  const nextProject = projects[index + 1] || projects[0];

  return (
    <>
      <WorkDetailSection work={project} />
      <WorkDetailNextCase
        nextProject={nextProject}
        workSlug={workPage.slug || ""}
      />
    </>
  );
}
