import { useEffect, useRef, useState } from "react";
import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "~/components/Modal";
import * as request from "~/utils/request";

function DanhSachGiangVien() {
    const [dsgiangvien, setDsgiangvien] = useState([]);
    const [magv, setMagv] = useState('');
    const [tengv, setTengv] = useState('');
    const [ngaysinh, setNgaysinh] = useState('');
    const [gioitinh, setGioitinh] = useState('');
    const [khoa, setKhoa] = useState('');
    const [diachi, setDiachi] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const modalUpdateRef = useRef();

    useEffect(() => {
        const fetchAPI = async () => {
            setIsLoading(true);
            const res = await request.get("/giangvien");
            res.length && setDsgiangvien(res);
            setIsLoading(false);
        };
        fetchAPI();
    }, []);

    const handleClose = (e) => {
        e.target.closest(".modal").hidden = true;
    };

    const handleUpdate = (gv) => {
        modalUpdateRef.current.hidden = false;
        setMagv(gv.magv);
        setTengv(gv.tengv);
        setNgaysinh(gv.ngaysinh);
        setGioitinh(gv.gioitinh);
        setKhoa(gv.khoa);
        setDiachi(gv.diachi);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const fetchAPI = async () => {
            setIsLoading(true);
            const res = await request.put(`/giangvien/${magv}`, {
                ngaysinh, gioitinh, khoa, diachi
            });
            if(res) {
                setDsgiangvien((prev) => {
                    // const newDsgv = [...prev, { magv, tengv, ngaysinh, gioitinh, khoa, diachi }]; 
                    // return newDsgv;
                })
                alert("Cập nhật thành công");
            }
            setIsLoading(false);
        };
        fetchAPI();
    }
    console.log(dsgiangvien);
    return (
        <div>
            {isLoading ? <div>Trang web đang được tải</div> :
                !dsgiangvien || dsgiangvien.length === 0 ? (
                    <h2 className="text-center mt-12 text-[2.4rem] font-bold">Hiện không có giảng viên nào</h2>
                ) : (
                    <>
                        <h2 className="text-center text-4xl font-bold pb-16 border-b-2 border-gray-200">Danh sách giảng viên</h2>
                        <div className="px-4 select-none">
                            <table className="w-full mt-12">
                                <thead>
                                    <tr>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Mã giảng viên</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Tên giảng viên</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Ngày sinh</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Giới tính</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Khoa</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Địa chỉ</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Chức năng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dsgiangvien.map((gv, index) => (
                                            <tr key={index}>
                                                <td className="p-3 border-2 max-w-[280px] border-gray-300">{gv.magv}</td>
                                                <td className="p-3 border-2 max-w-[280px] border-gray-300">{gv.tengv}</td>
                                                <td className="p-3 border-2 max-w-[210px] border-gray-300">{gv.ngaysinh}</td>
                                                <td className="p-3 border-2 max-w-[210px] border-gray-300">{gv.gioitinh === 0 ? "Nam" : "Nữ"}</td>
                                                <td className="p-3 border-2 max-w-[210px] border-gray-300">{gv.khoa}</td>
                                                <td className="p-3 border-2 max-w-[210px] border-gray-300">{gv.diachi}</td>
                                                <td className="w-[150px] p-3 border-2 border-gray-300">
                                                    <div className="flex gap-4 justify-center">
                                                        <button
                                                            onClick={() => handleUpdate(gv)}
                                                            className="flex shrink-0 px-6 py-2 cursor-pointer text-white hover:bg-rose-600 bg-rose-500 rounded-3xl"
                                                        >
                                                            <FontAwesomeIcon className="mr-2" icon={faPen} />
                                                            <span className="shrink-0">Chỉnh sửa</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <Modal hidden ref={modalUpdateRef} onClick={handleClose} className="modal">
                            <div className="flex items-center justify-center sticky bg-white top-0 left-0 right-0 h-[65px] shadow-md">
                                <h3 className="text-center text-4xl font-semibold">Chỉnh sửa thông tin giảng viên</h3>
                                <FontAwesomeIcon onClick={handleClose} className="absolute top-1/2 right-5 -translate-y-1/2 p-2 text-4xl cursor-pointer hover:opacity-70" icon={faXmark} />
                            </div>
                            <div className="p-12">
                                <div className="flex gap-12 mt-6">
                                    <div className="w-[300px]">
                                        <label className="block text-[1.8rem] mb-1">Mã giảng viên</label>
                                        <input
                                            value={magv}
                                            disabled
                                            className="resize-none w-full px-3 py-2 text-[1.8rem] disabled:bg-gray-200 border-solid border-2 border-gray-400 focus:border-gray-600 rounded-md"
                                            type="text"
                                            placeholder="Mã giảng viên"
                                        />
                                    </div>
                                    <div className="w-[300px]">
                                        <label className="block text-[1.8rem] mb-1">Tên giảng viên</label>
                                        <input
                                            value={tengv}
                                            disabled
                                            className="w-full px-3 py-2 text-[1.8rem] disabled:bg-gray-200 border-solid border-2 border-gray-400 focus:border-gray-600 rounded-md"
                                            type="text"
                                            placeholder="Tên giảng viên"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-12 mt-6">
                                    <div className="w-[300px]">
                                        <label className="block text-[1.8rem] mb-1">Ngày sinh</label>
                                        <input
                                            value={ngaysinh}
                                            onChange={e => setNgaysinh(e.target.value)}
                                            className="w-full px-3 py-2 text-[1.8rem] border-solid border-2 border-gray-400 focus:border-gray-600 rounded-md"
                                            type="date"
                                            placeholder="Ngày sinh"
                                            required
                                        />
                                    </div>
                                    <div className="w-[300px]">
                                        <label className="block text-[1.8rem] mb-1">Giới tính</label>
                                        <select
                                            value={gioitinh}
                                            onChange={e => setGioitinh(e.target.value)}
                                            className="w-full px-3 py-2 text-[1.8rem] border-solid border-2 border-gray-400 focus:border-gray-600 rounded-md"
                                        >
                                            <option value="0">Nam</option>
                                            <option value="1">Nữ</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex gap-12 mt-6">
                                    <div className="w-[300px]">
                                        <label className="block text-[1.8rem] mb-1">Khoa</label>
                                        <input
                                            value={khoa}
                                            onChange={e => setKhoa(e.target.value)}
                                            className="w-full px-3 py-2 text-[1.8rem] border-solid border-2 border-gray-400 focus:border-gray-600 rounded-md"
                                            type="text"
                                            placeholder="Khoa"
                                            required
                                        />
                                    </div>
                                    <div className="w-[300px]">
                                        <label className="block text-[1.8rem] mb-1">Địa chỉ</label>
                                        <input
                                            value={diachi}
                                            onChange={e => setDiachi(e.target.value)}
                                            className="w-full px-3 py-2 text-[1.8rem] border-solid border-2 border-gray-400 focus:border-gray-600 rounded-md"
                                            type="text"
                                            placeholder="Địa chỉ"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end mt-8 gap-4">
                                    <button onClick={handleSubmit} className="flex items-center justify-center w-[150px] text-white text-[1.8rem] py-3 rounded-[4px] bg-red-500 hover:bg-red-400">
                                        Xác nhận
                                    </button>
                                    <button onClick={handleClose} className="flex items-center justify-center w-[150px] text-[1.8rem] py-3 rounded-[4px] bg-gray-300 hover:bg-gray-200">
                                        Thoát
                                    </button>
                                </div>
                            </div>
                        </Modal>
                    </>
                )
            }
        </div>
    );
}

export default DanhSachGiangVien;