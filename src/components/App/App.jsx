import React, {useEffect, useState} from "react";

import { Route, Switch } from "react-router-dom";
import PrivateRoute from "../../hoc/PrivateRoute";

import { Container } from "reactstrap";

import {PageView, initGA} from '../Tracking/Tracking';
import Loading from "../Loading";
import NavBar from "../NavBar";
import Footer from "../Footer";
import Home from "../Home";
import Profile from "../Profile";
import { useAuth0 } from "../../contexts";

import "./App.scss";

// fontawesome
import initFontAwesome from "../../utils/initFontAwesome";
initFontAwesome();

const App = () => {
  const { loading } = useAuth0();
  const [apiKey, setApiKey] = useState();

  useEffect(() => {
    /*=== function that initializes Google Analytics ===*/
    initGA(process.env.REACT_APP_GOOGLE_TRACKING_ID)
    PageView()
  })

  if (loading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <Container className="flex-grow-1 mt-5">
        <Switch>
          <Route path="/" exact render={(props) => <Home {...props} apiKey={apiKey}/>} />
          <PrivateRoute path="/profile" render={(props) => <Profile {...props} apiKey={apiKey} setApiKey={setApiKey}/>} />
        </Switch>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
