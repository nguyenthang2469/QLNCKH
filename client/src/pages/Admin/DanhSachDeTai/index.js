import { useEffect, useRef, useState } from "react";
import { faCircleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "~/components/Modal";
import * as request from "~/utils/request";

function DanhSachDeTai() {
    const [dsdetai, setDsdetai] = useState([]);
    const [dsdetaihienthi, setDsdetaihienthi] = useState([]);
    const [detai, setDetai] = useState(null);
    const [dsthanhvien, setDsthanhvien] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [attrSearch, setAttrSearch] = useState("tendt");
    const [valueSearch, setValueSearch] = useState("");

    const modalDetailRef = useRef();

    const handleClose = (e) => {
        e.target.closest(".modal").hidden = true;
    };

    const handleDetail = (dt) => {
        setDetai(dt);
        const fetchAPI = async () => {
            const res = await request.get('/nhom', { params: { manhom: dt.manhom , vaitro: "Thành viên" } });
            setDsthanhvien(res);
        }
        fetchAPI();
        modalDetailRef.current.hidden = false;
    }

    const handleSearch = (e) => {
        setValueSearch(e.target.value);
        if(e.target.value) {
            setDsdetaihienthi(dsdetai.filter(dt => dt[attrSearch].toLowerCase().includes(e.target.value.toLowerCase())))
        } else setDsdetaihienthi(dsdetai);
    }

    useEffect(() => {
        const fetchAPI = async () => {
            setIsLoading(true);
            const res = await request.get("/detai", { params: { trangthai: "Đã duyệt" } });
            if(res.length) {
                setDsdetai(res);
                setDsdetaihienthi(res);
            }
            setIsLoading(false);
        };
        fetchAPI();
    }, []);

    return (
        <div>
            {isLoading ? <div>Trang web đang được tải</div> :
                !dsdetai.length ? (
                    <h2 className="text-center mt-12 text-[2.4rem] font-bold">Hiện không có nhóm nghiên cứu nào đã duyệt</h2>
                ) : (
                    <>
                        <h2 className="text-center text-4xl font-bold pb-16 border-b-2 border-gray-200">Danh sách đề tài đã duyệt</h2>
                        <div className="mt-4">
                            <span>Tìm kiếm</span>
                            <select
                                value={attrSearch}
                                onChange={e => setAttrSearch(e.target.value)}
                                className="mx-4 px-3 py-2 text-[1.8rem] border-solid border-2 border-gray-400 focus:border-gray-600 rounded-md"
                            >
                                <option value="tendt">Tên đề tài</option>
                                <option value="tenchunhiem">Chủ nhiệm đề tài</option>
                                <option value="tengvhd">Giảng viên hướng dẫn</option>
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
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Tên đề tài</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Chủ nhiệm đề tài</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Giảng viên hướng dẫn</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Đề cương</th>
                                        <th className="w-[130px] p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Chức năng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dsdetaihienthi.map((dt, index) => (
                                            <tr key={index}>
                                                <td className="p-3 border-2 max-w-[280px] border-gray-300">{dt.tendt}</td>
                                                <td className="p-3 border-2 max-w-[210px] border-gray-300">{dt.tenchunhiem}</td>
                                                <td className="p-3 border-2 max-w-[210px] border-gray-300">{dt.tengvhd}</td>
                                                <td className="p-3 border-2 max-w-[265px] border-gray-300">{dt.decuong ? dt.decuong : "Chưa nộp đề cương"}</td>
                                                <td className="p-3 border-2 border-gray-300">
                                                    <div className="flex gap-4 justify-center">
                                                        <button onClick={() => handleDetail(dt)} className="px-6 py-2 cursor-pointer hover:bg-blue-300 bg-blue-200 rounded-3xl">
                                                            <FontAwesomeIcon className="mr-2" icon={faCircleExclamation} /> Chi tiết
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <Modal hidden ref={modalDetailRef} onClick={handleClose} className="modal">
                        {
                            detai && (
                                <>
                                    <div className="flex items-center justify-center sticky bg-white top-0 left-0 right-0 h-[65px] shadow-md">
                                        <h3 className="text-center text-4xl font-semibold">Chi tiết đề tài</h3>
                                        <FontAwesomeIcon onClick={handleClose} className="absolute top-1/2 right-5 -translate-y-1/2 p-2 text-4xl cursor-pointer hover:opacity-70" icon={faXmark} />
                                    </div>
                                    <div className="p-12">
                                        <div className="flex gap-12 mt-6">
                                            <div className="w-[300px]">
                                                <label className="block text-[1.8rem] mb-1">Tên đề tài</label>
                                                <textarea
                                                    value={detai.tendt}
                                                    disabled
                                                    className="resize-none w-full px-3 py-2 text-[1.8rem] bg-gray-100 border-solid border-2 border-gray-400 focus:border-gray-700 rounded-md"
                                                    type="text"
                                                    placeholder="Tên đề tài"
                                                ></textarea>
                                            </div>
                                            <div className="w-[300px]">
                                                <label className="block text-[1.8rem] mb-1">Tên giảng viên hướng dẫn</label>
                                                <input
                                                    value={detai.tengvhd}
                                                    disabled
                                                    className="w-full px-3 py-2 text-[1.8rem] bg-gray-100 border-solid border-2 border-gray-400 focus:border-gray-700 rounded-md"
                                                    type="text"
                                                    placeholder="Tên giảng viên hướng dẫn"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-12 mt-6">
                                            <div className="w-[300px]">
                                                <label className="block text-[1.8rem] mb-1">Mã chủ nhiệm</label>
                                                <input
                                                    value={detai.machunhiem}
                                                    disabled
                                                    className="w-full px-3 py-2 text-[1.8rem] bg-gray-100 border-solid border-2 border-gray-400 focus:border-gray-700 rounded-md"
                                                    type="text"
                                                    placeholder="Mã chủ nhiệm"
                                                />
                                            </div>
                                            <div className="w-[300px]">
                                                <label className="block text-[1.8rem] mb-1">Tên chủ nhiệm</label>
                                                <input
                                                    value={detai.tenchunhiem}
                                                    disabled
                                                    className="w-full px-3 py-2 text-[1.8rem] bg-gray-100 border-solid border-2 border-gray-400 focus:border-gray-700 rounded-md"
                                                    type="text"
                                                    placeholder="Tên chủ nhiệm"
                                                />
                                            </div>
                                        </div>
                                        {
                                            dsthanhvien.map((thanhvien, index) => (
                                                <div key={index} className="flex gap-12 mt-6">
                                                    <div className="w-[300px]">
                                                        <label className="block text-[1.8rem] mb-1">Mã thành viên</label>
                                                        <input
                                                            value={thanhvien.masv}
                                                            disabled
                                                            className="w-full px-3 py-2 text-[1.8rem] bg-gray-100 border-solid border-2 border-gray-400 focus:border-gray-700 rounded-md"
                                                            type="text"
                                                            placeholder="Mã thành viên"
                                                        />
                                                    </div>
                                                    <div className="w-[300px]">
                                                        <label className="block text-[1.8rem] mb-1">Tên thành viên</label>
                                                        <input
                                                            value={thanhvien.tensv}
                                                            disabled
                                                            className="w-full px-3 py-2 text-[1.8rem] bg-gray-100 border-solid border-2 border-gray-400 focus:border-gray-700 rounded-md"
                                                            type="text"
                                                            placeholder="Tên thành viên"
                                                        />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <div className="flex gap-12 mt-6">
                                            <div className="w-[300px]">
                                                <label className="block text-[1.8rem] mb-1">Đề cương</label>
                                                <textarea
                                                    value={detai.decuong ? detai.decuong : "Chưa nộp đề cương"}
                                                    disabled
                                                    className="resize-none w-full overflow-auto px-3 py-2 text-[1.8rem] bg-gray-100 border-solid border-2 border-gray-400 focus:border-gray-700 rounded-md"
                                                    type="text"
                                                    placeholder="Đề cương"
                                                    rows="3"
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        </Modal>
                    </>
                )
            }
        </div>
    );
}

export default DanhSachDeTai;