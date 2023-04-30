import { forwardRef } from "react";
import styles from "./Modal.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Modal({ children, hidden, className, onClick = () => { } }, ref) {
    return (
        <div hidden ref={ref} className={cx('wrapper', { [className]: className })}>
            <div onClick={onClick} className={cx('modal-layout')}></div>
            <div className={cx('inner')}>
                {children}
            </div>
        </div>
    );
}

export default forwardRef(Modal);