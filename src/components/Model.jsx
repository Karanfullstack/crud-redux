import React from "react";
import { useSelector } from "react-redux";
const Model = ({ id, setpop }) => {
  const { users } = useSelector((state) => state.app);
  const user = users.filter((item) => item.id === id);
  
  return (
    <React.Fragment>
      <div className="model-background">
        <div className="model-container">
          <button onClick={() => setpop(false)}>X</button>
          <h2>Name: {user[0].name}</h2>
          <h3>Email: {user[0].email}</h3>
          <h2>Age: {user[0].age}</h2>
          <h2>Gender: {user[0].gender}</h2>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Model;
