import type { ServiceSection as ServiceSectionType } from "@portfolio/sanity";
import Magnetic from "@/components/ui/magnetic";

interface Props {
  section: ServiceSectionType;
}

export default function ServiceSection({ section }: Props) {
  return (
    <section
      className="blend-section"
      data-bgcolor-start="var(--background)"
      data-bgcolor-end="var(--blend)"
      data-bgcolor=""
    >
      <div className="row-wide section ">
        <h2 className="text-[clamp(2.75em,5vw,4.5em)] md:font-medium leading-tight mb-10 md:mb-20">
          {section.title}
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {section.services?.map((s, i) => (
            <div key={s._key}>
              <p className="text-page-dark/50 mb-6 font-medium">
                {String(i + 1).padStart(2, "0")}
              </p>

              <div className="border-t border-foreground/20" />

              <h4 className="text-[clamp(1.55em,2.3vw,2.5em)] md:font-medium font-lato text-primary my-6 lg:my-10">
                {s.title}
              </h4>

              {s.description && (
                <p className="text-base lg:text-xl leading-7 lg:leading-relaxed">
                  {s.description}
                </p>
              )}

              {s.cta?.label && s.cta?.href && (
                <Magnetic
                  as="link"
                  href={s.cta?.href}
                  variant="primary"
                  textStrength={20}
                  className="mt-10"
                >
                  {s.cta.label}
                </Magnetic>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
