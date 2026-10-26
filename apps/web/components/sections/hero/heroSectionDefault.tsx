import Magnetic from "@/components/ui/magnetic";
import ParallaxImage from "@/components/ui/parallaxImage";
import RichText from "@/components/ui/richText";
import { image } from "@/lib/sanity/image";
import type { HeroSection as HeroSectionType } from "@portfolio/sanity";

interface Props {
  section: HeroSectionType;
}

const HeroSectionDefault = ({ section }: Props) => {
  return (
    <section
      style={{
        backgroundColor: section.backgroundColor?.hex ?? "#ffffff",
      }}
      className="relative overflow-hidden"
    >
      <div className="row-wide section">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Content */}
          <div>
            {section.subtitle && (
              <p className="mb-4 text-sm uppercase tracking-widest text-gray-500">
                {section.subtitle}
              </p>
            )}

            <h1 className="mb-8 text-5xl font-medium leading-tight lg:text-7xl">
              {section.title}
            </h1>

            {section.content && (
              <div className="max-w-2xl">
                <RichText value={section.content} />
              </div>
            )}

            {section.cta?.label && section.cta?.href && (
              <div className="mt-10">
                <Magnetic
                  as="link"
                  href={section.cta.href}
                  variant="primary"
                  textStrength={20}
                >
                  {section.cta.label}
                </Magnetic>
              </div>
            )}
          </div>

          {/* Media */}
          <div>
            {section.mediaType === "video" && section.video ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="aspect-[4/5] w-full rounded-2xl object-cover"
              >
                <source src={section.video} />
              </video>
            ) : section.image ? (
              <div className="overflow-hidden rounded-2xl">
                <ParallaxImage
                  src={image.preset(section.image, { width: 800 })}
                  alt={section.image.alt ?? section.title}
                  className="aspect-[4/5] rounded-2xl"
                  yPercent={15}
                  scale={1.15}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionDefault;
