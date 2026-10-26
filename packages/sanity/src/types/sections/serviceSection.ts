import { CTA } from "../common";

export type ServiceItem = {
  _key: string;
  title: string;
  description?: string;
  cta?: CTA;
};

export type ServiceSection = {
  _key: string;
  _type: "serviceSection";
  title: string;
  services: ServiceItem[];
};
