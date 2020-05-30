const express = require("express");
const router = express.Router();
const Post = require(__dirname + "/../../models/Post.js"); // Extra: Import the User
const { isAuthenticated } = require(__dirname + "/../../helpers/auth.js");

/**
 * Get all posts
 */
router.get("/", async (req, res, next) => {
  const posts = await Post.query()
    .withGraphFetched("user")
    .orderBy("created", "desc");
  console.log(posts);
  res.json(posts);
});

/**
 * Get one specific post
 */
router.get("/:postId/", async (req, res, next) => {
  const posts = await Post.query()
    .findById(req.params.postId)
    .withGraphFetched("user");
  res.json(posts);
});

/**
 * Create a new post
 */
router.post("/", isAuthenticated, async (req, res, next) => {
  const { title, body } = req.body;
  try {
    const user_id = req.session.user.id;
    const post = await Post.query().insert({ title, body, user_id });
    res.json(post);
  } catch (err) {
    next(err);
  }
});

/**
 * Delete a single post
 */
router.delete("/", isAuthenticated, async (req, res, next) => {
  const { id } = req.body;

  // Find the post and if exists, delete it
  try {
    const post = await Post.query()
      .findById(id)
      .throwIfNotFound(); // throws an NotFoundError if the post could not be found
    await post.$query().delete(); // delete the post
    res.json(post); // return the deleted post inside the body
  } catch (err) {
    next(err);
  }

  /**
   * NOTE
   * The reason why we use two queries instead of only one is
   * because of MySQL limitations. ".deleteById" only returns the amount of affected rows.
   * With our two queries approach, we can return the deleted data to the user.
   * It's not REST API standard to return the deleted data, but
   * one of many common practices to inform the user about a successfull removal.   *
   */
});

// /**
//  * Update the post, only the "done" field
//  */
// router.patch("/", isAuthenticated, async (req, res, next) => {
//   const { id, done } = req.body;
//   try {
//     const todo = await Todo.query()
//       .findById(id)
//       .throwIfNotFound(); // throws an NotFoundError if the todo could not be found
//     await todo.$query().patch({ done }); // update the todo
//     res.json(todo); // return the updated todo
//   } catch (err) {
//     next(err);
//   }

//   /**
//    * NOTE
//    * The reason why we use two queries instead of only one is
//    * because of MySQL limitations. ".patchd" only returns the amount of affected rows.
//    * With our two queries approach, we can return the updated data to the user.
//    * It's not REST API standard to return the upadted data, but
//    * one of many common practices to inform the user about a successfull update.
//    */
// });

// Export to api.js
module.exports = router;
