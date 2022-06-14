import React, { useEffect, createElement, useState } from "react";
import axios from "axios";
import {
  Dropdown,
  message,
  Tooltip,
  Button,
  Space,
  Table,
  Tag,
  Avatar,
  Comment,
  List
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import 'antd/dist/antd.css';

import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
} from "@ant-design/icons";
import moment from 'moment';



const EditComment = ({editInfo}) => {
  const [data, NewData] = useState({
    content: "",
  });
  const [commentsData, setCommentsData] = useState([])
 
  const userId = localStorage.userId

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];

  useEffect(() => {
    setCommentsData(editInfo)
  }, [editInfo])

console.log("edit info", editInfo );
  const handleChange2 = (event) => {
    NewData({
      ...data,
      [event.target.name]: event.target.value,
    });
    
  };

  const deleteComment = (id) => {
    const body = {
      content: data.content,
    };


    console.log(data);
    axios
      .post(
        `https://soapp-nodejs.herokuapp.com/post/delete-comment/${id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-info")}`,
          },
        }
      )
      .then((res) => console.log("ggggg1", res.data))
      .catch((e) => console.log(e));
  };




  const handleFromSubmit1 = (id) => {
    
    const body = {
      content: data.content,
    };
    console.log(data);
    axios
      .post(
        `https://soapp-nodejs.herokuapp.com/post/update-comment/${id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-info")}`,
          },
        }
      )
      .then((res) => console.log("ggggg1", res.data))
      .catch((e) => console.log(e));

  };

  
  const columns = [
    {
      key: "1",
      title: "Name",
      dataIndex: "first_name",
    },
    {
      key: "2",
      dataIndex: "last_name",
    },
    {
      key: "3",
      title: "Comment",
      dataIndex: "content",
    },
    
    {
      key: "4",
      // title: "Actions",
      render: (info) => {
        return (
          <>
            {userId == info.user_id && (
              <form className="edit_from">
                <br />
                <div className="name">
                  <input
                    className="edit_input"
                    type="text"
                    name="content"
                    onChange={handleChange2}
                  />
                </div>

                <Tooltip placement="topLeft" title="Follow this user">
                  <Button
                    type="primary"
                    shape="round"
                    onClick={() => handleFromSubmit1(info.id)}
                  >
                    <EditOutlined />
                    Edit
                  </Button>
                </Tooltip>
              </form>
            )}
          </>
        );
      },
    },
    {
        key: "5",
        render: (info) => {
          return (
            <>
              {(userId == info.user_id) && 
              (
               
                  
                <Tooltip placement="topLeft" title="Follow this user">
                  <Button
                    type="primary"
                    shape="round"
                    onClick={()=> deleteComment(info.id)}
                  >
                    Delete
                  </Button>
                </Tooltip>
              )
  
              }
           
               
  
            </>
          );
        },
      
    }
  ];


  return (
    <>
     <List
    className="comment-list"
    // header={`${data.length} replies`}
    itemLayout="horizontal"
    dataSource={commentsData}
    renderItem={(item) => (
      <li>
        {/* <Comment
          actions={item.actions}
          author={item.first_name + " " +item.last_name}
          avatar={item.picture}
          content={item.content}
        /> */}
        <Comment
      actions={actions}
      author={item.first_name + " " +item.last_name}
      avatar={<Avatar src={item.profile_picture} alt={item.first_name} />}
      content={
        <p className="comment_list">
          {item.content}
        </p>
      }
      datetime={
        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment(item.updatedAt).fromNow()}</span>
        </Tooltip>
      }
    />
        <Tooltip placement="topLeft" title="Follow this user">
                  <Button
                    type="primary"
                    shape="round"
                    onClick={()=> deleteComment(item.id)}
                  >
                    Delete
                  </Button>
                </Tooltip>
                

      </li>
      
    )}
  />
    {/* <Table columns={columns} dataSource={commentsData} /> */}
    </>
  );
};

export default EditComment;
