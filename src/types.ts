import React from "react";

export type StateType<T> = [ T , React.Dispatch<React.SetStateAction<T>>  ];
export type RefType<T> = React.MutableRefObject<T>;
