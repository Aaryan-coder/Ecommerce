import axios from "axios"

const BASE_URL = "http://localhost:9000/api/v1"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTkwY2U0YWY3ZWM5YTk2YjQ1MDAwNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4ODgzOTcyNCwiZXhwIjoxNjg5MDk4OTI0fQ.DPzxPau_8cVRt-FXxVNcQ94Z1PAacM4QdoHM1acKv_k"
export const publicRequest = axios.create({
    baseURL: BASE_URL,
  });
  
  export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` },
  });