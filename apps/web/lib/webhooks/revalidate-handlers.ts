import { revalidatePath } from "next/cache";
import { Payload } from "./types";

function getSlug(slug: Payload["slug"]) {
  return typeof slug === "string" ? slug : slug?.current;
}

export const revalidateHandlers: Record<string, (payload: Payload) => void> = {
  project: (payload) => {
    const slug = getSlug(payload.slug);
    revalidatePath("/work");
    if (slug) {
      revalidatePath(`/work/${slug}`);
    }
  },

  page: (payload) => {
    const slug = getSlug(payload.slug);
    revalidatePath("/");

    if (slug) {
      revalidatePath(`/${slug}`);
    }
  },

  navigation: () => {
    revalidatePath("/", "layout");
    revalidatePath("/");
  },

  siteSettings: () => {
    revalidatePath("/");
  },
};
