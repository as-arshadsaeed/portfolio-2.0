import { selectFooter, selectHeader } from "@/lib/shared/settings/selectors";
import { getSiteSettings } from "./get-site-settings";

export async function getLayoutSettings() {
  const settings = await getSiteSettings();

  return {
    header: selectHeader(settings),
    footer: selectFooter(settings),
    raw: settings,
  };
}
