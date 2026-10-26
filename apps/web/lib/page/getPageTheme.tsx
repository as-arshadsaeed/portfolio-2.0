export type PageTheme = {
  background: string;
  text: string;
};

export function getPageTheme(pathname: string): PageTheme {
  const isDarkPage =
    pathname.startsWith("/blog") || pathname.startsWith("/contact");

  return {
    background: isDarkPage ? "bg-page-dark" : "bg-transparent",

    text: isDarkPage ? "text-page-dark-foreground" : "text-foreground",
  };
}
