import cookie from 'js-cookie';


export const getCookie = key => {
    if (window !== 'undefined') {
        return cookie.get(key);
    }
};

export const isAuth = () => { //??
    if (window !== 'undefined') {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user')); //parse: string 객체를 json 객체로 변환.
            } else {
                return false;
            }
        }
    }
}

//로그인
export const authenticate = () => {

}
