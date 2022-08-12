import React from "react";

export default function Forms({ placeholder, type, ...otherProps }) {
  return (
    <>
      <input type={type} placeholder={placeholder} />
    </>
  );
}
