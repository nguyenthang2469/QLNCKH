import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import Button from "~/components/Button";
import * as request from "~/utils/request";

const cx = classNames.bind(styles);
const user = JSON.parse(localStorage.getItem("register"));

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const incorrectUsername = useRef();
    const incorrectPassword = useRef();
    const inputUsername = useRef();
    const inputPassword = useRef();

    useEffect(() => {
        if(user) {
            setUsername(user.taikhoan);
            setPassword(user.matkhau);
            localStorage.removeItem("register");
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const fetchAPI = async () => {
            const res = await request.get('/user', { params: { taikhoan: username } });
            if (res.length) {
                if (password === res[0].matkhau) {
                    incorrectPassword.current.hidden = true;
                    localStorage.setItem('account', JSON.stringify({ "ma": res[0].taikhoan, "hoten": res[0].hoten, "quyen": res[0].quyen }));
                    let path = '/';
                    if (res[0].quyen === "giangvien") path += 'teacher/';
                    else if (res[0].quyen === "quantrivien") path += 'admin/';
                    window.location.href = path;
                } else {
                    incorrectPassword.current.hidden = false;
                    inputPassword.current.focus();
                }
            } else {
                incorrectUsername.current.hidden = false;
                inputUsername.current.focus();
            }
        };
        fetchAPI();
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h4 className="text-5xl text-center pb-11 font-bold">Đăng Nhập</h4>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username" className="block font-semibold text-3xl mb-3 mt-7">Tên Tài khoản</label>
                    <div className="relative text-gray-400 focus-within:text-gray-600 border-b-2 border-gray-300 focus-within:border-gray-400 focus-within:rounded-lg focus-within:bg-[#eaf0ff]">
                        <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                        <input
                            ref={inputUsername}
                            value={username}
                            onChange={e => {
                                incorrectUsername.current.hidden = true;
                                setUsername(e.target.value);
                            }}
                            id="username"
                            type="text"
                            placeholder="Mã sinh viên, giảng viên"
                            className="bg-transparent text-2xl pl-14 pr-2 py-4 w-full z-10 relative"
                            required
                        />
                    </div>
                    <span hidden ref={incorrectUsername} className="text-red-500 font-medium">*Tài khoản không chính xác</span>
                    <label htmlFor="password" className="block font-semibold text-3xl mb-3 mt-7">Mật Khẩu</label>
                    <div className="relative text-gray-400 focus-within:text-gray-600 border-b-2 border-gray-300 focus-within:border-gray-400 focus-within:rounded-lg focus-within:bg-[#eaf0ff]">
                        <FontAwesomeIcon className={cx('icon')} icon={faLock} />
                        <input
                            ref={inputPassword}
                            value={password}
                            onChange={e => {
                                incorrectPassword.current.hidden = true;
                                setPassword(e.target.value);
                            }}
                            id="password"
                            type="password"
                            placeholder="Mật Khẩu"
                            minLength="6"
                            className="bg-transparent text-2xl pl-14 pr-2 py-4 w-full z-10 relative"
                            required
                        />
                    </div>
                    <span hidden ref={incorrectPassword} className="text-red-500 font-medium">*Mật khẩu không đúng</span>
                    <div className="mt-3 text-end underline hover:text-blue-700">
                        <Link to="#" className="hover:text-current">Quên mật khẩu?</Link>
                    </div>
                    <Button subPrimary className="w-full py-5 rounded-[20px] mt-11">ĐĂNG NHẬP</Button>
                </form>
                <div className="text-end mt-8">
                    <span>Bạn chưa có tài khoản? </span>
                    <Link to="/register" className="text-blue-400 hover:text-blue-700 hover:underline" >Đăng ký ngay</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;