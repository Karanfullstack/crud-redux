import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {searchUser} from "../features/userSlice";
const Navigation = () => {
  const dispatch = useDispatch();
  const {users} = useSelector((state) => state.app);
  const [searchData, setSearchData] = useState();
  useEffect(() => {
    dispatch(searchUser(searchData));
  }, [searchData]);
  
  return (
    <React.Fragment>
      <nav className="navbar">
        <h2>CRUD</h2>
        <div>
          <Link to="/">Create</Link>
          <Link to="/read">All Posts </Link>{" "}
          <span>Count: ({users && users.length})</span>
        </div>
        <div className="radio">
          <span>Search</span>
          <input
            type="search"
            placeholder="Search"
            onChange={(e) => setSearchData(e.target.value)}
          />
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navigation;
