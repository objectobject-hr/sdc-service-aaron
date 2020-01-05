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

  componentDidMount() {
    let randomNumber = Math.floor(Math.random() * 104) + 1;
    axios
      .get(`/mlistings/${randomNumber}`)
      // .then(response => console.log(response.data));
      // .then(results => results.data[0])
      // .catch(err => console.log(err))
      .then(response => {
        this.props.setTitle(response.data.title);
        this.props.setSleepCapacity(response.data.sleepcapacity);
        this.props.setUSState(response.data.states);
        this.props.setReviewOverview(response.data.reviewoverview);
        this.props.setRating(Number(response.data.rating));
        this.props.setReviewNumber(response.data.reviewnumber);
        this.props.setOwner(response.data.owners);
        this.props.setCleaningFee(response.data.cleaningfee);
        this.props.setCity(response.data.city);
        this.props.setPic(response.data.pic);
        // console.log(response.data);
        return response.data.listingid;
      })
      .then(listingid => axios.get(`/dates/${listingid}`))
      .then(dates => this.props.setRate(dates.data.rate))
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
