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

  useEffect(() => {
    dispatch(showUser());
  }, []);

  if (loading) {
    return <h1 style={{textAlign: "center", marginTop: "3rem"}}>Loading</h1>;
  }

  return (
    <React.Fragment>
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
