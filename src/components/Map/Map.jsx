import React  from "react";
import googleMapReact from "google-map-react";
import {
  Paper,
  Typography,
  useMediaQuery,
  UseMediaQuery,
} from "@material-ui/core";
import LocationOn from "@material-ui/icons/LocationOn";
import { Rating } from "@material-ui/lab";

import GoogleMapReact from "google-map-react";

import useStyles from "./styles";

export default function Map({
  setCoordinates,
  setBounce,
  coordinates,
  places,
  setChildCklicked
}) {
  const classes = useStyles();
  const isMobile = useMediaQuery("(min-widthL600px)");

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyC6QluvupZUsDTZ6qoMAX5MQxtBVkytjd0" }}
        defaultCenter={coordinates}
        center={coordinates}
        margin={[50, 50, 50, 50]}
        defaultZoom={14}
        options={""}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounce({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildCklicked(child)}
      >
        {places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {isMobile ? (
              <LocationOn color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  className={classes.typography}
                  variant="subtitle2"
                  gutterBottom
                >
                  {place.name}
                </Typography>
                <img
                  className={classes.pointer}
                  alt={place.name}
                  src={
                    place?.photo
                      ? place.photo.images.large.url
                      : "https://media-cdn.tripadvisor.com/media/photo-s/17/75/3f/d1/restaurant-in-valkenswaard.jpg"
                  }
                />
                <Rating size="small" value={Number(place.rating)} readOnly ></Rating>
              </Paper>
            )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
}
