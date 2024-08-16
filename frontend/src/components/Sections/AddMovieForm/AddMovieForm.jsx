import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useLoadingOverlay } from "../../../contexts/loadingOverlayContext";
import { useAddMovie } from "../../../hooks/useMovieList";
import Button from "../../UI/Button/Button";
import FormRow from "../../UI/FormRow/FormRow";
import styles from "./AddMovieForm.module.scss";

function AddMovieForm({ onSubmit = () => {}, onSuccess = () => {}, movieId }) {
  const { setIsLoading } = useLoadingOverlay();
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { addMovie, status } = useAddMovie();
  const { errors } = formState;

  useEffect(() => {
    setIsLoading(status === "pending");
  }, [status, setIsLoading]);

  function handleAdd(data) {
    onSubmit();
    addMovie(
      { movieId, recommendedByName: data.name },
      {
        onSuccess: () => {
          return onSuccess();
        },
      },
    );
  }

  function onError(error) {}

  return (
    <form
      className={styles.addForm}
      onSubmit={handleSubmit(handleAdd, onError)}
    >
      <FormRow
        label="Recommended by (optional)"
        containerClassName={styles.line}
        error={errors?.email?.message}
      >
        <input type="text" id="name" autoCorrect="off" {...register("name")} />
      </FormRow>

      <div className={styles.submitRow}>
        <Button className={styles.submitBtn}>Add Movie</Button>
      </div>
    </form>
  );
}

export default AddMovieForm;
