import { createApi } from "@reduxjs/toolkit/query/react";
import Axios from "axios";

const axiosBaseQuery =
  () =>
  async ({ url, method, data, params }) => {
    try {
      Axios.defaults.baseURL =
        "http://ec2-13-53-245-221.eu-north-1.compute.amazonaws.com/";
      const result = await Axios({
        url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      const error = axiosError;
      if (error.response.status === 404 || error.response.status === 400) {
        return [];
      } else
        return {
          error,
        };
    }
  };

export const apiService = createApi({
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
});
