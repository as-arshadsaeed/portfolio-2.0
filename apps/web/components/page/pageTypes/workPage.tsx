import { getAllProjects } from "@/lib/server/actions/projects";
import { getWorkPageSlug } from "@/lib/server/actions/page";
import WorkGrid from "../../work/workGrid";

export default async function WorkPage() {
  const [projectsList, workPage] = await Promise.all([
    getAllProjects(),
    getWorkPageSlug(),
  ]);

  const workSlug = workPage.slug;

  return (
    <>
      <WorkGrid
        data={projectsList}
        columns={[
          {
            key: "title",
            label: "Project",
            className:
              "w-[100%] lg:w-[44%] pb-2 md:pb-4 lg:pb-0 border-b border-b-gray-200 lg:border-0",
          },
          {
            key: "location",
            label: "Location",
            className: "hidden lg:block lg:w-[20%]",
          },
          {
            key: "serviceTitle",
            label: "Expertise",
            className:
              "w-[70%] lg:w-[22%] truncate overflow-hidden text-ellipsis whitespace-nowrap ",
          },
          {
            key: "year",
            label: "Year",
            className: "w-[30%]  lg:w-[14%] text-right",
          },
        ]}
        workSlug={workSlug}
      />
    </>
  );
}
