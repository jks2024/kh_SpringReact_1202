import axios from "axios";
const HEADER = 'application/json';

const AxiosApi = {
    // 로그인
    userLogin: async function(id, pw) {
        const loginObj = {
            user: id,
            pwd: pw
        }
        return await axios.post("/api/login", loginObj, HEADER);
    },
    // 회원 조회
    memberGet: async function(id) {
        return await axios.get(`/api/member??id=${id}`, HEADER);
    },
    memberAll: async function(id) {
        return await axios.get(`/api/member-list`, HEADER);
    },
}
export default AxiosApi;
