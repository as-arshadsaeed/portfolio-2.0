import ParallaxImage from "@/components/ui/parallaxImage";
import RichText from "@/components/ui/richText";
import { type ImageSection } from "@portfolio/sanity";
import clsx from "clsx";
import { image } from "@/lib/sanity/image";
import { normalizeText } from "@/app/utils/text";

interface Props {
  section: ImageSection;
}

export default function ImageSectionAbout({ section }: Props) {
  return (
    <section
      className={section.imageDirection === "right" ? "blend-section" : ""}
    >
      <div className="row-wide section bg">
        <div
          className={clsx(
            `
                flex
                flex-col
                gap-20
                md:flex-row
                md:items-start
                
              `,
            section.imageDirection !== "right" ? "md:flex-row-reverse" : "",
          )}
        >
          <div className={clsx("md:w-[40%] text-foreground/80")}>
            <h2 className="whitespace-pre-line text-4xl font-medium mb-6 leading-tight">
              {normalizeText(section.heading)}
            </h2>

            <RichText value={section.content} />
          </div>
          <div className="md:w-[60%]">
            {section?.image && (
              <>
                <div
                  className="
                              relative
                              overflow-hidden
                              rounded-2xl
                              bg-neutral-200
                              aspect-[4/5]
                            "
                >
                  <ParallaxImage
                    src={image.preset(section.image, { width: 780 })}
                    alt={section.caption ?? ""}
                    className="aspect-[4/5] rounded-2xl"
                    yPercent={20}
                    scale={1.25}
                  />
                  <div
                    className="
                                absolute
                                inset-0
                                bg-gradient-to-t
                                from-black/75
                                via-black/10
                                to-transparent
                              "
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
