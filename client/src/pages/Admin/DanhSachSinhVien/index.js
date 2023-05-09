import { useEffect, useRef, useState } from "react";
import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "~/components/Modal";
import * as request from "~/utils/request";

function DanhSachSinhVien() {
    const [dssinhvien, setDssinhvien] = useState([]);
    const [dssinhvienhienthi, setDssinhvienhienthi] = useState([]);
    const [masv, setMasv] = useState('');
    const [tensv, setTensv] = useState('');
    const [ngaysinh, setNgaysinh] = useState('');
    const [gioitinh, setGioitinh] = useState('');
    const [lop, setLop] = useState('');
    const [khoa, setKhoa] = useState('');
    const [diachi, setDiachi] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [attrSearch, setAttrSearch] = useState("masv");
    const [valueSearch, setValueSearch] = useState("");

    const modalUpdateRef = useRef();

    useEffect(() => {
        const fetchAPI = async () => {
            setIsLoading(true);
            const res = await request.get("/sinhvien");
            if(res.length) {
                setDssinhvien(res);
                setDssinhvienhienthi(res);
            }
            setIsLoading(false);
        };
        fetchAPI();
    }, []);

    const handleClose = (e) => {
        e.target.closest(".modal").hidden = true;
    };

    const handleUpdate = (sv) => {
        modalUpdateRef.current.hidden = false;
        setMasv(sv.masv);
        setTensv(sv.tensv);
        setNgaysinh(sv.ngaysinh);
        setGioitinh(sv.gioitinh);
        setLop(sv.lop);
        setKhoa(sv.khoa);
        setDiachi(sv.diachi);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!ngaysinh) alert("Ngày sinh không hợp lệ");
        else if (!lop) alert("Lớp không được để trống");
        else if (!khoa) alert("Khoa không được để trống");
        else if (!diachi) alert("Địa chỉ không được để trống");
        else {
            const fetchAPI = async () => {
                setIsLoading(true);
                const res = await request.put(`/sinhvien/${masv}`, {
                    ngaysinh, gioitinh, lop, khoa, diachi
                });
                if (res) {
                    setDssinhvien((prev) => {
                        const newDssv = prev.map((sv) => {
                            if (sv.masv === masv) {
                                sv.ngaysinh = ngaysinh;
                                sv.gioitinh = gioitinh;
                                sv.lop = lop;
                                sv.khoa = khoa;
                                sv.diachi = diachi;
                            }
                            return sv;
                        });
                        return newDssv;
                    });
                    alert("Cập nhật thành công");
                }
                setIsLoading(false);
            };
            fetchAPI();
        }
    };

    const handleSearch = (e) => {
        setValueSearch(e.target.value);
        if (e.target.value) {
            setDssinhvienhienthi(dssinhvien.filter(sv => sv[attrSearch].toLowerCase().includes(e.target.value.toLowerCase())));
        } else setDssinhvienhienthi(dssinhvien);
    };

    return (
        <div>
            {isLoading ? <div>Trang web đang được tải</div> :
                !dssinhvien || dssinhvien.length === 0 ? (
                    <h2 className="text-center mt-12 text-[2.4rem] font-bold">Hiện không có sinh viên nào</h2>
                ) : (
                    <>
                        <h2 className="text-center text-4xl font-bold pb-16 border-b-2 border-gray-200">Danh sách sinh viên</h2>
                        <div className="mt-4">
                            <span>Tìm kiếm</span>
                            <select
                                value={attrSearch}
                                onChange={e => setAttrSearch(e.target.value)}
                                className="mx-4 px-3 py-2 text-[1.8rem] border-solid border-2 border-gray-400 focus:border-gray-600 rounded-md"
                            >
                                <option value="masv">Mã</option>
                                <option value="tensv">Họ tên</option>
                                <option value="lop">Lớp</option>
                                <option value="khoa">Khoa</option>
                                <option value="diachi">Địa chỉ</option>
                            </select>
                            <input
                                value={valueSearch}
                                onChange={handleSearch}
                                className="w-[400px] px-3 py-2 text-[1.8rem] leading-[2.3rem] border-solid border-2 border-gray-400 rounded-md"
                                type="search"
                                placeholder="Từ khóa tìm kiếm"
                            />
                        </div>
                        <div className="px-4 select-none">
                            <table className="w-full mt-12">
                                <thead>
                                    <tr>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Mã sinh viên</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Tên sinh viên</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Ngày sinh</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Giới tính</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Lớp</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Khoa</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Địa chỉ</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Chức năng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dssinhvienhienthi.map((sv, index) => (
                                            <tr key={index}>
                                                <td className="p-3 border-2 max-w-[280px] border-gray-300">{sv.masv}</td>
                                                <td className="p-3 border-2 max-w-[280px] border-gray-300">{sv.tensv}</td>
                                                <td className="p-3 border-2 max-w-[210px] border-gray-300">{sv.ngaysinh}</td>
                                                <td className="p-3 border-2 max-w-[280px] border-gray-300">{sv.gioitinh === 0 ? "Nam" : "Nữ"}</td>
                                                <td className="p-3 border-2 max-w-[210px] border-gray-300">{sv.lop}</td>
                                                <td className="p-3 border-2 max-w-[210px] border-gray-300">{sv.khoa}</td>
                                                <td className="p-3 border-2 max-w-[210px] border-gray-300">{sv.diachi}</td>
                                                <td className="w-[150px] p-3 border-2 border-gray-300">
                                                    <div className="flex gap-4 justify-center">
                                                        <button
                                                            onClick={() => handleUpdate(sv)}
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
                                <h3 className="text-center text-4xl font-semibold">Chỉnh sửa thông tin sinh viên</h3>
                                <FontAwesomeIcon onClick={handleClose} className="absolute top-1/2 right-5 -translate-y-1/2 p-2 text-4xl cursor-pointer hover:opacity-70" icon={faXmark} />
                            </div>
                            <div className="p-12">
                                <div className="flex gap-12 mt-6">
                                    <div className="w-[300px]">
                                        <label className="block text-[1.8rem] mb-1">Mã sinh viên</label>
                                        <input
                                            value={masv}
                                            disabled
                                            className="resize-none w-full px-3 py-2 text-[1.8rem] disabled:bg-gray-200 border-solid border-2 border-gray-400 focus:border-gray-600 rounded-md"
                                            type="text"
                                            placeholder="Mã sinh viên"
                                        />
                                    </div>
                                    <div className="w-[300px]">
                                        <label className="block text-[1.8rem] mb-1">Tên sinh viên</label>
                                        <input
                                            value={tensv}
                                            disabled
                                            className="w-full px-3 py-2 text-[1.8rem] disabled:bg-gray-200 border-solid border-2 border-gray-400 focus:border-gray-600 rounded-md"
                                            type="text"
                                            placeholder="Tên sinh viên"
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
                                            onChange={e => setGioitinh(Number(e.target.value))}
                                            className="w-full px-3 py-2 text-[1.8rem] border-solid border-2 border-gray-400 focus:border-gray-600 rounded-md"
                                        >
                                            <option value="0">Nam</option>
                                            <option value="1">Nữ</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex gap-12 mt-6">
                                    <div className="w-[300px]">
                                        <label className="block text-[1.8rem] mb-1">Lớp</label>
                                        <input
                                            value={lop}
                                            onChange={e => setLop(e.target.value)}
                                            className="w-full px-3 py-2 text-[1.8rem] border-solid border-2 border-gray-400 focus:border-gray-600 rounded-md"
                                            type="text"
                                            placeholder="Lớp"
                                            required
                                        />
                                    </div>
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
                                </div>
                                <div className="flex gap-12 mt-6">
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

export default DanhSachSinhVien;