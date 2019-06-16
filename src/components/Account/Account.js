import React from "react";
import { useSelector } from "react-redux";
import { Course } from "../Course/Course";
import testImage from "./test.jpg";

export function Avatar({ image, username, email }) {
  console.log(username);
  return (
    <div className="avatar-container">
      <div className="img-container">
        <img src={testImage} />
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
      <div>User Data Here</div>
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
