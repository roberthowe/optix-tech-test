import {
  Card,
  CardContent,
  Dialog,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";
import useMedia from "react-use/lib/useMedia";

import { CreateReview, MoviesList } from "@/features/movies";
import { selectSelectedMovie, useAppSelector } from "@/stores";

export const Movies = () => {
  const isMobile = useMedia("(max-width: 768px)");
  const selectedMovie = useAppSelector(selectSelectedMovie);
  const isSelectedMovie = selectedMovie.id !== "";

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={7}>
        <Card>
          <CardContent>
            <Typography variant="h1">Welcome to Movie database!</Typography>
            <MoviesList />
            {isMobile && (
              <Dialog open={isSelectedMovie}>
                <DialogContent>
                  <CreateReview />
                </DialogContent>
              </Dialog>
            )}
            {!isMobile && isSelectedMovie && <CreateReview />}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
