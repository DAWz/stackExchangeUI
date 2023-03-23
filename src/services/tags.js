import { apiService } from "./api";

export const tagsService = apiService.injectEndpoints({
  endpoints: (build) => ({
    getTags: build.query({
      query: () => ({ method: "GET", url: "api/v1/tags" }),
      providesTags: ["Tags"],
    }),
  }),
});

// Auto-generated hooks
export const { useGetTagsQuery } = tagsService;
