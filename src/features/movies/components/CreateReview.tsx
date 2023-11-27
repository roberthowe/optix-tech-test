import {
  Box,
  Button,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";

import { setNotification } from "@/components/Notification";
import {
  clearSelectedMovie,
  selectSelectedMovie,
  useCreateReviewMutation,
} from "@/features/movies";
import { useAppSelector, useAppDispatch } from "@/stores";

interface Values {
  id: string;
  rating: number;
  review: string;
}

const ReviewSchema = Yup.object().shape({
  rating: Yup.number().required("Your Movie Rating is Required"),
  review: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Movie Reviews have to be less than 100 characters!")
    .required("Your Movie Review is Required"),
});

export const CreateReview = () => {
  const [createReview] = useCreateReviewMutation();
  const dispatch = useAppDispatch();
  const selectedMovie = useAppSelector(selectSelectedMovie);
  const { id, title } = selectedMovie;

  const formik = useFormik({
    initialValues: {
      id,
      rating: 0,
      review: "",
    },
    validationSchema: ReviewSchema,
    onSubmit: async (
      values: Values,
      { setSubmitting }: FormikHelpers<Values>
    ) => {
      try {
        await createReview({ data: values });

        setSubmitting(false);
        dispatch(clearSelectedMovie());
        dispatch(
          setNotification({
            value: {
              type: "success",
              title: "Review Submitted",
              message: `Thank you for posting a review for ${title}`,
            },
          })
        );
        formik.resetForm();
      } catch (error) {
        console.error("Error creating review:", error);
      }
    },
  });

  return (
    <>
      {
        <Box sx={{ my: 2, maxWidth: "500px" }}>
          <form onSubmit={formik.handleSubmit}>
            <Typography sx={{ my: 2 }} variant="h2">
              Add a review for {title}
            </Typography>
            <Box sx={{ my: 2 }}>
              <label htmlFor="rating">Rating:</label>
              <Rating
                id="rating"
                name="rating"
                value={formik.values.rating}
                defaultValue={0}
                max={10}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Box>
            <Box sx={{ my: 2 }}>
              <label htmlFor="review">Review:</label>
              <TextField
                fullWidth
                id="review"
                name="review"
                value={formik.values.review}
                multiline
                rows={4}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.review && Boolean(formik.errors.review)}
                helperText={formik.touched.review && formik.errors.review}
              />
            </Box>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" type="submit">
                Submit Review
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => dispatch(clearSelectedMovie())}
              >
                Cancel
              </Button>
            </Stack>
          </form>
        </Box>
      }
    </>
  );
};
