import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

import { getPlacesData } from "./api/index";

function App() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounce, setBounce] = useState(null);
  const [childClicked, setChildCklicked] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState([])

  const [isLoaded, setIsLoaded] = useState(false)

  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filterPlaces = places.filter(place => place.rating > rating)
    setFilteredPlaces(filterPlaces)
  }, [rating])

  useEffect(() => {
    if (bounce !== null) {
      setIsLoaded(true)
      getPlacesData(type, bounce.sw, bounce.ne).then((data) => {
        setIsLoaded(false)
        setPlaces(data);
      });
    }
  }, [type, coordinates, bounce]);

  return (
    <div className="App">
      <>
        <CssBaseline />
        <Header setCoordinates={setCoordinates} />
        <Grid container spacing={3} style={{ width: "100%" }}>
          <Grid item xs={12} md={4}>
            <List
              isLoaded={isLoaded}
              places={filteredPlaces.length ? filteredPlaces : places}
              childClicked={childClicked}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Map
              setCoordinates={setCoordinates}
              setBounce={setBounce}
              coordinates={coordinates}
              places={filteredPlaces.length ? filteredPlaces : places}
              setChildCklicked={setChildCklicked}
            />
          </Grid>
        </Grid>
      </>
    </div>
  );
}

export default App;
