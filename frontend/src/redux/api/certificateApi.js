import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const certificateApi = createApi({
  reducerPath: "certificateApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL || "/api/v1" }),
  tagTypes: ["Certificate"],
  endpoints: (builder) => ({
    getCertificateById: builder.query({
      query: (certificateId) => `/certificates/verify/${encodeURIComponent(certificateId)}`,
      providesTags: (_result, _error, certificateId) => [{ type: "Certificate", id: certificateId }],
    }),
  }),
});

export const { useGetCertificateByIdQuery } = certificateApi;
