import React from "react";

const CallApi = numero => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${numero}/`)
    .then(res => res.json())
    .then(res => res);
};

export default CallApi;
