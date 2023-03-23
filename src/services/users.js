import { apiService } from "./api";

export const usersService = apiService.injectEndpoints({
  endpoints: (build) => ({
    getUserByID: build.query({
      query: (ID) => ({ method: "GET", url: `api/v1/user/${ID}` }),
      providesTags: ["User"],
    }),
  }),
});

// Auto-generated hooks
export const { useGetUserByIDQuery } = usersService;
