import React, { useState } from "react";
import { Link } from "react-router-dom";
import fetchCourse from "../../hooks/fetchCourse";
import { MdStar, MdStarBorder, MdSearch } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function Save({ id, saved }) {
  const [toggle, setToggle] = useState(saved);
  const dispatch = useDispatch();

  async function saveCourse() {
    const savedCourse = await axios
      .put(`/api/user/course/${id}?star=${!toggle}`)
      .catch(err => console.log(err));
    if (savedCourse)
      dispatch({
        type: "SET_USER_SAVED_COURSES",
        payload: savedCourse.data.saved_courses
      });
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

export function Course({ course, user }) {
  const mappedUserCourses =
    user.saved_courses && user.saved_courses.length
      ? user.saved_courses.map(course => {
          return course._id;
        })
      : [];

  const { title, _id, image, description } = course;

  return (
    <div className="course-card" key={_id}>
      <div className="course-card-title">
        <h2>{title}</h2>
        <Save saved={mappedUserCourses.includes(_id)} id={_id} />
      </div>
      <div className="course-card-image">
        <img src={image} alt="" />
      </div>
      <div>{description}</div>
      <Link to={`/course/${_id}`}>
        <button>Start Learning</button>
      </Link>
    </div>
  );
}

export default function CourseView(props) {
  const [courses] = fetchCourse("/api/courses");
  const user = useSelector(({ userDux: user }) => user.user);
  const [search, setSearch] = useState("");
  const filteredCourse = courses
    ? courses.filter(item => {
        console.log(item);
        return item.title.toLowerCase().includes(search.toLowerCase());
      })
    : null;

  const mappedCourses = filteredCourse.map(course => {
    return <Course key={course._id} course={course} user={user} />;
  });
  return (
    <div className="course-container">
      <h1>Course Search</h1>
      <div className="course-search">
        <div>
          <MdSearch />
        </div>{" "}
        <input
          value={search}
          onChange={({ target: { value } }) => setSearch(value)}
        />
      </div>
      <div className="separator" />
      <div>{mappedCourses}</div>
    </div>
  );
}
