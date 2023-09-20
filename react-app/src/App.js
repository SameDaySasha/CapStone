import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ListingsPage from "./components/homepage/homepage"; // Adjust the path according to your project structure
import ListingDetailPage from "./components/ListingsDetailPage/listingsdetail"; // New import for the detail page component

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/listings/:id" exact>
            <ListingDetailPage />
          </Route>
          <Route path="/" exact>
            <ListingsPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
