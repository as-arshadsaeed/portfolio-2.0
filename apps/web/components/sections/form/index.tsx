"use client";
import { FormSection as FormSectionType } from "@portfolio/sanity";

import { DynamicForm } from "./dynamicForm";
import Magnetic from "@/components/ui/magnetic";
import { useGlobalLayout } from "@/context/GlobalLayoutProvider";
import {
  selectFooter,
  selectSocialLinks,
} from "@/lib/shared/settings/selectors";

type Props = {
  section: FormSectionType;
};

type ContactItem = {
  key: string;
  value?: string;
  href: (value: string) => string;
  label?: string;
};

export const getContactMap = (contact?: {
  email?: string;
  phone?: string;
}): ContactItem[] => [
  {
    key: "email",
    value: contact?.email,
    href: (v) => `mailto:${v}`,
  },
  {
    key: "phone",
    value: contact?.phone,
    href: (v) => `tel:${v}`,
  },
];

export default function FormSection({ section }: Props) {
  const { siteSettings } = useGlobalLayout();
  const footer = selectFooter(siteSettings);
  const socialLinks = selectSocialLinks(siteSettings);
  const contactMap = [
    {
      key: "email",
      value: footer?.contact.email,
      href: (v: string) => `mailto:${v}`,
    },
    {
      key: "phone",
      value: footer?.contact.phone,
      href: (v: string) => `tel:${v}`,
    },
  ];
  return (
    <section>
      <div className="row-wide section">
        <div className="flex flex-col-reverse md:flex-row gap-10 md:gap-20">
          <DynamicForm form={section.form} />
          <div className="min-w-52">
            <div className="mb-10">
              {section.heading && (
                <h4 className="text-xs uppercase opacity-50 mb-2">
                  {section.heading}
                </h4>
              )}
              {contactMap
                .filter((c): c is typeof c & { value: string } =>
                  Boolean(c.value),
                )
                .map((c) => (
                  <div key={c.key} className="mb-2">
                    <Magnetic
                      as="link"
                      href={c.href(c.value!)}
                      variant="blank"
                      innerClassName="lowercase"
                    >
                      {c.value}
                    </Magnetic>
                  </div>
                ))}
            </div>

            <div>
              <h4 className="text-xs uppercase opacity-50 mb-2">Follow Me</h4>
              <ul className="flex gap-6 md:block">
                {socialLinks.map((link) => (
                  <li key={link._key} className="mb-2">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline capitalize"
                    >
                      {link.platform}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
