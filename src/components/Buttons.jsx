import React from "react";

const Buttons = props => {
  let back = async () => {
    console.log(props.numero);
  };

  return (
    <div className="buttons">
      <button type="button" onClick={back} className="button btn">
        Pokemon Anterior
      </button>
      <button type="button" className="button btn">
        Pokemon Random
      </button>
      <button type="button" className="button btn">
        Siguiente Pokemon
      </button>
    </div>
  );
};

export default Buttons;
