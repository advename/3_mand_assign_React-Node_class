import React, { useState, useEffect } from "react";
import styles from "./Post.module.css";
import { useHistory } from "react-router-dom";
import PostItem from "./PostItem.js";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const history = useHistory();

  function fetchPosts() {
    // Where we're fetching data from
    fetch(`http://${window.location.hostname}/api/posts/`, {
      credentials: "include"
    })
      // We get the API response and receive data in JSON format...
      .then(res => {
        console.log(res);
        if (!res.ok) {
          throw new Error(["Error loading todos"]);
        } else {
          return res.json();
        }
      })
      // ...then we update the users state
      .then(data => {
        setPosts(data);
        setIsLoading(false);
      })
      // Catch any errors we hit and update the app
      .catch(error => {
        setIsLoading(false);
        setErrors(error);
      });
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <div className={styles.postList}>
        {!isLoading ? (
          <React.Fragment>
            <ul>
              {posts.map(item => (
                <PostItem key={item.id} item={item} />
              ))}
            </ul>
          </React.Fragment>
        ) : (
          <p>Loading posts...</p>
        )}
      </div>
    </div>
  );
}
