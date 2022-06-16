// import React, { useState } from 'react'
// import axios from "axios";
// import { Button, Card, Menu } from "antd";
// import { Dropdown, message, Tooltip, Table } from "antd";
// import { AppstoreAddOutlined, UserOutlined } from "@ant-design/icons";
// import Moment from 'react-moment';



// const ImageUpload = () => {
//     const [loading, setLoading] = useState(false)
//     const [image, setImage] = useState("")

//     function handleMenuClick(e) {
//         message.info("Click on menu item.");
//         console.log("handle manu click work");
//         console.log("click", e);
//       }
    

//     const uploadImage = async e =>{
//         console.log(e.target.files[0])
//         // console.log(image)
//         const data = new FormData()
//         data.append('file', e.target.files[0]) 
//         // data.append("fileName", image.name)

//         data.append('upload_preset','ahasan_images')
//         setLoading(true)


//         return await axios
//         .post("https://api.cloudinary.com/v1_1/v2-tech/image/upload", data)
//         .then((res) => {
//             console.log(res)
//         })
//         .catch((error) => {
//             console.log(error)
//         //   commit(
//         //     "SHOW_SNACKBAR",
//         //     {
//         //       text: "Something went wrong while uploading image. Please try valid image format.",
//         //       color: "error",
//         //     },
//         //     { root: true }
//         //   );
//         //   return false;
//         });
//     }

//     const menu = (
//         <Menu
//           onClick={handleMenuClick}
//           items={[
//             {
//               label: "1st menu item",
//               key: "1",
//               icon: <UserOutlined />,
//             },
//             {
//               label: "2nd menu item",
//               key: "2",
//               icon: <UserOutlined />,
//             },
//             {
//               label: "3rd menu item",
//               key: "3",
//               icon: <UserOutlined />,
//             },
//           ]}
//         />
//       );

    
//   return (
//     <div className='App'>
//         <h1>Upload Image to Cloudinary in React</h1>
//         <input type="file" name="file" placeholder='Upload an image' onChange={(e) => uploadImage(e)}/>
        
//         {/* <button onClick={uploadImage}>Upload Image</button> */}

//         {/* <Dropdown.Button
//             overlay={menu}
//             placement="bottom"
//             icon={<AppstoreAddOutlined />}
//           >
//             More
//           </Dropdown.Button> */}
//           <Dropdown
//           overlay={(
//             <Menu>
//               <Menu.Item key="0">
//                 Menu Item One
//               </Menu.Item>
//               <Menu.Item key="1">
//               Menu Item Two
//               </Menu.Item>
//               <Menu.Item key="1">
//               Menu Item Three
//               </Menu.Item>
//             </Menu>
//           )}
//           trigger={['click']}>
//           <a className="ant-dropdown-link" 
//              onClick={e => e.preventDefault()}>
//             Open Dropdown
//           </a>
//         </Dropdown><br />
//         <Moment toNow>1976-04-19T12:59-0500</Moment>
//         <nav className="navbar">
//         <div className="nav-container">
//           <ul className={click ? "nav-menu active" : "nav-menu"}>
//             {/* {localStorage.getItem('role') === '2'} */}
//             <li className="nav-item">
//               <NavLink
//                 to="/home"
//                 activeClassName="active"
//                 className="nav-links"
//                 onClick={handleClick}
//               >
//                 Home
//               </NavLink>
//               <NavLink
//                 to="/follow"
//                 activeClassName="active"
//                 className="nav-links"
//                 onClick={handleClick}
//               >
//                 Users
//               </NavLink>
//             </li>
//             <li className="nav-item"></li>
//             <li className="nav-item">
//               <NavLink
//                 to="/unfollow"
//                 activeClassName="active"
//                 className="nav-links"
//                 onClick={handleClick}
//               >
//                 <Tooltip placement="topLeft" title="Unfollow users">
//                   Followers
//                 </Tooltip>
//               </NavLink>
//             </li>
//             {/* <li className="nav-item">
//               <NavLink
//                 to="/profile"
//                 activeClassName="active"
//                 className="nav-links"
//                 onClick={handleClick}
//               >
//                 Profie
//               </NavLink>
//             </li> */}

//             <li className="nav-item">
//               <NavLink
//                 to="/createpost"
//                 activeClassName="active"
//                 className="nav-links"
//                 onClick={handleClick}
//               >
//                 Create Post
//               </NavLink>
//             </li>

//             <li className="nav-item">
//               <NavLink
//                 to="/"
//                 activeClassName="active"
//                 className="nav-links"
//                 onClick={logout}
//               >
//                 Logout
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 to="/profile"
//                 activeClassName="active"
//                 className="nav-links"
//                 onClick={handleClick}
//               >
//                 {userData.length > 0
//                   ? userData.map((el) => 
                  
//                   <Avatar
//                   src={
//                     <Image
//                       src={el.profile_picture}
//                       style={{
//                         width: 45,
//                       }}
//                       alt={userData.first_name}
//                     />
                    
//                   }
//                 />
                
                
//   )
//                   : console.log("sdfsd")}
//                             </NavLink>
//             </li>

//             <li className="nav-item">
//               <NavLink
//                 to="/profile"
//                 activeClassName="active"
//                 className="nav-links"
//                 onClick={handleClick}
//               >
//                 {userData.length > 0
//                   ? userData.map((el) => 
                  
//                   <>{el.first_name + " " + el.last_name}</>
                
                
//   )
//                   : console.log("sdfsd")}
//                             </NavLink>
//             </li>
//           </ul>
//           <div className="nav-icon" onClick={handleClick}>
//             <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
//           </div>
//         </div>
//       </nav>

//     </div>
//   )
// }

// export default ImageUpload