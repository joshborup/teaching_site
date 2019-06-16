import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import YouTube from "react-youtube";
import axios from "axios";

const opts = {
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1
  }
};

function SingleCourse(props) {
  const [course, setCourse] = useState({});
  const [youtube, setYoutube] = useState();
  const [sectionSeconds, setSectionSeconds] = useState(0);
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

  function _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.playVideo();
    event.target.seekTo(sectionSeconds, true);
    setYoutube(event.target);
  }

  function setTime(time) {}

  const { title, description, link } = course;
  console.log(sectionSeconds);
  return (
    <div className="single-course-container">
      <h1>{title}</h1>
      <input
        type="number"
        onChange={({ target: { value } }) => youtube.seekTo(value)}
      />
      <div className="link-container">
        {link ? (
          <YouTube
            videoId={link.split("v=")[1].substring(0, 11)}
            opts={opts}
            onReady={_onReady}
          />
        ) : null}
      </div>
      <div>{description}</div>
    </div>
  );
}

export default withRouter(SingleCourse);
