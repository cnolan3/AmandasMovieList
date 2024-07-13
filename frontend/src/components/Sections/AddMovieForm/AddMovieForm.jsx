import { useForm } from "react-hook-form";

import { useAddMovie } from "../../../hooks/useMovieList";
import Button from "../../UI/Button/Button";
import FormRow from "../../UI/FormRow/FormRow";
import styles from "./AddMovieForm.module.scss";

function AddMovieForm({ onSubmit, onSuccess, movieId }) {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { addMovie, status } = useAddMovie();
  const { errors } = formState;

  function handleAdd(data) {
    console.log("add", data);
    onSubmit();
    addMovie(
      { movieId, recommendedByName: data.name },
      { onSuccess: () => onSuccess() },
    );
  }

  function onError(error) {}

  return (
    <form
      className={styles.addForm}
      onSubmit={handleSubmit(handleAdd, onError)}
    >
      <FormRow
        label="Recommended by"
        isDark={false}
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

