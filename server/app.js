import express from 'express';

const app = express();


app.listen(port, () => {
  console.info(`Server running at port ${port}`);
})

const port = process.env.PORT || 3009;

export default app;
