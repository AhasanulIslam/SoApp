import axios from "axios";
import { Collapse } from "antd";
import React, { useEffect, useState } from "react";
import Navber from "../../../Navber";
import { Row, Col } from 'antd';
import { Button, Card, Menu } from 'antd'
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import WcIcon from '@mui/icons-material/Wc';
import CakeIcon from '@mui/icons-material/Cake';
import {
  EditOutlined
} from "@ant-design/icons";


const { Panel } = Collapse;


const Profile = () => {
  const [newuserData, setNewUserData] = useState([])
  const [newuserData1, setNewUserData1] = useState([])
  const [newuserData2, setNewUserData2] = useState([])
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState("")
  useEffect(() => {
    console.log("lsdkflsdk");
    axios
      .get("https://soapp-nodejs.herokuapp.com/users/view-profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-info")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setUserData(res.data.data);
      
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  useEffect(() => {

    axios
      .get("https://soapp-nodejs.herokuapp.com/users/view-followers",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-info")}`,
        }
      }
     )
      .then((res) => {
        console.log(res.data.data);
        setNewUserData(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  useEffect(() => {

    axios
      .get("https://soapp-nodejs.herokuapp.com/users/view-following_users",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-info")}`,
        }
      }
     )
      .then((res) => {
        console.log(res.data.data);
        setNewUserData1(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  useEffect(() => {

    axios
      .get("https://soapp-nodejs.herokuapp.com/post/total-post",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-info")}`,
        }
      }
     )
      .then((res) => {
        console.log(res.data.data);
        setNewUserData2(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);
  

  const uploadImage = async e =>{
    console.log(e.target.files[0])
    // console.log(image)
    const data = new FormData()
    data.append('file', e.target.files[0]) 
    // data.append("fileName", image.name)

    data.append('upload_preset','ahasan_images')
    setLoading(true)


    return await axios
    .post("https://api.cloudinary.com/v1_1/v2-tech/image/upload", data)
    .then((res) => {
      axios.patch(`https://soapp-nodejs.herokuapp.com/users/add-profile-picture`,
        {
          imageUrl: res.data.url
        },
        {
         headers: {
   
           Authorization: `Bearer ${localStorage.getItem("user-info")}`,
         },
       }) 
           .then(res => console.log("gg100",res.data)
           )
           .catch(e => console.log("gg200",e))
  
        console.log(res)
    })
    .catch((error) => {
        console.log(error)

    });
  }

  return (
    <div className="full_div" style={{ marginTop: 16 }}>
      <Navber />

      {userData.length > 0 ? (
        userData.map((el) => (
          <>
            <Row justify="space-between">
              <Col span={4}></Col>
              <Col span={4}></Col>
              <Col span={4}></Col>
              <Col span={4}>
                <Button
                  type="primary"
                  shape="round"
                  icon={<EditOutlined />}
                  size="large"
                >
                  <a href="/editprofile">Update Info</a>
                </Button>
              </Col>
            </Row>
            <Row className="Data_Show" key={el.id}>
              <Col span={8}>
                <img
                  className="image_profile"
                  src={el.profile_picture}
                  alt=""
                />
                <div className="App_profile">
                  <input
                    type="file"
                    name="file"
                    placeholder="Upload an image"
                    onChange={(e) => uploadImage(e)}
                  />
                </div>
              </Col>
              
              <Col span={2}>   </Col>
              <Col span={14}>
                <h4 className="">
                  <BadgeIcon /> Name : {el.first_name + " " + el.last_name}
                </h4>
                <h4 className="">
                  <EmailIcon /> Email : {el.email}
                </h4>
                <h4 className="">
                  <CakeIcon /> Date of Birth : {el.date_of_birth}
                </h4>
                <h4 className="">
                  <WcIcon /> Gender : {el.gender}
                </h4>
                </Col>
            </Row>

            <br />
            <br />

            <Row>
              <Col span={8}>
                <h1>
                  Post
                  {newuserData2.length > 0 ? (
                    newuserData2.map((el) => (
                      <h1
                        style={{ background: "#D3D3D3", marginBottom: "2em" }}
                      >
                        <h1>{el.total_post}</h1>
                      </h1>
                    ))
                  ) : (
                    <h1>Data not found</h1>
                  )}{" "}
                </h1>
              </Col>
              <Col span={8}>
                <h1>
                  Following
                  {newuserData1.length > 0 ? (
                    newuserData1.map((el) => (
                      <h1
                        style={{
                          background: "#D3D3D3",
                          marginBottom: "2em",
                          font: "30px",
                        }}
                      >
                        <h1>{el.following_users}</h1>
                      </h1>
                    ))
                  ) : (
                    <h1>Data not found</h1>
                  )}{" "}
                </h1>
              </Col>

              <Col span={8}>
                <h1>
                  Followers
                  {newuserData.length > 0 ? (
                    newuserData.map((el) => (
                      <h1
                        style={{ background: "#D3D3D3", marginBottom: "2em" }}
                      >
                        <h1>{el.followers}</h1>
                      </h1>
                    ))
                  ) : (
                    <h1>Data not found</h1>
                  )}
                </h1>
              </Col>
            </Row>

            {/* {newuserData.length > 0 ? (
            newuserData.map(el => (
                <div style={{background: 'grey', marginBottom: '1em'}}>
                    <h4>{el.followers }</h4>
                </div>
            ))
        ) : <h1>Data not found</h1>} */}

            {/* <div className="container emp-profile"> */}
            {/* <from method="">
            <div className="row">
              <div className="col-md-3">
                <img src={el.picture} alt={el.first_name} />
              </div>
              <div className="col-md-7">
                <div className="profile-head">
                  <h5>Name</h5>
                  <h5> {el.first_name + " " + el.last_name}</h5>
                  <br/>
                  <h5>Email </h5>
                  <h5>{el.email}</h5>
                  <h5>Gender : {el.gender}</h5>
                  <h5>Birth Date : {el.date_of_birth}</h5>
                </div>
              </div>
            </div>

          </from> */}

            {/* </div> */}
          </>
        ))
      ) : (
        <h1>Data not found</h1>
      )}
    </div>
  );
}
export default Profile;