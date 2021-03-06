import React from "react";
import StarRatingComponent from "react-star-rating-component";

export default class RatingStart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: this.props.rating,
    };
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
    this.props.rate(nextValue);
  }

  render() {
    const { rating } = this.state;

    return (
      <div className="ratingContainer">
        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={this.state.rating}
          onStarClick={this.onStarClick.bind(this)}
        />
        <div>
          <div> {this.state.rating}</div>
        </div>
      </div>
    );
  }
}
