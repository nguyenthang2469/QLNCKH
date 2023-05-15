import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import Button from "~/components/Button";
import * as request from "~/utils/request";

const cx = classNames.bind(styles);

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const inputUsername = useRef();
    const inputPassword = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const fetchAPI = async () => {
            let res = [];
            let ten = "";
            let quyen = "";
            if (username.startsWith("sv")) {
                res = await request.get('/sinhvien', { params: { masv: username } });
                if(res.length) {
                    ten = res[0].tensv;
                    quyen = "sinhvien"
                }
            } else if (username.startsWith("gv")) {
                res = await request.get('/giangvien', { params: { magv: username } });
                if(res.length) {
                    ten = res[0].tengv;
                    quyen = "giangvien"
                }
            }
            if (res.length) {
                const resacc = await request.get('/user', { params: { taikhoan: username } });
                if(resacc.length) alert("Tài khoản đã tồn tại, vui lòng đăng nhập");
                else {
                    if (password === passwordConfirm) {
                        const res = request.post('/user', {
                            taikhoan: username,
                            matkhau: password,
                            hoten: ten,
                            quyen
                        })
                        if(res) {
                            localStorage.setItem('register', JSON.stringify({ "taikhoan": username, "matkhau": password, "hoten": ten, "quyen": quyen }));
                            alert("Đã đăng ký thành công");
                            window.location.href = "/";
                        }
                    } else {
                        alert("Mật khẩu không khớp");
                    }
                }
            } else {
                alert("Mã không hợp lệ, vui lòng nhập mã sinh viên hoặc giảng viên");
                inputUsername.current.focus();
            }
        };
        fetchAPI();
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h4 className="text-5xl text-center pb-11 font-bold">Đăng Ký</h4>
                <form onSubmit={handleSubmit}>
                    <label className="block font-semibold text-3xl mb-3 mt-7">Tên Tài khoản</label>
                    <div className="relative text-gray-400 focus-within:text-gray-600 border-b-2 border-gray-300 focus-within:border-gray-400 focus-within:rounded-lg focus-within:bg-[#eaf0ff]">
                        <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                        <input
                            ref={inputUsername}
                            value={username}
                            onChange={e => {
                                setUsername(e.target.value);
                            }}
                            type="text"
                            placeholder="Mã sinh viên, giảng viên"
                            className="bg-transparent text-2xl pl-14 pr-2 py-4 w-full z-10 relative"
                            required
                        />
                    </div>
                    <label className="block font-semibold text-3xl mb-3 mt-7">Mật Khẩu</label>
                    <div className="relative text-gray-400 focus-within:text-gray-600 border-b-2 border-gray-300 focus-within:border-gray-400 focus-within:rounded-lg focus-within:bg-[#eaf0ff]">
                        <FontAwesomeIcon className={cx('icon')} icon={faLock} />
                        <input
                            ref={inputPassword}
                            value={password}
                            onChange={e => {
                                setPassword(e.target.value);
                            }}
                            type="password"
                            placeholder="Mật Khẩu"
                            minLength="6"
                            className="bg-transparent text-2xl pl-14 pr-2 py-4 w-full z-10 relative"
                            required
                        />
                    </div>
                    <label htmlFor="password" className="block font-semibold text-3xl mb-3 mt-7">Xác nhận mật Khẩu</label>
                    <div className="relative text-gray-400 focus-within:text-gray-600 border-b-2 border-gray-300 focus-within:border-gray-400 focus-within:rounded-lg focus-within:bg-[#eaf0ff]">
                        <FontAwesomeIcon className={cx('icon')} icon={faLock} />
                        <input
                            ref={inputPassword}
                            value={passwordConfirm}
                            onChange={e => {
                                setPasswordConfirm(e.target.value);
                            }}
                            type="password"
                            placeholder="Xác nhận mật Khẩu"
                            minLength="6"
                            className="bg-transparent text-2xl pl-14 pr-2 py-4 w-full z-10 relative"
                            required
                        />
                    </div>
                    <Button subPrimary className="w-full py-5 rounded-[20px] mt-11">ĐĂNG KÝ</Button>
                </form>
                <div className="text-end mt-8">
                    <span>Bạn đã có tài khoản? </span>
                    <Link to="/" className="text-blue-400 hover:text-blue-700 hover:underline" >Đăng nhập</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;