import { useEffect, useRef, useState, useContext } from "react";
import { faCircleExclamation, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "~/components/Modal";
import * as request from "~/utils/request";
import { UserContext } from "~/components/Layout/TeacherLayout";

function ChamDeTai() {
    const currentUser = useContext(UserContext);

    const [dsdetai, setDsdetai] = useState([]);
    const [detai, setDetai] = useState(null);
    const [diem, setDiem] = useState("");
    const [danhgia, setDanhgia] = useState("");
    const [dsthanhvien, setDsthanhvien] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const modalMarkRef = useRef();
    const modalDetailRef = useRef();

    useEffect(() => {
        const fetchAPI = async (magvcham) => {
            setIsLoading(true);
            const res = await request.get("/ketqua", { params: { magvcham, diem: "null" } });
            if (res.length > 0) {
                const madt = res.reduce((total, kq) => {
                    total.push(kq.madt);
                    return total;
                }, []);
                const resdt = await request.get('/detai', { params: { madt } });
                setDsdetai(resdt);
            }
            setIsLoading(false);
        };
        fetchAPI(currentUser.ma);
    }, [currentUser]);

    const handleClose = (e) => {
        e.target.closest(".modal").hidden = true;
    };

    const handleDetail = (dt) => {
        setDetai(dt);
        const fetchAPI = async () => {
            const res = await request.get('/nhom', { params: { manhom: dt.manhom, vaitro: "Thành viên" } });
            setDsthanhvien(res);
        };
        fetchAPI();
        modalDetailRef.current.hidden = false;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fetchAPI = async () => {
            setIsLoading(true);
            const res = await request.put(`/ketqua/${detai.madt}`, { diem, danhgia });
            if (res) {
                alert("Chấm điểm thành công!");
                setDsdetai(prev => {
                    return prev.filter(dt => dt.madt !== detai.madt)
                })
            }
            setIsLoading(false);
        };
        fetchAPI();
    };

    return (
        <div>
            {isLoading ? <div>Trang web đang được tải</div> :
                dsdetai.length === 0 ? (
                    <h2 className="text-center mt-12 text-[2.4rem] font-bold">Bạn không được phân công chấm điểm</h2>
                ) : (
                    <>
                        <h2 className="text-center text-4xl font-bold pb-16 border-b-2 border-gray-200">Chấm đề tài</h2>
                        <div className="px-4 select-none">
                            <table className="w-full mt-12">
                                <thead>
                                    <tr>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Tên đề tài</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Chủ nhiệm đề tài</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Giảng viên hướng dẫn</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Đề cương</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Chức năng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dsdetai.map((dt, index) => (
                                            <tr key={index}>
                                                <td className="p-3 border-2 max-w-[280px] border-gray-300">{dt.tendt}</td>
                                                <td className="p-3 border-2 max-w-[210px] border-gray-300">{dt.tenchunhiem}</td>
                                                <td className="p-3 border-2 max-w-[210px] border-gray-300">{dt.tengvhd}</td>
                                                <td className="p-3 border-2 max-w-[265px] border-gray-300">{dt.decuong}</td>
                                                <td className="p-3 border-2 border-gray-300">
                                                    <div className="flex gap-4 items-center justify-center">
                                                        <button
                                                            onClick={() => handleDetail(dt)}
                                                            className="flex items-center px-6 py-2 cursor-pointer hover:bg-blue-100 bg-blue-200 rounded-3xl"
                                                        >
                                                            <FontAwesomeIcon className="mr-2" icon={faCircleExclamation} />
                                                            <span className="shrink-0">Chi tiết</span>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setDetai(dt);
                                                                setDiem("");
                                                                setDanhgia("");
                                                                modalMarkRef.current.hidden = false;
                                                            }}
                                                            className="flex items-center px-6 py-2 cursor-pointer text-white hover:bg-rose-400 bg-rose-500 rounded-3xl"
                                                        >
                                                            <FontAwesomeIcon className="mr-2" icon={faPen} />
                                                            <span className="shrink-0">Đánh giá</span>
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
                                                        className="resize-none w-full px-3 py-2 text-[1.8rem] bg-gray-100 border-solid border-2 border-gray-400 rounded-md"
                                                        type="text"
                                                        placeholder="Tên đề tài"
                                                    ></textarea>
                                                </div>
                                                <div className="w-[300px]">
                                                    <label className="block text-[1.8rem] mb-1">Tên giảng viên hướng dẫn</label>
                                                    <input
                                                        value={detai.tengvhd}
                                                        disabled
                                                        className="w-full px-3 py-2 text-[1.8rem] bg-gray-100 border-solid border-2 border-gray-400 rounded-md"
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
                                                        className="w-full px-3 py-2 text-[1.8rem] bg-gray-100 border-solid border-2 border-gray-400 rounded-md"
                                                        type="text"
                                                        placeholder="Mã chủ nhiệm"
                                                    />
                                                </div>
                                                <div className="w-[300px]">
                                                    <label className="block text-[1.8rem] mb-1">Tên chủ nhiệm</label>
                                                    <input
                                                        value={detai.tenchunhiem}
                                                        disabled
                                                        className="w-full px-3 py-2 text-[1.8rem] bg-gray-100 border-solid border-2 border-gray-400 rounded-md"
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
                                                                className="w-full px-3 py-2 text-[1.8rem] bg-gray-100 border-solid border-2 border-gray-400 rounded-md"
                                                                type="text"
                                                                placeholder="Mã thành viên"
                                                            />
                                                        </div>
                                                        <div className="w-[300px]">
                                                            <label className="block text-[1.8rem] mb-1">Tên thành viên</label>
                                                            <input
                                                                value={thanhvien.tensv}
                                                                disabled
                                                                className="w-full px-3 py-2 text-[1.8rem] bg-gray-100 border-solid border-2 border-gray-400 rounded-md"
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
                                                        value={detai.decuong}
                                                        disabled
                                                        className="resize-none w-full overflow-auto px-3 py-2 text-[1.8rem] bg-gray-100 border-solid border-2 border-gray-400 rounded-md"
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
                        <Modal hidden ref={modalMarkRef} onClick={handleClose} className="modal">
                            {detai &&
                                <>
                                    <div className="flex items-center justify-center sticky bg-white top-0 left-0 right-0 h-[65px] shadow-md">
                                        <h3 className="text-center text-4xl font-semibold">Đánh giá đề tài</h3>
                                        <FontAwesomeIcon onClick={handleClose} className="absolute top-1/2 right-5 -translate-y-1/2 p-2 text-4xl cursor-pointer hover:opacity-70" icon={faXmark} />
                                    </div>
                                    <form onSubmit={handleSubmit} className="p-12">
                                        <div className="flex mb-10 gap-12">
                                            <div className="flex flex-col gap-5 w-[400px]">
                                                <h3 className="text-center text-[2.2rem] font-medium">Thông tin đề cương</h3>
                                                <div className="">
                                                    <label className="block text-[1.8rem]">Tên đề tài</label>
                                                    <textarea
                                                        value={detai.tendt}
                                                        disabled
                                                        className="resize-none w-full px-3 py-2 text-[1.8rem] bg-gray-100 border-solid border-2 border-gray-400 rounded-md"
                                                        type="text"
                                                        placeholder="Tên đề tài"
                                                    ></textarea>
                                                </div>
                                                <div className="">
                                                    <label className="block text-[1.8rem]">Tên chủ nhiệm</label>
                                                    <input
                                                        value={detai.tenchunhiem}
                                                        disabled
                                                        className="w-full px-3 py-2 text-[1.8rem] bg-gray-100 border-solid border-2 border-gray-400 rounded-md"
                                                        type="text"
                                                        placeholder="Tên chủ nhiệm"
                                                    />
                                                </div>
                                                <div className="">
                                                    <label className="block text-[1.8rem]">Tên chủ nhiệm</label>
                                                    <input
                                                        value={detai.tengvhd}
                                                        disabled
                                                        className="w-full px-3 py-2 text-[1.8rem] bg-gray-100 border-solid border-2 border-gray-400 rounded-md"
                                                        type="text"
                                                        placeholder="Tên chủ nhiệm"
                                                    />
                                                </div>
                                                <div className="">
                                                    <label className="block text-[1.8rem]">Đề cương</label>
                                                    <textarea
                                                        value={detai.decuong}
                                                        disabled
                                                        className="resize-none w-full overflow-auto px-3 py-2 text-[1.8rem] bg-gray-100 border-solid border-2 border-gray-400 rounded-md"
                                                        type="text"
                                                        placeholder="Đề cương"
                                                        rows="4"
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-5 w-[400px]">
                                                <h3 className="text-center text-[2.2rem] font-medium">Phiếu đánh giá</h3>
                                                <div className="">
                                                    <label className="block text-[1.8rem]">Điểm</label>
                                                    <input
                                                        value={diem}
                                                        onChange={(e) => setDiem(e.target.value)}
                                                        type="number"
                                                        className="w-full px-3 py-2 text-[1.8rem] border-solid border-2 border-gray-400 focus:border-gray-700"
                                                        min="0"
                                                        max="10.00"
                                                        step="any"
                                                        placeholder="Điểm"
                                                        required
                                                    />
                                                </div>
                                                <div className="grow flex flex-col">
                                                    <label className="block text-[1.8rem]">Đánh giá</label>
                                                    <textarea
                                                        value={danhgia}
                                                        onChange={e => setDanhgia(e.target.value)}
                                                        className="resize-none w-full grow overflow-auto px-3 py-2 text-[1.8rem] border-solid border-2 border-gray-400 rounded-md"
                                                        placeholder="Đánh giá"
                                                        required
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end border-t-2 gap-12 pt-7">
                                            <button className="flex items-center justify-center w-[150px] text-[1.8rem] px-[12px] py-[10px] rounded-[4px] bg-green-200 hover:bg-green-100">
                                                <span className="text-green-900">Xác nhận</span>
                                            </button>
                                            <button onClick={handleClose} type="reset" className="flex items-center justify-center w-[150px] text-[1.8rem] px-[12px] py-[10px] rounded-[4px] bg-gray-300 hover:bg-gray-200">
                                                <span className="text-gray-800">Thoát</span>
                                            </button>
                                        </div>
                                    </form>
                                </>
                            }
                        </Modal>
                    </>
                )
            }
        </div>
    );
}

export default ChamDeTai;