import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { API_URL } from "@/config";

import { Company, CreateReviewDTO, Movie, Review } from "../types";

export const moviesApi = createApi({
  reducerPath: "movies",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getMovies: builder.query<Movie[], void>({
      queryFn: async (_arg, _queryApi, _extraOptions, fetchWithBQ) => {
        try {
          const [moviesResult, movieCompaniesResult] = await Promise.all([
            fetchWithBQ("movies"),
            fetchWithBQ("movieCompanies"),
          ]);

          if (moviesResult.error) {
            throw moviesResult.error as FetchBaseQueryError;
          }

          if (movieCompaniesResult.error) {
            throw movieCompaniesResult.error as FetchBaseQueryError;
          }

          const moviesData = moviesResult.data as Movie[];
          const movieCompaniesData = movieCompaniesResult.data as Company[];

          const movies = moviesData.map((movie: Movie) => {
            const companyName: string =
              movieCompaniesData?.find(
                (company: Company) => company.id === movie.filmCompanyId,
              )?.name || "Film Company Unknown";
            const averageReview: number = Number(
              (
                movie.reviews.reduce(
                  (accumulator: number, review: number) => accumulator + review,
                  0,
                ) / movie.reviews.length
              ).toFixed(1),
            );

            return {
              ...movie,
              averageReview,
              companyName,
            };
          });

          return { data: movies };
        } catch (error) {
          throw error as FetchBaseQueryError;
        }
      },
    }),
    createReview: builder.mutation<Review, CreateReviewDTO>({
      query: (data) => ({
        url: `/submitReview`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetMoviesQuery, useCreateReviewMutation } = moviesApi;

export default moviesApi;
