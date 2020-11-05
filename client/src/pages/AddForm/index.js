import React, { useEffect, useState } from "react";
import { useHistory, useParams, Redirect } from "react-router-dom";
import RangeSlider from "react-bootstrap-range-slider";
import axios from "axios";
import "./style.css";
import Home from '../Home';
import Logo from "../../assets/img/favicon-teal.png";


function AddForm(props) {
  console.log("in addform, props: ", props.location.place);
  const [selectedLoo, setSelectedLoo] = useState(props.location.place);
  const [photo, setPhoto] = useState("");
  let { id } = useParams();
  // const [redirect, setRedirect] = useState(false);
  // const [redirectTo, setRedirectTo] = useState("");

  const [loo, setLoo] = useState({
    place_id: id,
    location_name: selectedLoo.name,
    available: true,
    needs_key: false,
    gender_neutral: false,
    handicap_accessible: false,
    has_water: true,
    has_soap: true,
    has_paper: true,
    has_mirror: true,
    clean_rating: 5
  });

  useEffect(() => {
    loadPhoto();
  }, []);

  function loadPhoto() {
    if (!selectedLoo.photos) {
      setPhoto(Logo);
    }
    else if (selectedLoo.photos) {
      const photoReference = selectedLoo.photos[0].photo_reference;
      axios.get(`/api/photo/${photoReference}`)
        .then((photoSrc) => {
          setPhoto(photoSrc.data);
        })
        .catch((err) => console.log(err));
    }
  }

  function updateCleanValue(evt) {
    const numberRating = parseInt(evt.target.value);
    setLoo({ ...loo, clean_rating: numberRating });
  }

  function submitLoo() {
    axios.post("/api/bathroom", loo)
      .then(() => {
        console.log("loo successfully added");

        alert("Thanks for adding a loo!");

        props.history.push("/");
        // setRedirectTo("/");
        // setRedirect(true);
      })
      .catch((err) => {
        console.log(err);
        alert("Oops, something went wrong! Try to add your loo later.");
      })
  }

  console.log("loo: ", loo)
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg">
          <div className="card" id="addLooCard">
            <div className="card-body">
              <h5 className="card-title">Loo Details</h5>

              <div className="row">
                <div className="col-lg order-md-12 order-lg-1">
                  <div className="img-placeholder justify-content-center">
                    <img src={photo} id="place_img" alt={selectedLoo.name} className="detailsPlaceImg img-thumbnail" />
                  </div>
                </div>
                <div className="col-lg order-md order-lg-12">
                  <p className="placeAddress">
                    <h1 className="locationName">{selectedLoo.name}</h1>
                    <p>
                      <span className="streetAddress">{selectedLoo.formatted_address}</span>
                      <br />
                      {/* <span className="placeOpen">{if (selectedLoo.opening_hours.open_now) {}}</span> */}
                    </p>
                  </p>
                </div>
              </div>

              <div className="row" />

              <div className="row">
                <div className="col-sm-12">
                  <form className="looForm container mt-3" data-place-id={id}>
                    <div className="row">
                      <div className="col-sm form-group">
                        <h6>Basics</h6>
                        <div className="custom-control custom-switch form-check">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="available"
                            defaultChecked
                            onChange={() => setLoo(({ available }) => ({ ...loo, available: !available }))}
                          />
                          <label
                            className="custom-control-label"
                            for="available"
                          >
                            Loo available
                          </label>
                        </div>
                        <div className="custom-control custom-switch form-check">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="needs_key"
                            value={loo.needs_key}
                            onChange={() => setLoo(({ needs_key }) => ({ ...loo, needs_key: !needs_key }))}
                          />
                          <label
                            className="custom-control-label"
                            for="needs_key"
                          >
                            Loo needs key
                          </label>
                        </div>
                        <div className="custom-control custom-switch form-check">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="gender"
                          />
                          <label className="custom-control-label" for="gender">
                            Gender neutral loo
                          </label>
                        </div>
                        <div className="custom-control custom-switch form-check">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="accessible"
                            onChange={() => setLoo(({ handicap_accessible }) => ({ ...loo, handicap_accessible: !handicap_accessible }))}
                          />
                          <label
                            className="custom-control-label"
                            for="accessible"
                          >
                            ADA-compliant or accessible
                          </label>
                        </div>
                      </div>
                      <div className="col-sm form-group">
                        <h6>Supplies</h6>
                        <div className="custom-control custom-switch form-check">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="has_water"
                            defaultChecked
                            onChange={() => setLoo(({ has_water }) => ({ ...loo, has_water: !has_water }))}
                          />
                          <label
                            className="custom-control-label"
                            for="has_water"
                          >
                            Has water
                          </label>
                        </div>
                        <div className="custom-control custom-switch form-check">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="has_soap"
                            defaultChecked
                            onChange={() => setLoo(({ has_soap }) => ({ ...loo, has_soap: !has_soap }))}
                          />
                          <label className="custom-control-label" for="has_soap">
                            Has soap
                          </label>
                        </div>
                        <div className="custom-control custom-switch form-check">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="has_paper"
                            defaultChecked
                            onChange={() => setLoo(({ has_paper }) => ({ ...loo, has_paper: !has_paper }))}
                          />
                          <label
                            className="custom-control-label"
                            for="has_paper"
                          >
                            Has toilet paper
                          </label>
                        </div>
                        <div className="custom-control custom-switch form-check">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="has_mirror"
                            defaultChecked
                            onChange={() => setLoo(({ has_mirror }) => ({ ...loo, has_mirror: !has_mirror }))}
                          />
                          <label
                            className="custom-control-label"
                            for="has_mirror"
                          >
                            Has mirror
                          </label>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-sm-12 form-group">
                        <label for="customRange">
                          <h6>How clean is it?</h6>
                        </label>
                        <div className="input-group d-flex align-items-center sliderInput">
                          <div className="col-sm-2 text-center">
                            <span className="mr-1">Yuck!</span>
                          </div>
                          <div className="col-sm-8">
                            <RangeSlider
                              min={0}
                              max={10}
                              tooltip="off"
                              size="lg"
                              value={loo.clean_rating}
                              onChange={updateCleanValue} 
                              className="slider"
                            />
                          </div>
                          <div className="col-sm-2 text-center">
                            <span className="ml-1">Sparkling!</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-lg btn-warning alt-btn"
                      id="addLooBtn"
                      onClick={submitLoo}
                    >
                      Add Loo!
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* { redirect === true ?  <Redirect to="/" /> : null} */}
    </div>
  );
}

export default AddForm;
