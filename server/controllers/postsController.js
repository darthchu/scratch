const db = require('../models/socialModels');

const postsController = {};

postsController.getAllPosts = (req, res, next) => {
  const query = `
    SELECT * FROM posts
    ORDER BY _id DESC`;
  db.query(query).then((data) => {
    res.locals.allPosts = data.rows;
    return next();
  });
};

postsController.getUserPosts = (req, res, next) => {
  const { id } = res.locals.user;
  const query = `
          SELECT u.username, p.body, p.title, p.user_id
          FROM users u, posts p
          WHERE u._id = $1 AND p.user_id = $1
          ORDER BY p._id DESC`;
  
  db.query(query, [id])
    .then((data) => {
      res.locals.userPosts = data.rows;
      return next();
    })
    .catch((err) => {
      return next(err);
    })
}

postsController.createPost = (req, res, next) => {
  const { user_id, title, body, type } = req.body;
  console.log(req.body);

  const query = `
        INSERT INTO posts(user_id, title, body, type)
        VALUES($1, $2, $3, $4)
        RETURNING *`;

  db.query(query, [user_id, title, body, type]).then((data) => {
    res.locals.newPost = data.rows[0];
    return next();
  });
};

module.exports = postsController;
