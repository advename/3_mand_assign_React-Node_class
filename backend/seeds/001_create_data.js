exports.seed = function(knex) {
  // Deletes ALL data of posts
  return knex("posts")
    .del()
    .then(() => {
      //Delete ALL data of users
      return knex("users").del();
    })
    .then(() => {
      //Inserts new data into users
      return knex("users").insert([
        {
          username: "marc1",
          email: "marc@example.com",
          password:
            "$2b$10$7IS2wQGXPMwl9U/r2Pk5L.9QnBj57VuUDpCiB5P6Xbdh.FpxbA5ri" // -> "hello"
        },
        {
          username: "jlo22",
          email: "jlo22@example.com",
          password:
            "$2b$10$SJR.7MZDrZRCR7yciv1X4.gHwEmu8ODKr5xcQCjlipKckMD3ZVaCW" // ->  "hello"
        },
        {
          username: "hakuna",
          email: "hakuna@example.com",
          password:
            "$2b$10$JFv1AF7qNizxvAJrl6gNmu.SzDWkRk0ILkN8kF/6qyqXacBdPkUhK" // -> "hello"
        }
      ]);
    })
    .then(users => {
      /**
       * We can use the callback of the previous users inserts,
       * which returns a single item or an array of items (array only available in PostgreSQL), to
       * insert posts data and establish the relationship with users.
       */
      return knex("posts").insert([
        {
          user_id: 1,
          title: "How to make cookies",
          body:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat illum tempore animi ex culpa suscipit quod fuga, excepturi repellendus minima eius natus, aliquam deleniti at ratione quos odit quis. Nesciunt."
        },
        {
          user_id: 1,
          title: "The day i figured out water is tasteless",
          body:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat illum tempore animi ex culpa suscipit quod fuga, excepturi repellendus minima eius natus, aliquam deleniti at ratione quos odit quis. Nesciunt."
        },
        {
          user_id: 1,
          title: "Obama is the president",
          body:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat illum tempore animi ex culpa suscipit quod fuga, excepturi repellendus minima eius natus, aliquam deleniti at ratione quos odit quis. Nesciunt."
        }
      ]);
    });
};
