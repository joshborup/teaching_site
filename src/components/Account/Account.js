import React from "react";
import { useSelector } from "react-redux";
import { Course } from "../Course/Course";

export default function Account() {
  const user = useSelector(({ userDux: user }) => user.user);
  const mappedUserCourses =
    user.saved_courses && user.saved_courses.length
      ? user.saved_courses.map(course => {
          return <Course key={course._id} course={course} user={user} />;
        })
      : [];

  return (
    <div>
      <div className="account-saved-course-container">
        <h1>Account</h1>
        <div>{mappedUserCourses}</div>
      </div>
    </div>
  );
}
