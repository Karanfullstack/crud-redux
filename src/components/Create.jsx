import React, {useEffect, useState} from "react";
import {createUser} from "../features/userSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // getting value
  const [user, setUser] = useState({});

  const data = (e) => {
    e.preventDefault();
    setUser({...user, [e.target.name]: e.target.value});
  };

  // handeling
  const handel = (e) => {
    e.preventDefault();
    dispatch(createUser(user));
    console.log(user);
    navigate("/read");
  };

  return (
    <React.Fragment>
      <form onSubmit={handel}>
        <label>Name</label>
        <input type="text" name="name" placeholder="Name.." onChange={data} />
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email.."
          onChange={data}
        />
        <label>Age</label>
        <input type="text" name="age" placeholder="Age.." onChange={data} />
        <div className="radio">
          <input type="radio" name="gender" value="Male" onChange={data} />
          <label>Male</label>
          <input type="radio" name="gender" value="Female" onChange={data} />
          <label>Female</label>
        </div>
        <div className="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Create;
