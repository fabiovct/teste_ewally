import React from "react";

import Spinner from "react-spinkit";

const Loading = () => {
  return  (
    <div className="overlay-content loading">
      <div className="wrapper">
        <Spinner className="spinner" name="three-bounce" fadeIn="none"  />
      </div>
    </div>

  ) ;
};

export default Loading;