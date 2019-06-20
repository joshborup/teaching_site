import React from "react";
import { useSelector } from "react-redux";
import { Course } from "../Course/Course";
import { MdFileUpload } from "react-icons/md";
import ClourdinaryHook from "../../hooks/cloudinaryHook";

import testImage from "./test.jpg";

export function Avatar({ userImage, username, email }) {
  const [uploadedImage, handleImageUpload] = ClourdinaryHook(
    "/api/user-image-signing"
  );
  console.log(userImage);
  return (
    <div className="avatar-container">
      <div className="img-container">
        <img src={userImage} />
        <input
          type="file"
          className="upload-image"
          onChange={e => handleImageUpload(e.target.files)}
        />
      </div>

      <span className="name">{username}</span>
      <span className="email">{email}</span>
    </div>
  );
}

function UserSideBar() {
  const user = useSelector(({ userDux }) => userDux.user);
  console.log(user);
  return (
    <div>
      <Avatar {...user} />
    </div>
  );
}

export default function Account() {
  const user = useSelector(({ userDux: user }) => user.user);
  const mappedUserCourses =
    user.saved_courses && user.saved_courses.length
      ? user.saved_courses.map(course => {
          return <Course key={course._id} course={course} user={user} />;
        })
      : [];

  return (
    <div className="account-container">
      <UserSideBar />
      <div className="account-saved-course-container">
        <div>{mappedUserCourses}</div>
      </div>
    </div>
  );
}
