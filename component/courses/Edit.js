import React from "react";
import Router from "next/router";

const Edit = ({ edit, url }) => {
  const { id } = edit;
  const handleClick = () =>{
    Router.push({
      pathname: `/${url}/[id]`,
      query: { id }
    })
  }
  return (
    <button 
      type="button" 
      onClick={handleClick}>
      <p className="px-4 text-center inline-flex text-xs leading-5 font-semibold uppercase rounded-full bg-green-100 text-green-800">
        edit
      </p>
    </button>
  );
};

export default Edit;
