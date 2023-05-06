import { useEffect, useRef, useState, useContext } from "react";
import { faCircleExclamation, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "~/components/Modal";
import * as request from "~/utils/request";
import { UserContext } from "~/components/Layout/TeacherLayout";
import Button from "~/components/Button";

function TrangThaiDeTai() {
    const currentUser = useContext(UserContext);

    const [detai, setDetai] = useState(null);
    const [ketqua, setKetqua] = useState(null);
    const [decuong, setDecuong] = useState(null);
    const [dsthanhvien, setDsthanhvien] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const textareaFileRef = useRef();
    const inputFileRef = useRef();
    const modalDetailRef = useRef();
    const modalUpdateRef = useRef();
    const modalNotifyRef = useRef();

    const handleClose = (e) => {
        e.target.closest(".modal").hidden = true;
        textareaFileRef.current.value = decuong ? decuong : "Chưa nộp đề cương";
    };

    const handleUpdate = (dc) => {
        if (dc) {
            setDecuong(dc);
            const fetchAPI = async () => {
                await request.put(`/detai/${detai.madt}`, { decuong: dc }, {
                    Headers: { 'Content-Type': 'application/json; charset=utf-8' }
                });
                inputFileRef.current.value = "";
            };
            fetchAPI();
            modalUpdateRef.current.hidden = true;
            alert("Nộp đề cương thành công");
        } else {
            alert("Bạn chưa chọn đề cương");
        }
    };

    useEffect(() => {
        const fetchAPI = async (magvhd) => {
            setIsLoading(true);
            const res = await request.get("/detai", { params: { magvhd } });
            if (res[0]) {
                const resdstv = await request.get('/nhom', { params: { manhom: res[0].manhom, vaitro: "Thành viên" } });
                const reskq = await request.get('/ketqua', { params: { manhom: res[0].manhom } });
                reskq[0] && setKetqua(reskq[0]);
                setDsthanhvien(resdstv);
            }
            setDetai(res[0]);
            setDecuong(res[0]?.decuong);
            setIsLoading(false);
        };
        fetchAPI(currentUser.ma);
    }, [currentUser]);
    
    return (
        <div>
            {isLoading ? <div>Trang web đang được tải</div> :
                !detai ? (
                    <h2 className="text-center mt-12 text-[2.4rem] font-bold">Bạn chưa hướng dẫn nhóm nghiên cứu nào</h2>
                ) : (
                    <>
                        <h2 className="text-center text-4xl font-bold pb-16 border-b-2 border-gray-200">Trạng thái đề tài</h2>
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
                                    <tr>
                                        <td className="p-3 border-2 max-w-[280px] border-gray-300">{detai.tendt}</td>
                                        <td className="p-3 border-2 max-w-[210px] border-gray-300">{detai.tenchunhiem}</td>
                                        <td className="p-3 border-2 max-w-[210px] border-gray-300">{detai.tengvhd}</td>
                                        <td className="p-3 border-2 max-w-[265px] border-gray-300">{decuong ? decuong : "Chưa nộp đề cương"}</td>
                                        <td className="p-3 border-2 border-gray-300">
                                            <div className="flex gap-4 justify-center items-center">
                                                <button onClick={() => { modalDetailRef.current.hidden = false; }} className="flex px-6 py-2 cursor-pointer hover:bg-blue-300 bg-blue-200 rounded-3xl">
                                                    <FontAwesomeIcon className="mr-2" icon={faCircleExclamation} />
                                                    <span className="shrink-0">Chi tiết</span>
                                                </button>
                                                {!ketqua && (
                                                    <button
                                                        onClick={() => {
                                                            if (detai.trangthai === "Đã duyệt") modalUpdateRef.current.hidden = false;
                                                            else modalNotifyRef.current.hidden = false;
                                                        }}
                                                        className="flex px-6 py-2 cursor-pointer text-white hover:bg-rose-600 bg-rose-500 rounded-3xl"
                                                    >
                                                        <FontAwesomeIcon className="mr-2" icon={faPen} />
                                                        <span className="shrink-0">Chỉnh sửa</span>
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Modal hidden ref={modalDetailRef} onClick={handleClose} className="modal">
                            <div className="flex items-center justify-center sticky bg-white top-0 left-0 right-0 h-[65px] shadow-md">
                                <h3 className="text-center text-4xl font-semibold">Chi tiết đề tài</h3>
                                <FontAwesomeIcon onClick={handleClose} className="absolute top-1/2 right-5 -translate-y-1/2 p-2 text-4xl cursor-pointer hover:opacity-70" icon={faXmark} />
                            </div>
                            <div className="p-12">
                                <h3 className="text-[2rem] font-medium">Trạng thái: {detai.trangthai}</h3>
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
                                            value={decuong ? decuong : "Chưa nộp đề cương"}
                                            disabled
                                            className="resize-none w-full overflow-auto px-3 py-2 text-[1.8rem] bg-gray-100 border-solid border-2 border-gray-400 focus:border-gray-700 rounded-md"
                                            type="text"
                                            placeholder="Đề cương"
                                            rows="3"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                        <Modal hidden ref={modalUpdateRef} onClick={handleClose} className="modal">
                            <div className="flex items-center justify-center sticky bg-white top-0 left-0 right-0 h-[65px] shadow-md">
                                <h3 className="text-center text-4xl font-semibold">Chỉnh sửa</h3>
                                <FontAwesomeIcon onClick={handleClose} className="absolute top-1/2 right-5 -translate-y-1/2 p-2 text-4xl cursor-pointer hover:opacity-70" icon={faXmark} />
                            </div>
                            <div className="p-12">
                                <div className="">
                                    <div className="w-[500px]">
                                        <label className="block text-[1.8rem] mb-1">Đề cương</label>
                                        <textarea
                                            ref={textareaFileRef}
                                            value={decuong ? decuong : "Chưa nộp đề cương"}
                                            disabled
                                            className="resize-none w-full overflow-auto px-3 py-2 text-[1.8rem] bg-gray-100 border-solid border-2 border-gray-400 focus:border-gray-700 rounded-md"
                                            type="text"
                                            placeholder="Đề cương"
                                            rows="2"
                                        ></textarea>
                                    </div>
                                    <div>
                                        <input
                                            ref={inputFileRef}
                                            hidden
                                            id="file"
                                            type="file"
                                            accept=".doc, .docx"
                                            placeholder="Chọn đề cương"
                                            onChange={e => textareaFileRef.current.value = e.target.files[0]?.name || textareaFileRef.current.value}
                                        />
                                        <label htmlFor="file" className="inline-block mt-5 px-5 py-2 text-[1.8rem] text-white rounded-[4px] bg-[#fe2c55] hover:bg-[#ff5a7b] cursor-pointer">Chọn đề cương</label>
                                    </div>
                                    <div className="flex"><Button primary onClick={() => handleUpdate(inputFileRef.current.files[0]?.name || "")} className="ml-auto mt-8">Cập nhật</Button></div>
                                </div>
                            </div>
                        </Modal>
                        <Modal hidden ref={modalNotifyRef} onClick={handleClose} className="modal">
                            <div className="flex items-center justify-center sticky bg-white top-0 left-0 right-0 h-[65px] shadow-md">
                                <h3 className="text-center text-4xl font-semibold">Thông báo</h3>
                                <FontAwesomeIcon onClick={handleClose} className="absolute top-1/2 right-5 -translate-y-1/2 p-2 text-4xl cursor-pointer hover:opacity-70" icon={faXmark} />
                            </div>
                            <div className="p-12">
                                <h3 className="text-center m-8 text-[2rem] font-semibold">Đề tài đang chờ duyệt, vui lòng dợi</h3>
                            </div>
                        </Modal>
                    </>
                )
            }
        </div>
    );
}

export default TrangThaiDeTai;