export default [
  {
    path: "/about",
    import: "./routes/about",
  },
  {
    path: "/blog",
    import: "./routes/blog",
  },
  {
    path: "/",
    import: "./routes/index",
  },
  {
    path: "/user/:id",
    import: "./routes/user/$id",
  },
  {
    path: "/user/me",
    import: "./routes/user/me",
  },
  {
    path: "/user/something",
    import: "./routes/user/something",
  },
];
