import { useState, useEffect } from "react";

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
        <div key={el.title + String(idx)}>
          <h3 className="oneline-truncated m-1">{el.title}</h3>
          <p className="listings__paragraph">
            <span className="color-primary ml-1">
              <b>
                {Number.isInteger(el.price)
                  ? formatAsCurrency(el.price)
                  : el.price}
              </b>
            </span>
            <span className="color-text-light mr-1">{el.location}</span>
          </p>
          {el.imgUrl && (
            <img
              className="img-adjustemnt"
              src={el.imgUrl}
              alt={`${el.title}_${idx}`}
            />
          )}
          <p className="threelines-truncated m-1">{el.description}</p>
          <div>
            {ACTIONS.map((buttonText, idx) => (
              <button
                key={`${buttonText}__${idx}`}
                type="button"
                className="listings__button"
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
        const results = await (await fetch(`${dataEndpoint}`)).json();

        if (!results) {
          console.log("69 -- please check your data return error...");
        } else {
          setSearchResultes(results);
        }
      } catch (error) {
        console.log("74 -- error: ", error.message);
      }
    };
    (!searchResultes || searchResultes.length === 0) && fetchRz();
    //   return () => {}
  }, []);

  if (!searchResultes)
    <div>Usually, place shared spinner component here...</div>;
  return (
    <div>
      <div className="listings__header">
        <h2 className="mb-0 color-text-dark">Search Result</h2>
        <p className="mt-0 color-text-light">
          <span className="color-primary">{searchResultes.length} results</span>{" "}
          for <span className="color-primary">{keyword}</span> in{" "}
          <span className="color-primary">{location}</span>
        </p>
      </div>
      <div className="listings__grid">{Listing(searchResultes)}</div>
    </div>
  );
};

export default Listings;
