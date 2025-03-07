import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

import { constants } from "@/settings";

const baseQuery = fetchBaseQuery({
  baseUrl: constants.API_SERVER,
  prepareHeaders: (headers) => {
    const accessToken = Cookies.get("_access_token");
    headers.set("Content-Type", "application/json");

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});
export const baseApi = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({}),
  refetchOnMountOrArgChange: true,
});
