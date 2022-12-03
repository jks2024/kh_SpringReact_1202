import axios from "axios";

const AxiosApi = {
    // 로그인
    memberLogin: async function(id, pw) {
        const loginObj = {
            user: id,
            pwd: pw
        }
        return await axios.post("/login", loginObj);
    },
    // 회원 가입
    memberReg: async function(name, email, pwd, addr) {
        const memberObj = {
            name: name,
            email: email,
            password: pwd,
            address: addr
        }
        return await axios.post("/new", memberObj);
    },
    // 회원 조회
    memberGet: async function(id) {
        return await axios.get(`/api/member??id=${id}`);
    },
    memberAll: async function() {
        return await axios.get('/member/list');
    },
}
export default AxiosApi;
