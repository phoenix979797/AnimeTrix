import React from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
  return (
    <>
      <div
        className="movie-card" onClick={() => props.handelClick()}>
        <Link to={`/anime-details/${props.rec.animeId}`}>
          <div className="card-head">
            <img
              src={props.rec.animeImg}
              alt={props.rec.animeId}
              className="card-img"
            />
            <div className="card-details">
              <h5 className="card-title">{(props.rec.animeTitle.substring(0,35))}</h5>
              {props.ep !== "false" ? (
                <p className="card-info">

                </p>
              ) : null}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
