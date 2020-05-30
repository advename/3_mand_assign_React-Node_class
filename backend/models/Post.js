// Import Model class from Objection.js
const { Model } = require("objection");

const User = require(__dirname + "/./User.js");

// Create the Todo model class
class Post extends Model {
  static get tableName() {
    return "posts";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "user_id", "body"],

      properties: {
        id: { type: "integer" },
        post: { type: "string", minLength: 1, maxLength: 255 },
        body: { type: "string", minLength: 5 },
        user_id: { type: "integer" }
      }
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        filter: query => query.select("users.username"), // only return the username of the relative user
        join: {
          from: "posts.user_id",
          to: "users.id"
        }
      }
    };
  }
}

// Export the Todo to be used in routes
module.exports = Post;
