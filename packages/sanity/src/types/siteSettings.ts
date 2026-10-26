export type SiteSettings = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;

  title: string;

  logo?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    alt?: string;
  };

  logoTitle: string;
  footerTitle: string;

  footerCta?: {
    label?: string;
    href?: string;
  };

  contact: {
    phone: string;
    email: string;
  };

  socialLinks?: Array<{
    _key: string;
    platform?: string;
    url?: string;
    icon?: string;
    enabled: boolean;
  }>;
};
