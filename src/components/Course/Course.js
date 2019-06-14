import React, { useState } from "react";
import { Link } from "react-router-dom";
import fetchCourse from "../../hooks/fetchCourse";
import { MdStar, MdStarBorder } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function Save({ id, saved }) {
  const [toggle, setToggle] = useState(saved);
  const dispatch = useDispatch();

  async function saveCourse() {
    const savedCourse = await axios
      .put(`/api/user/course/${id}`)
      .catch(err => console.log(err));
    dispatch({ type: "SET_USER", payload: savedCourse });
    setToggle(!toggle);
  }
  return (
    <div>
      <button onClick={() => saveCourse(id)} className="save-on-card">
        {toggle ? (
          <MdStar className="star chosen" />
        ) : (
          <MdStarBorder className="star" />
        )}
      </button>
    </div>
  );
}

export default function CourseView(props) {
  const [courses, setCourses] = fetchCourse("/api/courses");
  const user = useSelector(({ userDux: user }) => user.user);
  console.log("this part", user);
  const mappedCourses = courses.map(course => {
    const mappedUserCourses =
      user.saved_courses && user.saved_courses.length
        ? user.saved_courses.map(course => {
            return course._id;
          })
        : [];
    return (
      <div className="course-card" key={course._id}>
        <div className="course-card-title">
          <h2>{course.title}</h2>
          <Save
            saved={mappedUserCourses.includes(course._id)}
            id={course._id}
          />
        </div>
        <div className="course-card-image">
          <img src={course.image} />
        </div>
        <div>{course.description}</div>
        <Link to={`/course/${course._id}`}>
          <button>Start Learning</button>
        </Link>
      </div>
    );
  });
  return (
    <div className="course-container">
      <h1>Course View</h1>
      <div>{mappedCourses}</div>
    </div>
  );
}
