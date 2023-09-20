import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import ListingForm from "./components/ListingForm/listingform"; // Import the ListingForm component
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ListingsPage from "./components/homepage/homepage"; 
import ListingDetailPage from "./components/ListingsDetailPage/listingsdetail"; 
import EditListingForm from "./components/editfunction/EditListingForm.js";


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
          <Route path="/listings/edit/:id" exact>
            <EditListingForm /> {/* Route to render the EditListingForm component */}
          </Route>
          <Route path="/create-listing" exact> 
            <ListingForm /> {/* Route to render the ListingForm component */}
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
