import { createContext } from 'react';
import classNames from 'classnames/bind';
import Header from '../components/Header';
import styles from './StudentLayout.module.scss';
import Sidebar from './Sidebar';

const cx = classNames.bind(styles);
export const UserContext = createContext();
const currentUser = JSON.parse(localStorage.getItem("account")) || "";

function StudentLayout({ children, title }) {
    document.title = title ?? 'Quản lý nghiên cứu khoa học';
    return (
        <UserContext.Provider value={currentUser}>
            <div className={cx('wrapper')}>
                <Header />
                <div className={cx('container')}>
                    <Sidebar />
                    <div className={cx('content')}>
                        <div className={cx('inner')}>{children}</div>
                    </div>
                </div>
            </div>
        </UserContext.Provider>
    );
}

export default StudentLayout;
