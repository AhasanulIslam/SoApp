import axios from "axios";
import { Collapse } from "antd";
import React, { useEffect, useState } from "react";
import Navber from "../../../Navber";
import { Row, Col, Card } from "antd";
import { Button } from "antd";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import VerifiedIcon from "@mui/icons-material/Verified";

const { Panel } = Collapse;

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({})
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});
   const [fileList, setFileList] = useState([]);
   
   const userId = localStorage.userId

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
        console.log("post info from profile", profile);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  
  useEffect(() => {
    console.log("post info from profile");

    axios
      .get("https://soapp-nodejs.herokuapp.com/post/view-post", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-info")}`,
        },
      })
      .then((res) => {
        console.log("view post",res);
        setProfile(res.data.data);
        console.log("post info from profile", profile);

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleFromSubmit = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const postHandleFromSubmit = (event) => {
    event.preventDefault();
    console.log("response", response);
    axios
      .patch(
        `https://soapp-nodejs.herokuapp.com/users/add-profile-picture`,
        {
          imageUrl: response.url,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-info")}`,
          },
        }
      )
      .then((res) => {
        setFileList([]);
      })
      .catch((e) => console.log(e));
  };

  

  return (
    <>
      <div className="full_div" style={{ marginTop: 16 }}>
        <Navber />

        {userData.length > 0 ? (
          userData.map((el) => (
            <>
              <Row justify="space-between">
                <Col span={4}></Col>
                <Col span={4}></Col>
                <Col span={4}></Col>
                <Col span={4}></Col>
              </Row>
              <Row className="Data_Show" key={el.id}>
                <Col span={4}></Col>
                <Col span={6}>
                  <img
                    className="image_profile"
                    src={el.profile_picture}
                    alt=""
                  />
                  <br />
                  {/* <div className="App_profile">
                  <input
                    type="file"
                    name="file"
                    placeholder="Upload an image"
                    onChange={(e) => uploadImage(e)}
                  />
                </div> */}
                  <br></br>
                  <br></br>

                  <ImgCrop rotate>
                    <Upload
                      type="file"
                      name="file"
                      // value={values1.imageUrl}
                      placeholder="Upload an image"
                      action={async (file) => {
                        console.log("file", file.name);

                        let data = new FormData();
                        data.append("file", file);
                        data.append("fileName", file.name);

                        data.append("upload_preset", "ahasan_images");
                        // data.append('file', file.name);
                        console.log("data", data);
                        setLoading(true);
                        axios
                          .post(
                            "https://api.cloudinary.com/v1_1/v2-tech/image/upload",
                            data,
                            {
                              headers: {
                                "Content-Type": `multipart/form-data;`,
                              },
                            }
                          )
                          .then((response) => {
                            console.log("gg", response.data);
                            setResponse(response.data);
                            setLoading(false);
                          })
                          .catch((err) => {
                            // Notification("Error", "Could not upload photo", 'error')
                            setLoading(false);
                          });
                      }}
                      listType="picture-card"
                      // setFileList={fileList}
                      fileList={fileList}
                      onChange={handleFromSubmit}
                      onPreview={onPreview}
                    >
                      {fileList.length < 5 && "+ Select Image"}
                    </Upload>
                  </ImgCrop>
                  <button className="submit" onClick={postHandleFromSubmit}>
                    Update Image
                  </button>
                </Col>

                <Col span={2}> </Col>
                <Col span={8}>
                  <h1 style={{ justifyContent: "left", display: "flex", paddingRight: "2px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <b>{el.first_name + " " + el.last_name} </b>
                      <VerifiedIcon color="primary" />
                    </div>
                    <Button
                      
                      size="large"
                      shape="defult"
                      style={{
                        justifyContent: "right",
                        marginLeft: "75px",
                        paddingLeft: " 25px",
                        paddingRight: "25px",
                      }}
                    >
                      <a href="/editprofile">Update Info</a>
                    </Button>
                  </h1>
                  <br/>
                  {/* <h4 className="">
                    <EmailIcon /> Email : {el.email}
                  </h4>
                  <h4 className="">
                    <CakeIcon /> Date of Birth : {el.date_of_birth}
                  </h4>
                  <h4 className="">
                    <WcIcon /> Gender : {el.gender}
                  </h4> */}
                  <Row>
                    <Col span={24}>
                      <div style={{display: "flex"}}>
                      <h4>{el.total_post} posts &nbsp;</h4>
                      <h4>{el.total_followers} followers &nbsp;</h4>
                      <h4>{el.total_following_users} followings</h4>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col span={4}></Col>
              </Row>

              <br />
              <br />
            </>
          ))
        ) : (
          <h1>Data not found</h1>
        )}
      </div>
      <div>
        <h1>Upload Pictures</h1>
      <Row>
      {profile.length > 0 ? (
        profile
          .filter((el) => el.picture !== null )
          .map((el) => (
            <>{console.log(el.picture)}
            
            <Col className="gutter-row" span={6}>
            <Card
              hoverable
              style={{
                width: 300,
                height: 300
              }}
              cover={<img alt="example" src={el.picture} />}
            >
              {/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
            </Card>
           </Col>
            </>
            
            ))) 
            : (console.log("hjdbf"))}
           </Row>
      </div>

    </>
  );
};
export default Profile;



