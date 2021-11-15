import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";
import LocationOn from "@material-ui/icons/LocationOn";
import Phone from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";

export default function PlaceDetails({ place }) {
  const classes = useStyles();

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={
          place?.photo
            ? place.photo.images.large.url
            : "https://media-cdn.tripadvisor.com/media/photo-s/17/75/3f/d1/restaurant-in-valkenswaard.jpg"
        }
        title={place.name}
      ></CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Rating value={Number(place.rating)} readOnly></Rating>
          <Typography gutterBottom variant="subtitle1">
            out of {place.num_reviews} reviews
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1" title={place.ranking}>
            {place?.ranking?.length > 25
              ? place.ranking.slice(0, 30) + "..."
              : place.ranking}
          </Typography>
        </Box>
        {place?.awards?.map((award, i) => (
          <Box my={1} display="flex" justifyContent="space-between" key={i}>
            <img src={award.images.small} />
            <Typography variant="subtitle2" color="textSecondary">
              {award.display_name}
            </Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}
        {place?.address && (
          <Typography
            gutterBottom
            variant="body2"
            color="textSecondary"
            className={classes.subtitle}
          >
            <LocationOn /> {place.address}
          </Typography>
        )}
        {place?.phone && (
          <Typography
            gutterBottom
            variant="body2"
            color="textSecondary"
            className={classes.spacing}
          >
            <Phone /> {place.phone}
          </Typography>
        )}
        <CardActions>
          <Button size="small" color="primary" onClick={(() => window.open(place.web_url, '_blank'))} >
            Trip Advisor
          </Button>
          <Button size="small" color="primary" onClick={(() => window.open(place.website, '_blank'))} >
            Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
