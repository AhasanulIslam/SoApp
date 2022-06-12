import { Collapse } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navber from "../../Navber";
import Validation from "../../SignUp/Validation";
import PostCard from "./Post/Card/PostCard";
import { Cascader } from 'antd';
import 'antd/dist/antd.css';
import { Row, Col, Input } from 'antd';



import { 
  Select
} from 'antd';

const { Panel } = Collapse;
const { TextArea } = Input;

const Home = () => {
  const [values, setValues] = useState({
    content: "",
    index: "",
  });

  const [values1, setValues1] = useState("")
  const [isEditing, setIsEditing] = useState(false);
  const [viewuser, setViewUser] = useState([])
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState({})
  const [options, setOptions] = useState([]);
  const [taguser, setTagUser] = useState([])
  

  useEffect(() => {
    const changedUsers = viewuser.map(user => {
      return {
        label: `${user.first_name} ${user.last_name}`,
        value: user.id
      }
    })
    setOptions(changedUsers)
  }, [viewuser])

console.log("change users", viewuser);

  useEffect(() => {
    console.log("view userlist api works");
    axios
      .get("https://soapp-nodejs.herokuapp.com/users/view-userlist", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-info")}`,
        },
      })
      .then((res) => {
        console.log("response of userlist : ", res);
        setViewUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

const fatchUserData = () => {
  axios
  .get("https://soapp-nodejs.herokuapp.com/post/view-post", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("user-info")}`,
    },
  })
  .then((res) => {
    console.log("view post", res.data.data);
    setUserData(res.data.data);
  })
  .catch((err) => {
    console.log(err);
  });
}

  useEffect(() => {
    console.log("lsdkflsdk");
    fatchUserData();
  }, [isEditing]);



  
  console.log("image response",response);
  const { Option } = Select;


  const [errors, setErrors] = useState({});

  const [dataIsCorrect, setDataIsCorrect] = useState(false)

  const handleChange = (event) => {
      setValues1(
           event.target.value
      )
  }




  const postHandleFromSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values1))
    setDataIsCorrect(true)
    console.log(values1);
    axios.post(`https://soapp-nodejs.herokuapp.com/post/create-post`,
{
  content: values1,
  imageUrl: response.url,
  tag_id: taguser.flat()
},
 {
  headers: {

    Authorization: `Bearer ${localStorage.getItem("user-info")}`,
  },
})
    .then(res => {
      setTagUser([]);
      setValues1("");
      fatchUserData()
    }
    )
    .catch(e => console.log(e))

}





  const handleFromSubmit = async e => {
    console.log(e.target.files[0])
    // console.log(image)
    const data = new FormData()
    data.append('file', e.target.files[0]) 
    // data.append("fileName", image.name)

    data.append('upload_preset','ahasan_images')
    setLoading(true)

      e.preventDefault();
      setErrors(Validation(values1))
      setDataIsCorrect(true)
      console.log(values1);

      return await axios
    .post("https://api.cloudinary.com/v1_1/v2-tech/image/upload", data)
    .then((res) => {
      setResponse(res.data)
  
    })
    .catch((error) => {
        console.log(error)

    });
  }

  useEffect(() => {
      if(Object.keys(errors).length === 0 && dataIsCorrect){
          // submitForm(true)
      }
  }, [errors])



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
      axios.post(`https://soapp-nodejs.herokuapp.com/post/create-post`,
        {
          imageUrl: res.data.url
        },
        {
         headers: {
   
           Authorization: `Bearer ${localStorage.getItem("user-info")}`,
         },
       }) 
           .then(res => console.log(res.data)
           )
           .catch(e => console.log(e))
  
        console.log(res)
    })
    .catch((error) => {
        console.log(error)

    });
  }

  const onChange = (value) => {
    console.log("value of tag user change", value.flat(0));
    setTagUser(value)
  };


  return (
    <div className="full_div" style={{ marginTop: 16 }}>
      <Navber />
      <span>Use Content or Image</span>

      <form>
        <Row>
          <Col span={6}></Col>
          <Col span={12}>
            <TextArea
              rows={4}
              placeholder="Write your post"
              type="text"
              name="content"
              value={values1}
              onChange={handleChange}
            />
          </Col>
          <Col span={6}></Col>
        </Row>
        <Row>
          <Col span={6}></Col>

          <Col span={12} style={{ justifyContent: "left", display: "grid", marginTop: "5px" }}>
            <Cascader
              options={options}
              onChange={onChange}
              value={taguser}
              placeholder={"tag people"}
              multiple
              maxTagCount="responsive"
            />
            
            <input
               style={{marginTop: "5px"
              }}
              type="file"   
              name="file"
              value={values1.imageUrl}
              placeholder="Upload an image"
              onChange={handleFromSubmit}
            />
            {/* sdfsdf */}
          </Col>
          <Col span={6}></Col>
        </Row>
        <Row>
          <Col span={6}></Col>
          <Col span={12}>
            <button className="submit" onClick={postHandleFromSubmit}>
              Post
            </button>
          </Col>
          <Col span={6}></Col>

        </Row>
      </form>
      {userData && userData.length > 0 ? (
        userData.map((el, index) => (
          // <h1>{el.quiz_name}</h1>
          <PostCard postInfo={el} key={index} />
        ))
      ) : (
        <h1>Data not found</h1>
      )}
    </div>
  );
};

export default Home;
