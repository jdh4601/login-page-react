import axios from 'axios';

// 인스턴스 생성: axios basic setting
export default axios.create({
  baseURL: 'http://localhost:3000',
});
