import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import Button from "~/components/Button";
import * as request from "~/utils/request";

const cx = classNames.bind(styles);

function Login() {
    const [account, setAccount] = useState();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const incorrectUsername = useRef();
    const incorrectPassword = useRef();
    const inputUsername = useRef();
    const inputPassword = useRef();

    useEffect(() => {
        const fetchAPI = async (taikhoan) => {
            const res = await request.get('/user', { params: { taikhoan } });
            setAccount(res[0]);
        };
        fetchAPI(username);
    }, [username]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && password) {
            if (account) {
                if (password === account.matkhau) {
                    incorrectPassword.current.hidden = true;

                    localStorage.setItem('account', JSON.stringify({ "ma": account.taikhoan, "hoten": account.hoten, "quyen": account.quyen }));
                    let path = '/';
                    if (account.quyen === "giangvien") path += 'teacher/';
                    else if (account.quyen === "quantrivien") path += 'admin/';
                    window.location.href = path;
                } else {
                    incorrectPassword.current.hidden = false;
                    incorrectPassword.current.previousElementSibling.querySelector("input").focus();
                }
            } else {
                incorrectUsername.current.hidden = false;
                incorrectUsername.current.previousElementSibling.querySelector("input").focus();
            }
        }
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
                            placeholder="Mã Số Sinh Viên"
                            className="bg-transparent text-2xl pl-14 pr-2 py-4 w-full z-10 relative"
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
                        />
                    </div>
                    <span hidden ref={incorrectPassword} className="text-red-500 font-medium">*Mật khẩu không đúng</span>
                    <div className="mt-3 text-end underline hover:text-red-400">
                        <Link to="#" className="hover:text-current">Quên mật khẩu?</Link>
                    </div>
                    <Button subPrimary className="w-full py-5 rounded-[20px] mt-11">ĐĂNG NHẬP</Button>
                    <div className="text-center mt-16">
                        <p>Hoặc đăng nhập với</p>
                        <div className="flex items-center justify-center gap-4 mt-6">
                            <a href="#" className="rounded-full overflow-hidden">
                                <svg fill="#334a7b" width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2.03998C6.5 2.03998 2 6.52998 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.84998C10.44 7.33998 11.93 5.95998 14.22 5.95998C15.31 5.95998 16.45 6.14998 16.45 6.14998V8.61998H15.19C13.95 8.61998 13.56 9.38998 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.52998 17.5 2.03998 12 2.03998Z" />
                                </svg>
                            </a>
                            <a href="#" className="inline-flex items-center justify-center bg-[#f53e2d] rounded-full w-[53px] h-[53px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="54px" height="54px" viewBox="0 0 24 24" fill="none">
                                    <path d="M19.76 10.77L19.67 10.42H12.23V13.58H16.68C16.4317 14.5443 15.8672 15.3974 15.0767 16.0029C14.2863 16.6084 13.3156 16.9313 12.32 16.92C11.0208 16.9093 9.77254 16.4135 8.81999 15.53C8.35174 15.0685 7.97912 14.5191 7.72344 13.9134C7.46777 13.3077 7.33407 12.6575 7.33 12C7.34511 10.6795 7.86792 9.41544 8.79 8.47002C9.7291 7.58038 10.9764 7.08932 12.27 7.10002C13.3779 7.10855 14.4446 7.52101 15.27 8.26002L17.47 6.00002C16.02 4.70638 14.1432 3.9941 12.2 4.00002C11.131 3.99367 10.0713 4.19793 9.08127 4.60115C8.09125 5.00436 7.19034 5.59863 6.43 6.35002C4.98369 7.8523 4.16827 9.85182 4.15152 11.9371C4.13478 14.0224 4.918 16.0347 6.34 17.56C7.12784 18.3449 8.06422 18.965 9.09441 19.3839C10.1246 19.8029 11.2279 20.0123 12.34 20C13.3484 20.0075 14.3479 19.8102 15.2779 19.42C16.2078 19.0298 17.0488 18.4549 17.75 17.73C19.1259 16.2171 19.8702 14.2347 19.83 12.19C19.8408 11.7156 19.8174 11.2411 19.76 10.77Z" fill="#ffffff" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;