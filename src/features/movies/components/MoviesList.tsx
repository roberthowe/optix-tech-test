import {
  Box,
  Button,
  CircularProgress,
  Rating,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridEventListener,
  GridRenderCellParams,
} from "@mui/x-data-grid";

import { setSelectedMovie, useGetMoviesQuery } from "@/features/movies";
import { useAppDispatch } from "@/stores";

const tableColumns = [
  { field: "title", headerName: "Title", width: 200, sortable: false },
  {
    field: "averageReview",
    headerName: "Review",
    sortable: true,
    width: 300,
    renderCell: (params: GridRenderCellParams<any, number>) => (
      <>
        <Rating
          name="half-rating-read"
          defaultValue={params.value}
          max={10}
          readOnly
          precision={0.1}
          sx={{ mr: "5px" }}
        />
        {params.value}
      </>
    ),
  },
  {
    field: "companyName",
    headerName: "Film Company",
    width: 200,
    sortable: false,
  },
];

export const MoviesList = () => {
  const {
    data: movies,
    error: moviesError,
    isLoading: moviesLoading,
    isFetching: moviesFetching,
    refetch: refetchMovies,
  } = useGetMoviesQuery();
  const dispatch = useAppDispatch();

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    const { id, title } = params.row;
    dispatch(setSelectedMovie({ value: { id, title } }));
  };

  if (moviesLoading || moviesFetching) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (moviesError) {
    console.error("Error fetching movies:", moviesError);
    return (
      <Typography sx={{ my: 2 }} variant="h2">
        Error fetching movies
      </Typography>
    );
  }

  return (
    <>
      <Typography sx={{ my: 2 }} variant="h2">
        Total Movies fetched {movies?.length}
      </Typography>
      <Box sx={{ width: "100%" }}>
        {movies && (
          <DataGrid
            columns={tableColumns}
            rows={movies}
            hideFooter={true}
            onRowClick={handleRowClick}
          />
        )}
      </Box>
      <Button
        sx={{ my: 2 }}
        variant="contained"
        onClick={() => refetchMovies()}
      >
        Refresh Movie List
      </Button>
    </>
  );
};
