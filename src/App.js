import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./body.css";
import { makeStyles } from "@material-ui/core/styles";
import { Layout } from "antd";
import cubejs from "@cubejs-client/core";
import { CubeProvider } from "@cubejs-client/react";
import Header from "./components/Header";
const API_URL = "http://localhost:4000";
const CUBEJS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODg3NzA3OTMsImV4cCI6MTU4ODg1NzE5M30.i_CZKCsCsFxME6CdNdf1UjtY6Jn9hPykpdoIY7hI3Rc";
const cubejsApi = cubejs(CUBEJS_TOKEN, {
  apiUrl: `${API_URL}/cubejs-api/v1`
});
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const AppLayout = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <div>{children}</div>
    </div>
  );
};

const App = ({ children }) => (
  <CubeProvider cubejsApi={cubejsApi}>
    <AppLayout>{children}</AppLayout>
  </CubeProvider>
);

export default App;
