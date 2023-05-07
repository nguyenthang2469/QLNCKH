import { useEffect, useContext, useState } from "react";
import classNames from "classnames/bind";
import * as request from "~/utils/request";
import { UserContext } from "~/components/Layout/StudentLayout";
import styles from "./Profile.module.scss";

const cx = classNames.bind(styles);

function Profile() {
    const currentUser = useContext(UserContext);
    const [ngaysinh, setNgaysinh] = useState('');
    const [gioitinh, setGioitinh] = useState('');
    const [lop, setLop] = useState('');
    const [khoa, setKhoa] = useState('');
    const [diachi, setDiachi] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAPI = async (masv) => {
            setIsLoading(true);
            const res = await request.get("/sinhvien", { params: { masv } });
            if(res.length) {
                setNgaysinh(res[0].ngaysinh);
                setGioitinh(res[0].gioitinh);
                setLop(res[0].lop);
                setKhoa(res[0].khoa);
                setDiachi(res[0].diachi);
            }
            setIsLoading(false);
        };
        fetchAPI(currentUser.ma);
    }, []);

    const handleClose = (e) => {
        window.location.href = '/';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!ngaysinh) alert("Ngày sinh không hợp lệ");
        else if (!lop) alert("Lớp không được để trống");
        else if (!khoa) alert("Khoa không được để trống");
        else if (!diachi) alert("Địa chỉ không được để trống");
        else {
            const fetchAPI = async () => {
                const res = await request.put(`/sinhvien/${currentUser.ma}`, {
                    ngaysinh, gioitinh, lop, khoa, diachi
                });
                if (res) {
                    alert("Cập nhật thành công");
                    window.location.href = '/';
                }
            };
            fetchAPI();
        }
    };

    return (
        <div className={cx('wrapper', 'px-32 py-16 -m-[24px] rounded-[15px]')}>
            {
                !isLoading &&
                <div className="flex bg-white rounded-[15px]">
                    <div className="flex flex-col gap-2 items-center basis-[300px] mt-60">
                        <img className="w-64 h-64 rounded-[9999px]" src="./images/avatar.jpg" alt="avatar" />
                        <h4 className="font-semibold text-[2.2rem]">Sinh viên</h4>
                        <h3 className="text-[2rem]">{currentUser.hoten}</h3>
                    </div>
                    <div className="flex flex-col gap-4 grow p-12 border-l-solid border-l-2 border-l-gray-300">
                        <div>
                            <label className="block text-[1.8rem] mb-1">Mã sinh viên</label>
                            <input
                                value={currentUser.ma}
                                disabled
                                className="resize-none w-full p-4 text-[1.8rem] disabled:bg-gray-200 border-solid border-2 border-gray-400 focus:border-gray-600 rounded-md"
                                type="text"
                                placeholder="Mã sinh viên"
                            />
                        </div>
                        <div>
                            <label className="block text-[1.8rem] mb-1">Tên sinh viên</label>
                            <input
                                value={currentUser.hoten}
                                disabled
                                className="w-full p-4 text-[1.8rem] disabled:bg-gray-200 border-solid border-2 border-gray-400 focus:border-gray-600 rounded-md"
                                type="text"
                                placeholder="Tên sinh viên"
                            />
                        </div>
                        <div>
                            <label className="block text-[1.8rem] mb-1">Ngày sinh</label>
                            <input
                                value={ngaysinh}
                                onChange={e => setNgaysinh(e.target.value)}
                                className="w-full p-4 text-[1.8rem] border-solid border-2 border-gray-400 focus:border-gray-600 rounded-md"
                                type="date"
                                placeholder="Ngày sinh"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[1.8rem] mb-1">Giới tính</label>
                            <select
                                value={gioitinh}
                                onChange={e => setGioitinh(Number(e.target.value))}
                                className="w-full p-4 text-[1.8rem] border-solid border-2 border-gray-400 focus:border-gray-600 rounded-md"
                            >
                                <option value="0">Nam</option>
                                <option value="1">Nữ</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[1.8rem] mb-1">Lớp</label>
                            <input
                                value={lop}
                                onChange={e => setLop(e.target.value)}
                                className="w-full p-4 text-[1.8rem] border-solid border-2 border-gray-400 focus:border-gray-600 rounded-md"
                                type="text"
                                placeholder="Lớp"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[1.8rem] mb-1">Khoa</label>
                            <input
                                value={khoa}
                                onChange={e => setKhoa(e.target.value)}
                                className="w-full p-4 text-[1.8rem] border-solid border-2 border-gray-400 focus:border-gray-600 rounded-md"
                                type="text"
                                placeholder="Khoa"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[1.8rem] mb-1">Địa chỉ</label>
                            <input
                                value={diachi}
                                onChange={e => setDiachi(e.target.value)}
                                className="w-full p-4 text-[1.8rem] border-solid border-2 border-gray-400 focus:border-gray-600 rounded-md"
                                type="text"
                                placeholder="Địa chỉ"
                                required
                            />
                        </div>
                        <div className="flex justify-end mt-8 gap-4">
                            <button onClick={handleSubmit} className="flex items-center justify-center w-[150px] text-white text-[1.8rem] py-3 rounded-[4px] bg-red-500 hover:bg-red-400">
                                Cập nhật
                            </button>
                            <button onClick={handleClose} className="flex items-center justify-center w-[150px] text-[1.8rem] py-3 rounded-[4px] bg-gray-300 hover:bg-gray-200">
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Profile;