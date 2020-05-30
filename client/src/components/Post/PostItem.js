import React from "react";
import styles from "./Post.module.css";
import { Link } from "react-router-dom";

export default function PostItem({ item }) {
  let bodyLengthLimit = 50;

  return (
    <li key={item.id} className={styles.postItem}>
      <Link to={"/post/" + item.id}>
        <p className={styles.title}>{item.title}</p>
        <p className={styles.author}>By: {item.user.username}</p>
        {item.body.length < bodyLengthLimit ? (
          <p className={styles.body}>{item.body}</p>
        ) : (
          <p className={styles.body}>
            {item.body.substring(0, bodyLengthLimit) + "..."}
          </p>
        )}
      </Link>
    </li>
  );
}
