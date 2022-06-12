import axios from "axios";
import React, { useEffect, useState } from "react";
import Navber from "../../Navber";
import { Button, Table, Tooltip } from "antd";
import "antd/dist/antd.css";
import "../../../App.css";
import SearchIcon from '@mui/icons-material/Search';
import PostCard from "../AdminPanal/Post/Card/PostCard";
import SearchBar from "./Searchbox/SearchBar";


const Follow = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [ storedData, setStoreddata  ] = useState([])
  const [following_user, setFollowing_user] = useState({});
  

  useEffect(() => {
    console.log("lsdkflsdk");
    axios
      .get("https://soapp-nodejs.herokuapp.com/users/view-userlist", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-info")}`,
        },
      })
      .then((res) => {
        console.log("HELLO", res);
        
        const finalData = res.data.data.map(item => ({
          ...item,
          fullName: `${item.first_name} ${item.last_name}` || "",
        }))
        setStoreddata(finalData)
        setDataSource(finalData)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isEditing, following_user]);

  const follow = async (id) => {
    console.log("Approved id", id);
    console.log("follow id", following_user);
    try {
      const followUser = following_user;
      console.log("after follow", followUser);
      const ggwp1 = await axios.post(
        `https://soapp-nodejs.herokuapp.com/users/follow`,
        {
          following_user: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-info")}`,
          },
        }
      );
      console.log("ggwp", ggwp1);

      setIsEditing(!isEditing);
      console.log("zxcjvxc", ggwp1);
    } catch (error) {
      console.log(error);
    }
  };

  
  

  const columns = [
    {
      key: "2",
      title: "Name",
      dataIndex: `fullName`,
    },
    {
      key: "4",
      title: "Gender",
      dataIndex: "gender",
    },
    {},

    {
      key: "5",
      title: "Actions",
      render: (info) => {
        return (
          
          <>
          {console.log("cxvbdfv",info)}
            <Tooltip placement="topLeft" title="Follow this user">
              <Button
                onClick={() => follow(info.id)}
                type="primary"
                shape="round"
              >
                Follow
              </Button>
            </Tooltip>

          </>
        );
      },
    },
  ];

  const handleSearch = (event) =>{

    let filtered = storedData.filter((e, i) => {
      return(
        e.first_name.toLowerCase().includes(event.target.value.toLowerCase())   
      )
    })

    console.log('filtered ', filtered );
    
    if( event.target.value === "" ){
      setDataSource(storedData)
    }
    else{
      setDataSource(filtered)
    } 
  
  }


  return (
    <div className="App">
      <Navber />
      <div className="search">
      {/* <SearchBar placeholder="Enter a User Name..." data={dataSource} /> */}
      <input placeholder="search by name" onChange={(event) => handleSearch(event) } />
      <SearchIcon />
    </div>

      <header className="App-header">
        <Table columns={columns} dataSource={dataSource}></Table>
      </header>

      
    </div>
  );
};

export default Follow;
