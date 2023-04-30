import classNames from 'classnames/bind';
import Header from "../components/Header";
import styles from './AdminLayout.module.scss';
import Sidebar from "./Sidebar";

const cx = classNames.bind(styles);

function StudentLayout({ children, title }) {
    document.title = title ?? "Quản lý nghiên cứu khoa học";
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>
                    <div className={cx('inner')}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentLayout;