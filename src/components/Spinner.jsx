import React from "react";
import { TailSpin } from "react-loader-spinner";

const Loader = ({ darkTheme }) => {
  return (
    <TailSpin
      height="100"
      width="100"
      color={darkTheme ? "#f23835" : "#1976D2"}
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{ justifyContent: "center" }}
      visible={true}
    />
  );
};

export default Loader;
