import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import numeral from "numeral";
import CountUp from "react-countup";
import Grid from "@material-ui/core/Grid";
import "./InfoCard.scss";

const InfoCard = (props) => {
 console.log(props.type.toLowerCase())
  return (
    <Grid
      item
      component={Card}
      xs={10}
      md={3}
      className={`${props.clicked && props.type} Card`}
      onClick={() => props.onClickInfo(props.type)}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {props.type}
        </Typography>

        <Typography
          color="textSecondary"
          variant="h5"
          className={`info__${props.type.toLowerCase()}`}
        >
          {props.active && (
            <CountUp start={0} end={props.active} duration={2} separator="," />
          )}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {new Date(props.updatedTime).toDateString()}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          +{numeral(props.total).format("0.0a")} Total of {props.type}
        </Typography>
      </CardContent>
    </Grid>
  );
};
export default InfoCard;
