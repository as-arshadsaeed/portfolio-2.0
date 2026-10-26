export const NAVIGATION_QUERY = `
*[_type == "navigation"][0]{
  title,
  menuItems[]{
    _key,
    label,
    linkType,
    openInNewTab,

    // Only fetch what is needed
    url,

    page->{
      slug
    }
  }
}
`;
