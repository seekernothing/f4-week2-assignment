import React, { useState } from "react";
import postalCode from "./postalCodeAPI";
import "./pincode.css";

const PincodeDetails = () => {
  const [pincode, setPincode] = useState("");
  const [apiData, setApiData] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLookup = async () => {
    if (pincode.trim().length !== 6) {
      alert("Please enter a valid 6-digit pincode.");
      return;
    }

    setLoading(true);
    try {
      const data = await postalCode(pincode);
      setLoading(false);
      if (!data || data[0].Status !== "Success") {
        alert("Invalid pincode or data not found.");
        setApiData(null);
        return;
      }
      setApiData(data);
      setIsVisible(false);
    } catch (error) {
      setLoading(false);
      alert("Error fetching data. Please try again.");
      console.log(error)
    }
  };

  const filterData = (e) => {
    setSearch(e.target.value);
  };

  const filteredPostOffices =
    apiData?.[0]?.PostOffice?.filter((office) =>
      office.Name.toLowerCase().includes(search.toLowerCase())
    ) || [];

  return (
    <>
      {isVisible && (
        <div className="mainContainer">
          <h2>Enter Pincode</h2>
          <input
            type="number"
            name="postalcode"
            id="postalcode"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
          <button onClick={handleLookup} className="btn">
            Lookup
          </button>
        </div>
      )}
      {loading && <div className="loader"></div>}
      {apiData && (
        <div>
          <h3>Pincode: {pincode}</h3>
          <p>
            <b>Message:</b> {apiData[0].Message}
          </p>
          <input
            type="text"
            placeholder="🔍 Filter"
            className="filter"
            value={search}
            onChange={filterData}
          />
          <div className="card_container">
            {filteredPostOffices.length > 0 ? (
              filteredPostOffices.map((item, index) => (
                <div key={index} className="card">
                  <p>
                    <strong>Name:</strong> {item.Name}
                  </p>
                  <p>
                    <strong>Branch Type:</strong> {item.BranchType}
                  </p>
                  <p>
                    <strong>Delivery Status:</strong> {item.DeliveryStatus}
                  </p>
                  <p>
                    <strong>District:</strong> {item.District}
                  </p>
                  <p>
                    <strong>Division:</strong> {item.Division}
                  </p>
                </div>
              ))
            ) : (
              <p>Couldn’t find the postal data you’re looking for...</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PincodeDetails;
