import { Project, Props } from "@portfolio/sanity";
import TextSectionCTA from "../sections/text/textSectionCTA";

const metaItems = (work: Project) => [
  {
    title: "Role",
    values: work.role ? [work.role] : [],
  },
  {
    title: "Expertise",
    values: work.services ?? [],
  },
  {
    title: "Tech Stack",
    values: work.techStack ?? [],
  },
  {
    title: "Platform",
    values: work.platform ? [work.platform] : [],
  },
  {
    title: "Location",
    values: work.location ? [work.location] : [],
  },
  {
    title: "Year",
    values: work.year ? [String(work.year)] : [],
  },
];

export default function WorkDetailMeta({ work }: Props) {
  return (
    <section>
      <div className="row section-sm relative">
        <div className="flex flex-col flex-wrap gap-y-10 md:-ml-[7%] md:flex-row">
          {metaItems(work).map((item) => (
            <div key={item.title} className="md:basis-1/3 md:pl-[7%]">
              <h5 className="pb-4 text-sm uppercase tracking-wide text-gray-400">
                {item.title}
              </h5>

              <div className="border-t-2 border-foreground/20" />

              <div className="mt-6 flex flex-wrap gap-3">
                {item.values.map((value, i) => (
                  <div
                    key={i}
                    className="rounded-full bg-page-dark/10 px-4 py-2"
                  >
                    {value || "—"}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {work.projectUrl && (
          <div className="absolute right-10 md:right-20 -bottom-25 z-10">
            <TextSectionCTA
              cta={{
                label: "Live Site",
                href: work.projectUrl,
              }}
              pageStyle="home"
            />
          </div>
        )}
      </div>
    </section>
  );
}
