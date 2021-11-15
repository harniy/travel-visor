import React, { useState, useEffect, useRef, createRef } from "react";
import {
  CircularProgress,
  Grid,
  Topography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
} from "@material-ui/core";

import PlaceDetails from "../PlaceDetails/PlaceDetails";

import ContentLoader, { Facebook } from "react-content-loader";

import useStyles from "./styles";

export default function List({
  places,
  childClicked,
  type,
  setType,
  rating,
  setRating,
  isLoaded
}) {
  const classes = useStyles();

  const itemEls = useRef(new Array());

  useEffect(() => {
    itemEls?.current[childClicked]?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }, [childClicked]);

  return (
    <div className={classes.container} style={{ height: "90vh" }}>
      <Typography variant="h4" style={{ fontSize: "1.8rem" }}>
        Restaurants, Hotels & Attractions around you
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <MenuItem value="restaurants">Restaurants</MenuItem>
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Rating</InputLabel>
        <Select value={rating} onChange={(e) => setRating(e.target.value)}>
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={4}>Above 4.0</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
      </FormControl>
      <div style={{ overflowX: "hidden", overflowY: "auto", height: "70%" }}>
        {isLoaded !== true ? (
          <Grid container spacing={2} className="list-items">
            {places?.map((place, i) => (
              <Grid
                ref={(element) => (itemEls.current[i] = element)}
                className={i == childClicked ? "focuse-element" : ""}
                key={i}
                item
                xs={12}
              >
                <PlaceDetails place={place} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <ContentLoader viewBox="0 0 500 280" height={280} width={500} backgroundColor="#cac9c9">
            <rect x="3" y="3" rx="10" ry="10" width="300" height="180" />
            <rect x="6" y="190" rx="0" ry="0" width="292" height="20" />
            <rect x="4" y="215" rx="0" ry="0" width="239" height="20" />
            <rect x="4" y="242" rx="0" ry="0" width="274" height="20" />
          </ContentLoader>
        )}
      </div>
    </div>
  );
}
