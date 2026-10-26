import type { ProjectsSection as ProjectsSectionType } from "@portfolio/sanity";
import WorkGrid from "../../work/workGrid";
import { getProjectsMin } from "@/lib/server/actions/projects";
import { getWorkPageSlug } from "@/lib/server/actions/page";
import {
  HOME_PROJECT_COLUMNS,
  PAGE_PROJECT_COLUMNS,
} from "../../work/workGridColumns";

interface Props {
  section: ProjectsSectionType;
  ispage?: string;
}

export async function ProjectsSection({ section, ispage }: Props) {
  const [workPage, projects] = await Promise.all([
    getWorkPageSlug(),
    getProjectsMin(),
  ]);
  const sectionProjectCount = section.projects?.length ?? 0;

  return (
    <WorkGrid
      data={section.projects ?? []}
      columns={ispage === "home" ? HOME_PROJECT_COLUMNS : PAGE_PROJECT_COLUMNS}
      workSlug={workPage?.slug ?? "work"}
      projectCount={projects.length - sectionProjectCount}
    />
  );
}
