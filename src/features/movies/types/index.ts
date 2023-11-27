export interface Movie {
  id: string;
  reviews: number[];
  averageReview: number;
  title: string;
  filmCompanyId: string;
  cost: number;
  releaseYear: number;
  companyName: string;
}

export interface Company {
  id: string;
  name: string;
}

export interface Review {
  movieId: string;
  rating: number;
  review: string;
}

export interface SelectedMovie {
  value: { id: string; title: string };
}

export type CreateReviewDTO = {
  data: {
    id: string;
    rating: number;
    review: string;
  };
};
