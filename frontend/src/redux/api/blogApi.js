import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL || "/api/v1" }),
  tagTypes: ["Blogs", "Blog"],
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: (page = 1) => ({
        url: "/blogs",
        params: { page },
      }),
      providesTags: (result) =>
        result?.blogs
          ? [
              ...result.blogs.map(({ slug }) => ({ type: "Blog", id: slug })),
              { type: "Blogs", id: "LIST" },
            ]
          : [{ type: "Blogs", id: "LIST" }],
    }),
    getBlog: builder.query({
      query: (slug) => `/blogs/${slug}`,
      providesTags: (_res, _err, slug) => [{ type: "Blog", id: slug }],
    }),
    createBlog: builder.mutation({
      query(body) {
        return {
          url: "/blogs",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Blogs", id: "LIST" }],
    }),
    toggleUpvote: builder.mutation({
      query(id) {
        return {
          url: `/blogs/${id}/upvote`,
          method: "POST",
        };
      },
    }),
    uploadBlogImage: builder.mutation({
      query(body) {
        return {
          url: "/blogs/upload-image",
          method: "POST",
          body,
        };
      },
    }),
    deleteBlog: builder.mutation({
      query(id) {
        return {
          url: `/blogs/id/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Blogs", id: "LIST" }],
    }),
    updateBlog: builder.mutation({
      query({ id, body }) {
        return {
          url: `/blogs/id/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (_r, _e, { slug }) => [
        { type: "Blogs", id: "LIST" },
        slug ? { type: "Blog", id: slug } : { type: "Blog", id: "UNKNOWN" },
      ],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogQuery,
  useCreateBlogMutation,
  useToggleUpvoteMutation,
  useUploadBlogImageMutation,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} = blogApi;
