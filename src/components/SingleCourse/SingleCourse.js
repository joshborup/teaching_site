import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

function SingleCourse(props) {
  const [course, setCourse] = useState({});
  async function getCourse() {
    const course = await axios
      .get(`/api/admin/course/${props.match.params.id}`)
      .catch(err => console.log(err));
    setCourse(course.data);
  }
  useEffect(() => {
    let current = true;

    if (current) {
      getCourse();
    }

    return () => {
      current = false;
    };
  }, []);
  const { title, description } = course;
  return (
    <div>
      <h1>{title}</h1>
      <div>{description}</div>
    </div>
  );
}

export default withRouter(SingleCourse);
