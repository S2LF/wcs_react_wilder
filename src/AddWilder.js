import React from "react";
import { Button, Error, Form, Input, Label } from "./styles/form-elements";
import { ReactComponent as loadIcon} from './icons/hourglass.svg';
import useCreateWilder from "./hooks/useCreateWilder";

function AddWilder({onSuccess}) {

const {
  inputCity, 
  inputName,
  formSubmission,
  loading,
  delayed,
  error,
} = useCreateWilder(onSuccess);


  return (
    <Form
      onSubmit={formSubmission}
    >
      <Label htmlFor="name-input">Name :</Label>
      <Input
        id="name-input"
        type="text"
        placeholder="Type the name"
        {...inputName}
      />
      <Label htmlFor="city-input">City :</Label>
      <Input
        id="city-input"
        type="text"
        placeholder="Type the city"
        {...inputCity}
      />
      {error !== "" && <Error>{error}</Error>}
      <Button disabled={loading} showLoading={loading && !delayed}>
        { loading && !delayed ? (
          <img src={loadIcon} alt="loading" />
        ) : (
          "Add"
          )}
      </Button>
    </Form>
  );
}

export default AddWilder;

