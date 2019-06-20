import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { timeFormatter } from "../../utils/frontUtils";
import { Switch, Route, NavLink } from "react-router-dom";

import YouTube from "react-youtube";
import axios from "axios";

const opts = {
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1
  }
};

function ClassPreview({
  title,
  description,
  link,
  sections,
  repo_link,
  removeSection,
  timestamp,
  image
}) {
  const [youtube, setYoutube] = useState();

  function _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.playVideo();
    event.target.seekTo(timestamp || 0, true);
    setYoutube(event.target);
  }
  return (
    <div>
      <div>
        <h2>{title}</h2>
      </div>
      <div>{description}</div>
      <div>
        <img src={image} />
      </div>
      <div>
        {link ? (
          <YouTube
            videoId={link.split("v=")[1].substring(0, 11)}
            opts={opts}
            onReady={_onReady}
          />
        ) : null}
      </div>
      <div className="button-container">
        {sections.map((individualSection, index) => {
          const { section, timestamp } = individualSection;
          return (
            <button
              className="seekerbutton"
              onClick={() => youtube.seekTo(timestamp)}
            >
              <span>{section}</span>
              <span>{timeFormatter(timestamp)}</span>
              <button onClick={() => removeSection(section, timestamp)}>
                X
              </button>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AddClass(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [section, setSection] = useState("");
  const [sections, setSections] = useState([]);
  const [timestamp, setTimestamp] = useState(0);
  const [repo_link, setRepoLink] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  function addNewClass(event) {
    event.preventDefault();
    if (title && description && link && sections && repo_link && image) {
      axios
        .post("/api/admin/course", {
          title,
          description,
          link,
          sections,
          repo_link,
          image
        })
        .then(res => {
          dispatch({ type: "SET_COURSES", payload: res.data });
        });
    } else {
      setMessage("Must fill out all values");
    }
  }

  function removeSection(sectionName, sectionTimestamp) {
    const updatedSections = sections.filter(element => {
      return (
        element.section !== sectionName &&
        element.timestamp !== sectionTimestamp
      );
    });

    setSections(updatedSections);
  }

  return (
    <div>
      <ClassPreview
        {...{
          title,
          description,
          link,
          repo_link,
          timestamp,
          image,
          sections,
          removeSection
        }}
      />

      <form className="add-class-form" onSubmit={addNewClass}>
        <h2>Content</h2>
        <div>
          <label>Title</label>
          <input
            name="title"
            value={title}
            onChange={({ target: { value } }) => setTitle(value)}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            name="description"
            value={description}
            onChange={({ target: { value } }) => setDescription(value)}
          />
        </div>
        <div>
          <label>Course Image</label>
          <input
            name="image"
            value={image}
            onChange={({ target: { value } }) => setImage(value)}
          />
        </div>
        <div>
          <label>Youtube Link</label>
          <input
            name="link"
            value={link}
            onChange={({ target: { value } }) => setLink(value)}
          />
        </div>
        <h2>Sections</h2>
        <div>
          <div>
            <label>Section name</label>
            <input
              name="section"
              value={section}
              onChange={({ target: { value } }) => setSection(value)}
            />
          </div>
          <div>
            <label>Timestamp</label>

            <input
              name="timestamp"
              value={timestamp}
              onChange={({ target: { value } }) => setTimestamp(value)}
            />
          </div>
          <button
            onClick={event => {
              event.preventDefault();
              setSections([...sections, { section, timestamp }]);
              setSection("");
              setTimestamp(0);
            }}
          >
            add
          </button>
        </div>
        <h2>Resources</h2>
        <div>
          <label>Git Repository Link</label>
          <input
            name="repo_link"
            value={repo_link}
            onChange={({ target: { value } }) => setRepoLink(value)}
          />
        </div>

        <button>Submit</button>
        <span>{message}</span>
      </form>
    </div>
  );
}

function CourseView() {
  const courses = useSelector(({ courseDux }) => courseDux.courses);
  const dispatch = useDispatch();

  function removeCourse(id) {
    axios.delete(`/api/admin/course/${id}`).then(res => {
      dispatch({ type: "SET_COURSES", payload: res.data });
    });
  }

  return (
    <div className="admin-course-view">
      {courses.map(course => {
        return (
          <div>
            <span>{course.title}</span>
            <button onClick={() => removeCourse(course._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

function AdminHeaderLinks() {
  return (
    <div className="admin-nav-links">
      <NavLink to="/admin/classview">Class View</NavLink>
      <NavLink to="/admin/addclass">Add Class</NavLink>
    </div>
  );
}

function Admin() {
  return (
    <div className="admin-total-container">
      <AdminHeaderLinks />

      <div className="admin-container">
        <Switch>
          <Route
            path="/admin/addclass"
            render={() => {
              return <AddClass />;
            }}
          />
          <Route
            path="/admin/classview"
            render={() => {
              return <CourseView />;
            }}
          />
        </Switch>
      </div>
    </div>
  );
}

export default Admin;
