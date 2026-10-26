import { SiteSettings } from "@portfolio/sanity";

type SocialLink = NonNullable<SiteSettings["socialLinks"]>[number];

type Props = {
  links?: SiteSettings["socialLinks"];
};

const SocialLinks = ({ links = [] }: Props) => {
  return (
    <ul className="flex gap-6">
      {links
        .filter((link): link is SocialLink => Boolean(link?.enabled))
        .map((link) => (
          <li key={link._key}>
            <a
              href={link.url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline capitalize"
            >
              {link.platform}
            </a>
          </li>
        ))}
    </ul>
  );
};

export default SocialLinks;
