import app from './app';
import dbInit from './db/init';

const port = 8000;

dbInit()

app.listen(port, () => {
  console.log(`App Started on ${port}`);
});