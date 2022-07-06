import React from "react";

const databaseInterface = async (address: string) => {
  const response = await fetch(address);
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
};

export default databaseInterface;
