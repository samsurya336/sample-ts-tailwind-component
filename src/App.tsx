import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import TextInput from "./Component/InputFields";
import { StateType } from "./types";
import { InputStatus_TYPE } from "./Component/InputFields/helper.types";

function App() {
  const [inputStatus, setInputStatus]: StateType<InputStatus_TYPE> =
    useState<InputStatus_TYPE>({
      status: "DEFAULT",
      message: null,
    });

  const validation = (
    event: React.ChangeEvent<HTMLInputElement>
  ): { status: boolean; message: string | null } => {
    let result: { status: boolean; message: string | null } = {
      status: false,
      message: null,
    };
    if (event.target.value !== "surya" && event.target.value.length > 0) {
      console.log("validation on-blur : ERROR - ", event.target.value);
      setInputStatus({
        status: "ERROR",
        message: "Not a valid Name",
      });
    } else {
      setInputStatus({
        status: "DEFAULT",
        message: null,
      });
    }

    return result;
  };

  const onBlur = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputFieldEdited: boolean
  ) => {
    // if (inputFieldEdited === true) {
    //   setInputStatus({
    //     status: "DEFAULT",
    //     message: null,
    //   });
    // }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    validation(event);
  };

  return (
    <main className="w-full h-full flex justify-center items-center">
      <TextInput
        name="Name"
        placeholder="Name"
        status={inputStatus}
        onBlur={onBlur}
        onChange={onChange}
        prefixElement={<h1 onClick={() => console.log("h2 clicked")}>2</h1>}
      />
    </main>
  );
}

export default App;
