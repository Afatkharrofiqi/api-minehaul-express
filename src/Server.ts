import app from './App';
import AppConfig from './config/AppConfig';

app.listen(AppConfig.port, () => {
  console.log(`Server is running on port ${AppConfig.port}`);
});
