import { GALLERY_FIELDS } from "./gallery";

export const FORM_FIELDS = `
{
  _id,
  title,
  fields[]{
    _key,
    label,
    fieldname,
    type,
    options,
    placeholder,
    helpText,
    validation{
      required,
      minLength,
      maxLength
    }
  }
}
`.trim();

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0]{
    _id,
    _createdAt,
    _updatedAt,

    title,
    logo,
    logoTitle,
    footerTitle,

    footerCta {
      label,
      href
    },

    contact {
      phone,
      email
    },

    socialLinks[] {
      ... 
    }
  }
`.trim();

const SECTION_RESOLVERS = `
sections[]{
  ...,
  _type == "gallerySection" => {
    ...,
    gallery->${GALLERY_FIELDS}
  },
  _type == "formSection" => {
    ...,
    form->${FORM_FIELDS}
  }
}
`.trim();

export const PAGE_FIELDS = `
  _id,
  _createdAt,
  _updatedAt,

  title,
  heading,
  slug,
  pageType,
  description,
  layout,
  "seo": {
    "title": coalesce(seo.title, title),
    "description": coalesce(seo.description, description),
    "noIndex": coalesce(seo.noIndex, false),
    "image": seo.image
  },
  ${SECTION_RESOLVERS}
`;

export const ALL_PAGES_QUERY = `
  *[_type == "page"] | order(title asc) {
    ${PAGE_FIELDS}
  }
`;

export const HOME_PAGE_QUERY = `
  *[_type == "page" && slug.current == "home"][0]{
    ${PAGE_FIELDS}
  }
`;

export const PAGE_BY_SLUG_QUERY = `
  *[_type == "page" && slug.current == $slug][0]{
    ${PAGE_FIELDS}
  }
`;

export const PAGE_SLUGS_QUERY = `
  *[_type == "page" && defined(slug.current)][]{
    "slug": slug.current
  }
`;

export const WORK_PAGE_QUERY = `
  *[
    _type == "page" &&
    pageType == "work"
  ][0]{
    title,
    "slug": slug.current
  }
`;

export const WORK_PAGE_SLUG_QUERY = `
  *[
    _type == "page" &&
    pageType == "work"
  ][0]{
    "slug": slug.current
  }
`;
