import { baseApi } from "../base";

import { endpointAdmin } from "@/helpers/enpoints";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createUsersFromExcel: build.mutation({
      query: (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: endpointAdmin.REGISTER_AUTO_EXCEL,
          method: "POST",
          body: formData,
          flashError: true,
        };
      },
    }),
  }),
});

export const { useCreateUsersFromExcelMutation } = adminApi;
