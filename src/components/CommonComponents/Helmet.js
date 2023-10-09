import React from "react";
import { Helmet } from "react-helmet";

function SeoLib({ title = "" }) {
  return (
    <div className="">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      ...
    </div>
  );
}

export default SeoLib;
