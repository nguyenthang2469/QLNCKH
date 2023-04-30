import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia, faEllipsis, faPowerOff, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { faBell, faCircleQuestion } from '@fortawesome/free-regular-svg-icons';

import styles from './Header.module.scss';
import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(styles);
let path = "";
const currentUser = JSON.parse(localStorage.getItem('account'));
if (currentUser?.quyen === "giangvien") path = "/teacher";
else if (currentUser?.quyen === "quantrivien") path = "/admin";

const MENU_PROFILE = [
    {
        icon: <FontAwesomeIcon icon={faUserPen} />,
        title: 'Thông tin Tài khoản',
        to: path + '/profile'
    },
    {
        icon: <FontAwesomeIcon icon={faPowerOff} />,
        title: 'Đăng xuất',
        handleLogout: () => {
            localStorage.removeItem('account');
            window.location.href = '/';
        }
    }
];

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English'
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt'
                }
            ]
        }
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback'
    }
];

function Header() {
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
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/"><FontAwesomeIcon className="text-4xl cursor-pointer" title="Thông báo" icon={faBell} /></Link>
                    <span className="text-gray-500 font-medium">{currentUser.hoten}</span>
                    <Menu
                        items={MENU_PROFILE}
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
                        items={MENU_ITEMS}
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
