export const IMAGE_FIELDS = `
_key,
alt,
image{
  asset
}
`.trim();

export const PROJECT_BASE_FIELDS = `
_id,
title,
"slug": slug.current,
year,
location,
serviceTitle,
backgroundColor,
"thumbnail": thumbnail.asset->url
`.trim();

/**
 * FULL PROJECT FIELDS
 * IMPORTANT: flatten everything into ONE projection string
 */

export const PROJECT_FIELDS = `
${PROJECT_BASE_FIELDS},
_createdAt,
_updatedAt,
description,
featured,
platform,
role,
projectUrl,
services,
techStack,
images[]{ ${IMAGE_FIELDS} },
mobileImages[]{ ${IMAGE_FIELDS} }
`.trim();

export const PROJECT_BY_SLUG_QUERY = `
*[
  _type == "project" &&
  slug.current == $projectSlug
][0]{
${PROJECT_FIELDS}
}
`;

export const PROJECTS_BY_QUERY = `
*[_type == "project"]
| order(orderRank asc) {
${PROJECT_BASE_FIELDS}
}
`;

export const PROJECTS_BY_FEATURED_QUERY = `
*[
  _type == "project" &&
  featured == true
]
| order(orderRank asc) {
${PROJECT_BASE_FIELDS}
}
`;

export const PROJECTS_MIN_QUERY = `
*[
  _type == "project"
]
| order(orderRank asc) {
  _id,
  title,
  "slug": slug.current,
}
`;
