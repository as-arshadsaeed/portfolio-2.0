import { FormSection } from "./formSection";
import { GallerySection } from "./gallerySection";
import { HeroSection } from "./heroSection";
import { ImageSection } from "./imageSection";
import { ProjectsSection } from "./projectsSection";
import { ServiceSection } from "./serviceSection";
import { TextSection } from "./textSection";

export type PageSection =
  | HeroSection
  | TextSection
  | ServiceSection
  | ImageSection
  | GallerySection
  | ProjectsSection
  | FormSection;

export * from "./formSection";
export * from "./gallerySection";
export * from "./heroSection";
export * from "./imageSection";
export * from "./projectsSection";
export * from "./serviceSection";
export * from "./textSection";
