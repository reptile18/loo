import React, { useState } from 'react';
import { Link } from "react-router-dom"


function PlaceCard(props) {
  console.log("in place card: ", props);

  const [place, setPlace] = useState(props.place);
  return (
    <div className="col-md-6">
      <div className="card nearbyCard mt-3 p-2">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{place.name}</h5>
          <div className="card-text">{place.formatted_address}</div>
          {/* <Link to={`/add/${place.place_id}`}>
            <button type="button" className="btn btn-primary stretched-link clearfix mt-auto">Add Loo Info</button>
          </Link> */}
          <Link to={{
            pathname: `/add/${place.place_id}`,
            place: {
              name: place
            }
          }}>
            <button type="button" className="btn btn-primary stretched-link clearfix mt-auto">Add Loo Info</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PlaceCard;