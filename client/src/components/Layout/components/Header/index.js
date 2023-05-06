import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia, faEllipsis, faKey, faPowerOff, faUserPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faBell, faCircleQuestion } from '@fortawesome/free-regular-svg-icons';

import * as request from "~/utils/request";
import styles from './Header.module.scss';
import Menu from '~/components/Popper/Menu';
import Modal from '~/components/Modal';

const cx = classNames.bind(styles);
let path = "";
const currentUser = JSON.parse(localStorage.getItem('account'));
if (currentUser?.quyen === "giangvien") path = "/teacher";
else if (currentUser?.quyen === "quantrivien") path = "/admin";

function Header() {
    const [matkhaucu, setMatkhaucu] = useState('');
    const [matkhaucuInput, setMatkhaucuInput] = useState('');
    const [matkhaumoi, setMatkhaumoi] = useState('');
    const [matkhaumoikt, setMatkhaumoikt] = useState('');

    const MENU_PROFILE = useRef([
        {
            icon: <FontAwesomeIcon icon={faUserPen} />,
            title: 'Thông tin Tài khoản',
            to: path + '/profile'
        },
        {
            icon: <FontAwesomeIcon icon={faKey} />,
            title: 'Đổi mật khẩu',
            onClick: () => {
                modalRef.current.hidden = false;
            }
        },
        {
            icon: <FontAwesomeIcon icon={faPowerOff} />,
            title: 'Đăng xuất',
            onClick: () => {
                localStorage.removeItem('account');
                window.location.href = '/';
            }
        }
    ]);
    const MENU_ITEMS = useRef([
        {
            icon: <FontAwesomeIcon icon={faEarthAsia} />,
            title: 'Tiếng Việt',
            children: {
                title: 'Ngôn ngữ',
                data: [
                    {
                        type: 'language',
                        code: 'vi',
                        title: 'Tiếng Việt'
                    },
                    {
                        type: 'language',
                        code: 'en',
                        title: 'English'
                    }
                ]
            }
        },
        {
            icon: <FontAwesomeIcon icon={faCircleQuestion} />,
            title: 'Feedback and help',
            to: '/feedback'
        }
    ]);
    const modalRef = useRef();

    useEffect(() => {
        const fetchAPI = async (taikhoan) => {
            const res = await request.get("/user", { params: { taikhoan } });
            res.length && setMatkhaucu(res[0].matkhau);
        };
        fetchAPI(currentUser.ma);
    }, []);

    const handleClose = (e) => {
        e.target.closest(".modal").hidden = true;
        setMatkhaucuInput('');
        setMatkhaumoi('');
        setMatkhaumoikt('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (matkhaucu !== matkhaucuInput) alert("Mật khẩu cũ không đúng, vui lòng nhập lại");
        else if (matkhaucu === matkhaumoi) alert("Mật khẩu mới không được giống mật khẩu cũ");
        else if (matkhaumoi !== matkhaumoikt) alert("Mật khẩu nhập lại không trùng mật khẩu mới");
        else {
            const fetchAPI = async (taikhoan) => {
                const res = await request.put(`/user/${taikhoan}`, { matkhau: matkhaumoi });
                if (res) {
                    alert("Đổi mật khẩu thành công");
                    setMatkhaucuInput('');
                    setMatkhaumoi('');
                    setMatkhaumoikt('');
                    modalRef.current.hidden = true;
                }
            };
            fetchAPI(currentUser.ma);
        }
    };

    const handleMenuChange = (menuItem) => {
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div>
                    {
                        (currentUser?.quyen === "giangvien" || currentUser?.quyen === "quantrivien") ?
                            (<img src="../images/logo_Uneti.png" alt="Trường đại học Kinh tế - Kỹ thuật Công nghiệp" className="w-20 ml-32" />) :
                            (<img src="./images/logo_Uneti.png" alt="Trường đại học Kinh tế - Kỹ thuật Công nghiệp" className="w-20 ml-32" />)
                    }
                    <Modal hidden ref={modalRef} onClick={handleClose} className="modal">
                        <div className="flex items-center justify-center sticky bg-white top-0 left-0 right-0 h-[65px] shadow-md">
                            <h3 className="text-center text-4xl font-semibold">Đổi mật khẩu</h3>
                            <FontAwesomeIcon onClick={handleClose} className="absolute top-1/2 right-5 -translate-y-1/2 p-2 text-4xl cursor-pointer hover:opacity-70" icon={faXmark} />
                        </div>
                        <div className="p-12">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-4 w-[400px]">
                                <div>
                                    <label className="block text-[1.8rem] mb-1">Mật khẩu cũ</label>
                                    <input
                                        value={matkhaucuInput}
                                        onChange={e => setMatkhaucuInput(e.target.value)}
                                        className="w-full p-4 text-[1.8rem] border-solid border-2 border-gray-400 focus:border-gray-600 rounded-md"
                                        type="password"
                                        placeholder="Nhập mật khẩu cũ"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[1.8rem] mb-1">Mật khẩu mới</label>
                                    <input
                                        value={matkhaumoi}
                                        onChange={e => setMatkhaumoi(e.target.value)}
                                        className="w-full p-4 text-[1.8rem] border-solid border-2 border-gray-400 focus:border-gray-600 rounded-md"
                                        type="password"
                                        minLength="6"
                                        placeholder="Nhập mật khẩu mới"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[1.8rem] mb-1">Nhập lại mật khẩu mới</label>
                                    <input
                                        value={matkhaumoikt}
                                        onChange={e => setMatkhaumoikt(e.target.value)}
                                        className="w-full p-4 text-[1.8rem] border-solid border-2 border-gray-400 focus:border-gray-600 rounded-md"
                                        type="password"
                                        minLength="6"
                                        placeholder="Nhập lại mật khẩu mới"
                                        required
                                    />
                                </div>
                                <div className="flex justify-center gap-4">
                                    <input
                                        type="submit" 
                                        className="flex items-center justify-center w-[120px] text-white text-[1.8rem] py-3 rounded-[4px] bg-red-500 hover:bg-red-400"
                                        value="Cập nhật"
                                    />
                                    <input
                                        type="reset"
                                        onClick={handleClose}
                                        className="flex items-center justify-center w-[120px] text-[1.8rem] py-3 rounded-[4px] bg-gray-300 hover:bg-gray-200"
                                        value="Hủy"
                                    />
                                </div>
                            </form>
                        </div>
                    </Modal>
                </div>
                <div className="flex items-center gap-6">
                    <Link to="/"><FontAwesomeIcon className="text-4xl cursor-pointer" title="Thông báo" icon={faBell} /></Link>
                    <span className="text-gray-500 font-medium">{currentUser.hoten}</span>
                    <Menu
                        items={MENU_PROFILE.current}
                    >
                        {
                            (currentUser?.quyen === "giangvien") ?
                                (<img src="../images/avatar_giangvien.png" className="w-14 rounded-full cursor-pointer" alt="avatar"></img>) :
                                currentUser?.quyen === "quantrivien" ?
                                    (<img src="../images/avatar_admin.jpg" className="w-14 rounded-full cursor-pointer" alt="avatar"></img>) :
                                    (<img src="./images/avatar.jpg" className="w-14 rounded-full cursor-pointer" alt="avatar"></img>)
                        }
                    </Menu>
                    <Menu
                        items={MENU_ITEMS.current}
                        onChange={handleMenuChange}
                    >
                        <button className={cx('more-btn')}>
                            <FontAwesomeIcon icon={faEllipsis} />
                        </button>
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
