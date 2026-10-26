import type { QueryParams, SanityClient } from "@sanity/client";

export const fetchSanity = async <T>(
  client: SanityClient,
  query: string,
  params: QueryParams = {},
): Promise<T> => {
  return client.fetch<T>(query, params);
};
