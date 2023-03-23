import { apiService } from "./api";

export const questionsService = apiService.injectEndpoints({
  endpoints: (build) => ({
    getQuestions: build.query({
      query: () => ({ method: "GET", url: "api/v1/questions" }),
      providesTags: ["Questions"],
    }),
    getQuestionByID: build.query({
      query: (ID) => ({ method: "GET", url: `api/v1/questions/${ID}` }),
      providesTags: ["Questions"],
    }),
    getQuestionsByTags: build.query({
      query: ({ tags, operation }) => ({
        method: "GET",
        url: `api/v1/questions/tagSearch/${tags}?operation=${operation}`,
      }),
      providesTags: ["Questions"],
    }),
    getQuestionsByTagsForVisual: build.query({
      query: ({ tag }) => ({
        method: "GET",
        url: `api/v1/questions/tagSearch/${tag}?operation=any`,
      }),
      providesTags: ["Questions"],
      transformResponse: (returned, _, args) => {
        let returnedTemp;
        if (!Array.isArray(returned)) {
          returnedTemp = [];
        } else {
          returnedTemp = returned;
        }

        const map1 = new Map(
          args.tag.map((obj) => {
            return [obj, 0];
          })
        );
        for (let item of returnedTemp) {
          for (let tag of item?.tags) {
            if (map1.has(tag)) map1.set(tag, map1.get(tag) + 1);
          }
        }
        const arr = Array.from(map1, function (item) {
          return { label: item[0], value: item[1] };
        });
        return arr;
      },
    }),
    deleteQuestionByID: build.mutation({
      query: (ID) => ({ method: "DELETE", url: `api/v1/questions/${ID}` }),
      invalidatesTags: ["Questions", "Tags"],
    }),
  }),
});

// Auto-generated hooks
export const {
  useGetQuestionsQuery,
  useGetQuestionByIDQuery,
  useGetQuestionsByTagsForVisualQuery,
  useGetQuestionsByTagsQuery,
  useDeleteQuestionByIDMutation,
} = questionsService;
