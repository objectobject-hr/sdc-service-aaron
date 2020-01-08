// jshint esversion:6
import React from "react";
import Header from "./header.jsx";
import Sidebar from "./sidebar.jsx";
import axios from "axios";
import {
  setRate,
  setTotal,
  setTitle,
  setSleepCapacity,
  setReviewOverview,
  setRating,
  setReviewNumber,
  setOwner,
  setCleaningFee,
  setUSState,
  setCity,
  setPic
} from "../redux/booking/booking.action.js";
import { connect } from "react-redux";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      check_in_date: "",
      check_out_date: "",
      adults: null,
      children: null,
      reviews: null,
      cleaning_fee: null,
      owner: "",
      rating: null,
      total: null
    };
  }

  // IF USING MONGODB, USE RESPONSE.DATA
  // IF USING POSTGRES, USE RESPONSE.DATA[0]
  componentDidMount() {
    let randomNumber = Math.floor(Math.random() * 104) + 1;
    axios
      .get(`/mlistings/${randomNumber}`)
      // .then(response => console.log(response.data[0]))
      // .then(results => results.data[0])
      // .catch(err => console.log(err))
      .then(response => {
        this.props.setTitle(response.data[0].title);
        this.props.setSleepCapacity(response.data[0].sleepcapacity);
        this.props.setUSState(response.data[0].states);
        this.props.setReviewOverview(response.data[0].reviewoverview);
        this.props.setRating(Number(response.data[0].rating));
        this.props.setReviewNumber(response.data[0].reviewnumber);
        this.props.setOwner(response.data[0].owners);
        this.props.setCleaningFee(response.data[0].cleaningfee);
        this.props.setCity(response.data[0].city);
        this.props.setPic(response.data[0].pic);
        // console.log(response.data);
        return response.data[0].id; // use listingid if using MongoDB
      })
      .then(id => axios.get(`/dates/${id}`)) // use listingid if using MongoDB
      // .then(response => {
      //   console.log(response.data[0]);
      // })
      .then(dates => this.props.setRate(dates.data[0].rate))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="al-test-container">
        <div className="al-header-container">
          <Header />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setRate: rate => dispatch(setRate(rate)),
    setTotal: total => dispatch(setTotal(total)),
    setTitle: title => dispatch(setTitle(title)),
    setSleepCapacity: sleep_capacity =>
      dispatch(setSleepCapacity(sleep_capacity)),
    setReviewOverview: review_overview =>
      dispatch(setReviewOverview(review_overview)),
    setRating: rating => dispatch(setRating(rating)),
    setReviewNumber: review_number => dispatch(setReviewNumber(review_number)),
    setOwner: owner => dispatch(setOwner(owner)),
    setCleaningFee: cleaning_fee => dispatch(setCleaningFee(cleaning_fee)),
    setUSState: USState => dispatch(setUSState(USState)),
    setCity: city => dispatch(setCity(city)),
    setPic: pic => dispatch(setPic(pic))
  };
};

export default connect(null, mapDispatchToProps)(App);
