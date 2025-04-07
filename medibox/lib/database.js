import app from './firebaseConfig';
import {getDatabase} from '@firebase/database'


const rdb = getDatabase(app);
export default rdb;