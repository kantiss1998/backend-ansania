const errHandler = (err, req, res, next) => {
    if (err.error) {
      res.status(err.status).json({ error: err.error });
      res.status(err.status).json({ error: err.message });
    } else {
      console.log(err);
      res.status(500).json({ error: err });
    }
  };
  
  module.exports = errHandler;