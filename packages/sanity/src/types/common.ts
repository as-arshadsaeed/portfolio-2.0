export type CTA = {
  label: string;
  href: string;
};

export type IMAGE = {
  asset?: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
};

export type SEO = {
  title: string;
  description?: string;
  noIndex: boolean;
  image?: any;
};
