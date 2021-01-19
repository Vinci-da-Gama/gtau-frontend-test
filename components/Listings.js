import { useState, useEffect } from "react";
import { CLEAR_LOGGEDIN_FBUSER } from "../../../henry-school-frontend/src/types";

const ACTIONS = ["View", "Reply"];

const formatAsCurrency = (int) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(int);

const Listing = (srz) =>
  srz.length === 0 ? (
    <p>No item.</p>
  ) : (
    srz.map((el, idx) => {
      return (
        <div key={el.title + String(idx)} className="listing__card">
          <h3 className="oneline-truncated">{el.title}</h3>
          <p className="price-location">
            <span className="color-primary">
              <b>
                {Number.isInteger(el.price)
                  ? formatAsCurrency(el.price)
                  : el.price}
              </b>
            </span>
            <span className="color-text-light">{el.location}</span>
          </p>
          {el.imgUrl && (
            <div className="image__container">
              <img
                className="img-adjustemnt"
                src={el.imgUrl}
                alt={`${el.title}_${idx}`}
              />
            </div>
          )}
          <p className="threelines-truncated">{el.description}</p>
          <div>
            {ACTIONS.map((buttonText, idx) => (
              <button
                key={`${buttonText}__${idx}`}
                type="button"
                className="card__button"
                onClick={() => {
                  console.log(`${buttonText}: ${el.title}`);
                }}
              >
                {buttonText}
              </button>
            ))}
          </div>
        </div>
      );
    })
  );

const Listings = ({ dataEndpoint, keyword, location }) => {
  // TODO
  // This component should make a request to the api endpoint (props.dataEndpoint)
  // then render the result as set of listings as per the design mocks
  // check props passed in from parent for other values that you may need to use
  const [searchResultes, setSearchResultes] = useState([]);

  useEffect(() => {
    const fetchRz = async () => {
      try {
        const results = await (
          await fetch(`http://localhost:3000${dataEndpoint}`)
        ).json();

        if (!results) {
          console.log("31 -- please check your data return error...");
        } else {
          setSearchResultes(results);
        }
      } catch (error) {
        console.log("37 -- error: ", error.message);
      }
    };
    (!searchResultes || searchResultes.length === 0) && fetchRz();
    //   return () => {}
  });

  if (!searchResultes)
    <div>Usually, place shared spinner component here...</div>;
  return (
    <div>
      <div className="listings__header">
        <h2 className="mb-0 color-text-dark">Search Result</h2>
        <p className="mt-0 color-text-light">
          <span className="color-primary">{6} results</span> for{" "}
          <span className="color-primary">{keyword}</span> in{" "}
          <span className="color-primary">{location}</span>
        </p>
      </div>
      <div className="listings__grid">{Listing(searchResultes)}</div>
    </div>
  );
};

export default Listings;
