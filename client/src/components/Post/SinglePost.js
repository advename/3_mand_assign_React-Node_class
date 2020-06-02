import React, { useState, useEffect } from "react";
import styles from "./Post.module.css";
import { useParams } from "react-router-dom";

export default function PostItem() {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  let { id } = useParams();

  function formatDate(dateString) {
    // Convert 'yyyy-mm-dd hh:mm:ss' to 'mm/dd/yyyy hh:mm:ss'
    var dt = new Date(dateString);
    return dt.toLocaleString();
  }

  function fetchPost() {
    // Where we're fetching data from
    fetch(`http://${window.location.hostname}/api/posts/${id}`, {
      credentials: "include"
    })
      // We get the API response and receive data in JSON format...
      .then(res => {
        if (!res.ok) {
          throw new Error(["Error loading todos"]);
        } else {
          return res.json();
        }
      })
      // ...then we update the users state
      .then(data => {
        console.log(data);
        setPost(data);
        setIsLoading(false);
      })
      // Catch any errors we hit and update the app
      .catch(error => {
        setIsLoading(false);
        setErrors(error);
      });
  }

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div>
      <div className={styles.singlePost}>
        {!isLoading ? (
          <div>
            <p className={styles.title}>{post.title}</p>
            <p className={styles.author}>
              By: {post.user.username} - {formatDate(post.created)}
            </p>
            <p className={styles.body}>{post.body}</p>
          </div>
        ) : (
          <p>Loading post...</p>
        )}
      </div>
    </div>
  );
}
