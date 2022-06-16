import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; // import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'

import "./NavBar.css";
import DensitySmallIcon from '@mui/icons-material/DensitySmall';

import {
  HomeTwoTone,
  UsergroupAddOutlined,
  UserDeleteOutlined,
  MenuFoldOutlined
} from "@ant-design/icons";
import { Col, Row, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Image, Anchor, Drawer, Button } from "antd";

const { Link } = Anchor;
const Navber = () => {
  const [click, setClick] = useState(false);
  const [userData, setUserData] = useState({});

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

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
    
<>
      {/*  */}
      
      <div className="container-fluid">
      <div className="header">
        <div className="logo">
          <i className="fas fa-bolt"></i>
          <a><b>SoApp</b></a>
        </div>
        <div className="mobileHidden">
          <Anchor targetOffset="65">
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
              <NavLink
                to="/profile"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Profie
              </NavLink>
              <NavLink
                to="/createpost"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Create Post
              </NavLink>
              <NavLink
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={logout}
              >
                Logout
              </NavLink>
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
          </Anchor>
        </div>
        <div className="mobileVisible">
          <Button type="primary" onClick={showDrawer}>
            <i className="fas fa-bars"><DensitySmallIcon /></i>
          </Button>
          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <Anchor targetOffset="65">
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
              <NavLink
                to="/profile"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Profie
              </NavLink>
              <NavLink
                to="/createpost"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Create Post
              </NavLink>
              <NavLink
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={logout}
              >
                Logout
              </NavLink>
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
            </Anchor>
          </Drawer>
        </div>
      </div>
    </div>
    </>
  );
};

export default Navber;
