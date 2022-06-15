import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; // import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'
import "./NavBar.css";
import {
  HomeTwoTone,
  UsergroupAddOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { Col, Row, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Image } from "antd";

const Navber = () => {
  const [click, setClick] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    console.log("lsdkflsdk");
    axios
      .get("https://soapp-nodejs.herokuapp.com/users/view-profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-info")}`,
        },
      })
      .then((res) => {
        console.log("navber userlist", res.data.data);
        setUserData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleClick = () => setClick(!click);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Row>
      <Col xs={24} sm={24} lg={24}>

      <nav className="navbar">
        <div className="nav-container">
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {/* {localStorage.getItem('role') === '2'} */}
            <li className="nav-item">
              <NavLink
                to="/home"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
              <NavLink
                to="/follow"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Users
              </NavLink>
            </li>
            <li className="nav-item"></li>
            <li className="nav-item">
              <NavLink
                to="/unfollow"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                <Tooltip placement="topLeft" title="Unfollow users">
                  Followers
                </Tooltip>
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink
                to="/profile"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Profie
              </NavLink>
            </li> */}

            <li className="nav-item">
              <NavLink
                to="/createpost"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Create Post
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={logout}
              >
                Logout
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/profile"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                {userData.length > 0
                  ? userData.map((el) => 
                  
                  <Avatar
                  src={
                    <Image
                      src={el.profile_picture}
                      style={{
                        width: 45,
                      }}
                      alt={userData.first_name}
                    />
                    
                  }
                />
                
                
  )
                  : console.log("sdfsd")}
                            </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/profile"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                {userData.length > 0
                  ? userData.map((el) => 
                  
                  <>{el.first_name + " " + el.last_name}</>
                
                
  )
                  : console.log("sdfsd")}
                            </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
      </Col>
    </Row>
  );
};

export default Navber;
