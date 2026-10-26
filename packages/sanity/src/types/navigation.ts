export type PageNavItem = {
  _key: string;
  label: string;
  linkType: "page";
  page: {
    slug?: {
      current?: string;
    };
  };
  openInNewTab?: boolean;
};

export type CustomNavItem = {
  _key: string;
  label: string;
  linkType: "custom";
  url: string;
  openInNewTab?: boolean;
};

export type NavItem = PageNavItem | CustomNavItem;

export type Navigation = {
  title: string;
  menuItems: NavItem[];
};
