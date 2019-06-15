import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export default function FetchCourse(url) {
  const courses = useSelector(({ courseDux }) => courseDux.courses);

  const dispatch = useDispatch();
  function getCourses() {
    axios.get(url).then(res => {
      dispatch({ type: "SET_COURSES", payload: res.data });
    });
  }
  useEffect(() => {
    axios
      .get(url)
      .then(res => {
        dispatch({ type: "SET_COURSES", payload: res.data });
      })
      .catch(err => console.log(err));
  }, [dispatch, url]);
  console.log(courses);
  return [courses, getCourses];
}
