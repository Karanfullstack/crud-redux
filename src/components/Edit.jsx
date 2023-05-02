import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {updatedUser} from "../features/userSlice";

const Edit = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();
  const [data, setUpdate] = useState();
  const {users, loading} = useSelector((state) => state.app);

  useEffect(() => {
    if (id) {
      const user = users.filter((item) => item.id === id);
      setUpdate(user[0]);
    }
  }, [users]);

  const handel = (e) => {
    setUpdate({...data, [e.target.name]: e.target.value});
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(updatedUser(data));
    navigation("/read");
  };
  if (loading) {
    return <h1>Loading..</h1>;
  }
  return (
    <React.Fragment>
      <form onSubmit={handelSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name.."
          value={data && data.name}
          onChange={handel}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email.."
          value={data && data.email}
          onChange={handel}
        />
        <label>Age</label>
        <input
          type="text"
          name="age"
          placeholder="Age.."
          value={data && data.age}
          onChange={handel}
        />
        <div className="radio">
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={data && data.gender === "Male"}
            onChange={handel}
          />
          <label>Male</label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={data && data.gender === "Female"}
            onChange={handel}
          />
          <label>Female</label>
        </div>
        <div className="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Edit;
