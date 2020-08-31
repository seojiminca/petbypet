import cookie from 'js-cookie';


export const getCookie = key => {
    if (window !== 'undefined') {
        return cookie.get(key);
    }
};

export const isAuth = () => {
    if (window !== 'undefined') {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
}

