import axios from 'axios';

export default axios.create({
    baseURL: 'https://react-quiz-b7c90-default-rtdb.firebaseio.com/'
})