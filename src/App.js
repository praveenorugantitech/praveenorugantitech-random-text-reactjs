import React, { Fragment } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import "./index.css";

export default function App() {
  return (
    <Fragment>
      <Header />
      <Content />
    </Fragment>
  );
}
