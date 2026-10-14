import "dotenv/config";
import app from './src/app.js';
import { validateEnv } from './config/validateEnv.js';


validateEnv();

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})