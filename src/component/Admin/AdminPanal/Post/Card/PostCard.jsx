import { Button, Card, Menu, Form, Typography } from "antd";
import React, { useState, useEffect, useRef, createElement } from "react";
import { LikeOutlined, CommentOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { Modal } from "antd";

import { Dropdown, message, Tooltip, Table } from "antd";
import { AppstoreAddOutlined, UserOutlined } from "@ant-design/icons";
import EditComment from "./EditComment";
import { Row, Col, Input } from "antd";

const { TextArea } = Input;
const { Title } = Typography;

const PostCard = ({ postInfo }) => {
  const [values, setValues] = useState({
    content: "",
    index: "",
  });

  const [editValues, setEditValues] = useState({
    content: "",
    index: "",
  });

  const [data, NewData] = useState({
    content: "",
  });

  const [comment, setCommnet] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [userData, setUserData] = useState({});
  const [image, setImage] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("kdhfjf");
  const [wrapComment, setwrapComment] = useState(false);
  const [initialLike, setInitialLike] = useState(false);
  const [addLike, setAddLike] = useState(parseInt(postInfo.total_like))
  const [newLike, setNewLike] = useState(postInfo.islike)
  const userId = localStorage.userId;

  const refContainer = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (refContainer.current) {
      setDimensions({
        width: refContainer.current.offsetWidth,
        height: refContainer.current.offsetHeight,
      });
    }
  }, []);
  const [cls, setCls] = useState({
    backgroundColor: postInfo?.islike === true ? "blue" : "transparent", color: postInfo?.islike === true ? "white" : "black"
  });
  // console.log("cls", cls);

  useEffect(() => {
    axios
      .get(
        `https://soapp-nodejs.herokuapp.com/post/view-comment/${postInfo.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-info")}`,
          },
        }
      )
      .then((res) => {
        setDataSource(res.data.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const edithandleChange = (event) => {
    event.preventDefault();
    setEditValues({
      ...editValues,
      [event.target.name]: event.target.value,
    });
  };

  function handleButtonClick(e) {
    message.info("Click on left button.");
  }

  function handleMenuClick(e) {
    message.info("Click on menu item.");
  }

  const handleFromSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    axios
      .post(`https://soapp-nodejs.herokuapp.com/post/create-post`, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-info")}`,
        },
      })
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));

    // navigate("/login")
  };

  const postComment = (postInfo, id, content) => {
    setwrapComment(!wrapComment);
    const body = {
      post_id: id,
      content: values.content,
    };
    console.log(body);
    axios
      .post(`https://soapp-nodejs.herokuapp.com/post/create-comment`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-info")}`,
        },
      })
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));
    console.log(postInfo);
    console.log(values);
  };

  const Editpost = (postInfo, id, content) => {
    const body = {
      post_id: id,
      content: editValues.content,
    };
    console.log("editpost info", postInfo);
    console.log("xczxcxc", editValues);
    axios
      .patch(
        `https://soapp-nodejs.herokuapp.com/post/update-post/${postInfo.id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-info")}`,
          },
        }
      )
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));
    console.log(postInfo);
    console.log(editValues);
  };
  // console.log("postInfo", postInfo);
  const Like_Change = () => {
    console.log("color of bk", cls.backgroundColor);
    // cls.BackgroundColor === "transparent"
    //   ? setCls({ BackgroundColor: "blue" })
    //   : setCls({ BackgroundColor: "transparent" });
    if (cls.backgroundColor === "transparent") {
      setCls({ backgroundColor: "blue" , color: "white"});
    } else if (cls.backgroundColor === "blue") {
      setCls({ backgroundColor: "transparent", color: "black"  });
    }
  };

  const showModal = () => {
    setVisible(true);
  };

  const editPostModel = () => {
    <form className="from-wrapper">
      <div className="email">
        <div className="name">
          <label className="label">Comment</label>
          <input
            className="input"
            type="text"
            name="content"
            value={editValues.content}
            onChange={edithandleChange}
          />
        </div>
      </div>
      <Button
        type="primary"
        shape="round"
        icon={<EditOutlined />}
        size="large"
        onClick={() => Editpost(postInfo, postInfo.id, postInfo.content)}
      >
        Edit Comment
      </Button>
    </form>;
  };

  const handleOk = () => {
    setModalText(
      <form className="from-wrapper">
        <div className="email">
          <div className="name">
            <label className="label">Update Commnet </label>
            <input
              className="input"
              type="text"
              name="content"
              value={editValues.content}
              onChange={edithandleChange}
            />
          </div>
        </div>
        <Button
          type="primary"
          shape="round"
          icon={<EditOutlined />}
          size="large"
          onClick={() => Editpost(postInfo, postInfo.id, postInfo.content)}
        >
          Edit Comment
        </Button>
      </form>
    );
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const deletePost = (id) => {
    const body = {
      content: data.content,
    };
    axios
      .post(`https://soapp-nodejs.herokuapp.com/post/delete-post/${id}`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-info")}`,
        },
      })
      .then((res) => console.log("ggggg1", res.data))
      .catch((e) => console.log(e));
  };

  const Like_Count = (id) => {
    const body = {
      post_id: id,
    };
    console.log(body);
    axios
      .post(`https://soapp-nodejs.herokuapp.com/post/like-unlike`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-info")}`,
        },
      })
      .then((res) => {
        setAddLike(addLike + 1)
        setNewLike(false)
        console.log("like response", res);
      }
      )
      .catch((e) => console.log(e));
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
      {userId == postInfo.user_id && (

        <Button type="primary" onClick={showModal}>
          Update Post
        </Button>
      )}
        <Modal
          title="Title"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>
            {
              <form className="from-wrapper">
                <div className="email">
                  <div className="name">

                    <label className="label">Update Post</label>

                    <input
                      className="input"
                      type="text"
                      name="content"
                      value={editValues.content}
                      onChange={edithandleChange}
                    />
                  </div>
                </div>
                <Button
                  type="primary"
                  shape="round"
                  icon={<EditOutlined />}
                  size="large"
                  onClick={() =>
                    Editpost(postInfo, postInfo.id, postInfo.content)
                  }
                >
                  Edit Post
                </Button>
              </form>
            }
          </p>
        </Modal>
          
      </Menu.Item>
      <Menu.Item key="">
        {userId == postInfo.user_id ? (
          <Tooltip placement="topLeft" title="Follow this user">
            <Button
              type="primary"
              shape="round"
              onClick={() => deletePost(postInfo.id)}
            >
              Delete
            </Button>
          </Tooltip>
        ): <p>It's not your post</p>}
      </Menu.Item>
      <Menu.Item key="3">xcvxc</Menu.Item>
    </Menu>
  );

  return (
    <>
 
    
      <Card
        title={postInfo.first_name + " " + postInfo.last_name}
        extra={
          <Dropdown.Button
            overlay={menu}
            placement="bottom"
            icon={<AppstoreAddOutlined />}
            className="ant-card-head"
          ></Dropdown.Button>
        }
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          backgroundColor: "#fafafa",
          margin: "20px",
        }}
        ref={refContainer}
      >
        <Row className="card_comment">
          <Col span={4}></Col>
          <Col span={16}>
            <div className="Data_Show" key={postInfo.id}>
              <h4 className=""> {postInfo.content}</h4>
              <h4>
                <img className="image_picture" src={postInfo.picture} alt="" />
              </h4>
            </div>
          </Col>
          <Col span={4}></Col>
        </Row>
        <hr style={{ marginBottom: "5px" }} />
        
        <Row>
          <Col span={12}>
            <Button
              shape="round"
              size="large"
              style={cls}
              // className={cls}
              onClick={() => {
                Like_Change();
                Like_Count(postInfo.id);
              }}
              // {() => cls.color === 'green' ? setCls({color: 'red'}) : setCls({color: 'green'}) like() }
            >
              <LikeOutlined />
              {parseInt(postInfo.total_like)} Like
            </Button>
          </Col>
          {/* </div> */}
          <Col span={12}>
            <Button
              type="primary"
              shape="round"
              icon={<CommentOutlined />}
              size="large"
              onClick={() =>
                postComment(postInfo, postInfo.id, postInfo.content)
              }
            >
              {postInfo.total_comment}
              Comment
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={6}></Col>
          <Col span={12}>
            {wrapComment && (
              <>
              
                <Form.Item>
                  <TextArea
                    style={{ marginTop: "7px" }}
                    rows={4}
                    type="text"
                    name="content"
                    onChange={handleChange}
                    value={values.content}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    htmlType="submit"
                    // loading={submitting}
                    onClick={() =>
                      postComment(postInfo, postInfo.id, postInfo.content)
                    }
                    type="primary"
                  >
                    Add Comment
                  </Button>
                </Form.Item>
                <div>
                  {/* {dataSource.length > 0 ?
                <EditComment editInfo={dataSource} />
             :
              <h1>Data not found</h1>
            } */}
                  <EditComment editInfo={dataSource} />
                </div>{" "}
              </>
            )}
          </Col>
          <Col span={6}></Col>
        </Row>
      </Card>
     
 
    
    </>
  );
};

export default PostCard;
