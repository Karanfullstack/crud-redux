import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DeleteUser, showUser} from "../features/userSlice";
import Model from "./Model";
import {Link} from "react-router-dom";

const Read = () => {
  const dispatch = useDispatch();
  const {loading, users, searchData} = useSelector((state) => state.app);
  const [Id, setId] = useState();
  const [PopUp, setPopUp] = useState(false);
  const [radio, setRadio] = useState("");
  useEffect(() => {
    dispatch(showUser());
  }, []);

  if (loading) {
    return <h1 style={{textAlign: "center", marginTop: "3rem"}}>Loading</h1>;
  }

  return (
    <React.Fragment>
      <div className="radio flex rad">
        <input
          type="radio"
          name="gender"
          checked={radio === ""}
          onChange={(e) => setRadio("")}
        />
        <label>All</label>
        <input
          type="radio"
          name="gender"
          value="Male"
          checked={radio === "Male"}
          onChange={(e) => setRadio(e.target.value)}
        />
        <label>Male</label>
        <input
          type="radio"
          value="Female"
          name="gender"
          checked={radio === "Female"}
          onChange={(e) => setRadio(e.target.value)}
        />
        <label>Female</label>
      </div>

      {PopUp && <Model id={Id} showpop={PopUp} setpop={setPopUp} />}
      <section className="grid-container">
        {users &&
          users
            .filter((item) => {
              if (!searchData) {
                return item;
              } else {
                return item.name
                  .toLowerCase()
                  .includes(searchData.toLowerCase());
              }
            })
            .filter((item) => {
              if (radio === "Male") {
                return item.gender === radio;
              } else if (radio === "Female") {
                return item.gender === radio;
              } else {
                return item;
              }
            })
            .map((item) => (
              <div className="card" key={item.id}>
                <h3>{item.name}</h3>
                <h4>{item.email}</h4>
                <div>
                  <button onClick={() => [setId(item.id), setPopUp(true)]}>
                    View
                  </button>
                  <Link to={`/edit/${item.id}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => dispatch(DeleteUser(item.id))}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
      </section>
    </React.Fragment>
  );
};

export default Read;
