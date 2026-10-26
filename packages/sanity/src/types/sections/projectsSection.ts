import { GalleryImage } from "./gallerySection";

export type Props = {
  work: Project;
};

export interface Project {
  _id: string;
  _type: "project";
  _createdAt?: string;
  _updatedAt?: string;

  title: string;
  slug: string;
  description?: string;

  location?: string;
  serviceTitle?: string;
  year?: number;

  backgroundColor?: string;

  featured?: boolean;

  platform?: string;

  role?: string;

  projectUrl?: string;

  services?: string[];

  techStack?: string[];

  thumbnail?: {
    _type: "image";
    asset?: {
      _ref: string;
      _type: "reference";
    };
  };

  images?: GalleryImage[];

  mobileImages?: GalleryImage[];
}
export interface ProjectsSection {
  _key: string;
  _type: "projectsSection";

  title: string;
  mode: string;

  projects?: Project[];
}
