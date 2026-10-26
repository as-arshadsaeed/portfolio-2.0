import Magnetic from "@/components/ui/magnetic";
import type { CTA } from "@portfolio/sanity";

interface Props {
  cta?: CTA;
  pageStyle?: string;
}

export default function TextSectionCTA({ cta, pageStyle }: Props) {
  if (!cta?.label || !cta?.href) {
    return null;
  }
  return (
    <Magnetic
      as="link"
      href={cta.href}
      variant={pageStyle === "home" ? "circle" : "primary"}
      className={
        pageStyle === "home"
          ? "cursor-pointer bg-gray-700 md:text-xl translate-y-14"
          : "mt-10"
      }
      innerClassName={pageStyle === "home" ? "text-white" : ""}
      strength={pageStyle === "home" ? 100 : 40}
      textStrength={pageStyle === "home" ? 40 : 20}
      target="_blank"
    >
      {cta.label}
    </Magnetic>
  );
}
