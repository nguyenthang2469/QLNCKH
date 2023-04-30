import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faChevronDown, faClipboard, faHouse, faTableList } from '@fortawesome/free-solid-svg-icons';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {

    const handleShow = (e) => {
        e.target.closest('.parent').nextSibling.classList.toggle('hidden');
    };

    return (
        <aside className={cx('wrapper')}>
            <div className={cx('inner', 'pt-10 px-5 font-normal text-3xl')}>
                <div className="py-6 cursor-pointer hover:bg-gray-200 rounded-xl px-6">
                    <Link to="/teacher" className="flex items-center">
                        <FontAwesomeIcon className="w-12 text-[#6b6767] mr-6 inline-flex justify-center" icon={faHouse} />
                        <header className="w-full inline-block">Trang chủ</header>
                    </Link>
                </div>
                <div onClick={handleShow} className="parent flex items-center py-6 cursor-pointer hover:bg-gray-200 rounded-xl px-6">
                    <span>
                        <FontAwesomeIcon className="w-12 mr-6 inline-flex justify-center" icon={faBook} />
                    </span>
                    <header className="w-full">Đề tài</header>
                    <span>
                        <FontAwesomeIcon className="w-12" icon={faChevronDown} />
                    </span>
                </div>
                <ul className="hidden">
                    <li><Link className="block rounded-xl pl-[80px] py-4 hover:bg-gray-200 cursor-pointer" to="/teacher/trangthaidetai">Xem đề tài</Link></li>
                    <li className="mb-6"><Link className="block rounded-xl pl-[80px] py-4 hover:bg-gray-200 cursor-pointer" to="/teacher/chamdetai">Chấm điểm đề tài</Link></li>
                </ul>
                <Link to="/teacher/ketquadetai" className="parent flex items-center py-6 cursor-pointer hover:bg-gray-200 rounded-xl px-6">
                    <span>
                        <FontAwesomeIcon className="w-12 mr-6 inline-flex justify-center" icon={faClipboard} />
                    </span>
                    <header className="w-full">Xem đánh giá</header>
                </Link>
            </div>
        </aside>
    );
}

export default Sidebar;