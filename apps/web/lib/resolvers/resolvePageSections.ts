import {
  getAllProjects,
  getFeaturedProjects,
} from "@/lib/server/actions/projects";
import { PageSection } from "@portfolio/sanity";

export async function resolvePageSections(
  sections: PageSection[],
): Promise<PageSection[]> {
  return Promise.all(
    sections.map(async (section) => {
      if (section._type !== "projectsSection") {
        return section;
      }

      const projects =
        section.mode === "featured"
          ? await getFeaturedProjects()
          : await getAllProjects();

      return {
        ...section,
        projects,
      };
    }),
  );
}
