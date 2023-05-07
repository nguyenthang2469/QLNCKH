import { useEffect, useRef, useState } from "react";
import { faCheck, faCircleExclamation, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "~/components/Modal";
import * as request from "~/utils/request";

function PhanCongDetai() {
    const [dsdetai, setDsdetai] = useState(null);
    const [detai, setDetai] = useState(null);
    const [dsthanhvien, setDsthanhvien] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const modalDetailRef = useRef();
    const modalApproveRef = useRef();

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

    const handleConfirm = () => {
        const fetchAPI = async () => {
            setIsLoading(true);
            const res = await request.put(`/detai/${detai.madt}`, { trangthai: "Đã duyệt" });
            if(res) {
                setDsdetai(prev => {
                    return prev.filter(dt => dt.madt !== detai.madt)
                })
                alert("Đề tài đã được duyệt");
            }
            setIsLoading(false);
        };
        fetchAPI();
        modalApproveRef.current.hidden = true;
    }
    
    const handleRefuse = () => {
        const fetchAPI = async () => {
            setIsLoading(true);
            await request.deleteAPI(`/nhom/${detai.manhom}`);
            setDsdetai(prev => {
                return prev.filter(dt => dt.madt !== detai.madt)
            })
            setIsLoading(false);
        };
        fetchAPI();
        modalApproveRef.current.hidden = true;
    }

    useEffect(() => {
        const fetchAPI = async () => {
            setIsLoading(true);
            const resdt = await request.get("/detai", { params: { trangthai: "Đang chờ duyệt" } });
            setDsdetai(resdt);
            setIsLoading(false);
        };
        fetchAPI();
    }, []);
    return (
        <div>
            {isLoading ? <div>Trang web đang được tải</div> :
                !dsdetai || dsdetai.length === 0 ? (
                    <h2 className="text-center mt-12 text-[2.4rem] font-bold">Hiện không có nhóm nghiên cứu nào chờ duyệt</h2>
                ) : (
                    <>
                        <h2 className="text-center text-4xl font-bold pb-16 border-b-2 border-gray-200">Danh sách đề tài đang chờ duyệt</h2>
                        <div className="px-4 select-none">
                            <table className="w-full mt-12">
                                <thead>
                                    <tr>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Tên đề tài</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Mã chủ nhiệm</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Tên chủ nhiệm</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Mã gvhd</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Tên gvhd</th>
                                        <th className="w-[260px] p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Chức năng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dsdetai.map((dt, index) => (
                                            <tr key={index}>
                                                <td className="p-3 border-2 max-w-[280px] border-gray-300">{dt.tendt}</td>
                                                <td className="p-3 border-2 max-w-[210px] border-gray-300">{dt.machunhiem}</td>
                                                <td className="p-3 border-2 max-w-[210px] border-gray-300">{dt.tenchunhiem}</td>
                                                <td className="p-3 border-2 max-w-[210px] border-gray-300">{dt.magvhd}</td>
                                                <td className="p-3 border-2 max-w-[210px] border-gray-300">{dt.tengvhd}</td>
                                                <td className="p-3 border-2 border-gray-300">
                                                    <div className="flex gap-4">
                                                        <button onClick={() => handleDetail(dt)} className="px-6 py-2 cursor-pointer hover:bg-blue-300 bg-blue-200 rounded-3xl">
                                                            <FontAwesomeIcon className="mr-2" icon={faCircleExclamation} /> Chi tiết
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setDetai(dt);
                                                                modalApproveRef.current.hidden = false;
                                                            }}
                                                            className="px-6 py-2 cursor-pointer text-white hover:bg-rose-600 bg-rose-500 rounded-3xl"
                                                        >
                                                            <FontAwesomeIcon className="mr-2" icon={faPen} /> Phê duyệt
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
                            detai ? (
                                <>
                                    <div className="flex items-center justify-center sticky bg-white top-0 left-0 right-0 h-[65px] shadow-md">
                                        <h3 className="text-center text-4xl font-semibold">Chi tiết đề tài</h3>
                                        <FontAwesomeIcon onClick={handleClose} className="absolute top-1/2 right-5 -translate-y-1/2 p-2 text-4xl cursor-pointer hover:opacity-70" icon={faXmark} />
                                    </div>
                                    <div className="p-12 mb-6">
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
                                    </div>
                                </>
                            ) : <></>
                        }
                        </Modal>
                        <Modal hidden ref={modalApproveRef} onClick={handleClose} className="modal">
                            <div className="flex items-center justify-center sticky bg-white top-0 left-0 right-0 h-[65px] shadow-md">
                                <h3 className="text-center text-4xl font-semibold">Phê duyệt</h3>
                                <FontAwesomeIcon onClick={handleClose} className="absolute top-1/2 right-5 -translate-y-1/2 p-2 text-4xl cursor-pointer hover:opacity-70" icon={faXmark} />
                            </div>
                            <div className="flex gap-12 p-12">
                                <button onClick={handleConfirm} className="flex items-center justify-center w-[150px] text-[1.8rem] px-[12px] py-[10px] rounded-[4px] bg-green-200 hover:bg-green-100">
                                    <FontAwesomeIcon className="mr-4 text-green-500" icon={faCheck} />
                                    <span className="text-green-900">Xác nhận</span>
                                </button>
                                <button onClick={handleRefuse} className="flex items-center justify-center w-[150px] text-white text-[1.8rem] px-[12px] py-[10px] rounded-[4px] bg-red-200 hover:bg-red-100">
                                    <FontAwesomeIcon className="mr-4 text-red-500" icon={faXmark} />
                                    <span className="text-red-900">Từ chối</span>
                                </button>
                            </div>
                        </Modal>
                    </>
                )
            }
        </div>
    );
}

export default PhanCongDetai;