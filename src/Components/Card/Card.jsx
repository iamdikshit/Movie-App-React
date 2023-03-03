import React from "react";

const Card = (props) => {
  return (
    <div className="card bg-white rounded-sm bg-opacity-20 backdrop-blur w-full p-4 flex justify-between gap-8">
      <div>
        <h1 className="text-2xl font-bold">{props.name}</h1>
        <i>{props.description}</i>
      </div>
      <div>
        <p>{props.date}</p>
      </div>
    </div>
  );
};
export default Card;
