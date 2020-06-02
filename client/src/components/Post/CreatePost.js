import React, { useState } from "react";
import styles from "./Post.module.css";
import { useHistory } from "react-router-dom";

export default function SinglePost() {
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const [errors, setErrors] = useState(null);
  const history = useHistory();

  function createNewPost() {
    // Update done status
    fetch(`${window.location.href}api/posts/`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ title, body }),
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(["Error loading todos"]);
        } else {
          return res.json();
        }
      })
      .then(data => {
        history.push("/post/" + data.id);
        console.log(data);
      })
      .catch(err => {
        setErrors(err);
      });
  }

  return (
    <div>
      <div className={styles.createPost}>
        <form>
          <input
            type="text"
            placeholder="Post Title"
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            id="w3review"
            name="w3review"
            rows="4"
            cols="50"
            onChange={e => setBody(e.target.value)}
            defaultValue=" Content of your new post"
          ></textarea>
          <button type="button" onClick={createNewPost}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
