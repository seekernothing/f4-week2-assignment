import React from "react";

const postalCode = async (pincode) => {
  try {
    const URL = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = await URL.json();
    return data;
  } catch (err) {
    console.error("Unavle to fetch data", err);
    return [];
  }
};
export default postalCode;
