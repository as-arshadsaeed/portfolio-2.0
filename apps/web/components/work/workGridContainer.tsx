import { getWorkPageSlug } from "@/lib/server/actions/page";
import {
  getFeaturedProjects,
  getProjectsMin,
} from "@/lib/server/actions/projects";
import WorkGrid from "./workGrid";

export async function WorkGridContainer() {
  const [featuredProjects, workPage, projects] = await Promise.all([
    getFeaturedProjects(),
    getWorkPageSlug(),
    getProjectsMin(),
  ]);

  return (
    <WorkGrid
      data={featuredProjects}
      columns={[
        {
          key: "title",
          label: "Recent Project",
          className:
            "w-[100%] lg:w-[70%] pb-2 md:pb-4 lg:pb-0 border-b border-b-gray-200 lg:border-0",
        },
        { key: "location", label: "", className: "lg:w-[20%] hidden" },
        { key: "serviceTitle", label: "", className: "w-[70%] lg:w-[30%]" },
        {
          key: "year",
          label: "",
          className: "w-[30%]  lg:w-[14%] text-right lg:hidden",
        },
      ]}
      workSlug={workPage.slug}
      projectCount={projects.length}
    />
  );
}
