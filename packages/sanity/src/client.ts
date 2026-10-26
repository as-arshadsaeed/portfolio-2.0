import { createClient, type ClientConfig } from "@sanity/client";

export const createSanityService = (config: ClientConfig) => {
  const client = createClient(config);
  return {
    client,

    fetch: client.fetch.bind(client),
  };
};
