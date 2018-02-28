import express from 'express';

const app = express();

const port = process.env.PORT || 3009;

app.listen(port, () => {
  console.info(`Server running at port ${port}`);
});

export default app;
