import { faCircleExclamation, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLayoutEffect, useRef, useState } from "react";
import Modal from "~/components/Modal";

const currentUser = JSON.parse(localStorage.getItem("account")) || "";

function TrangThaiDeTai() {
    const [dsdetai, setDsdetai] = useState([]);
    const [dsnhom, setDsnhom] = useState([]);
    const [sv, setSv] = useState();
    const [dt, setDt] = useState();

    const modalRef = useRef();

    const handleClose = (e) => {
        e.target.closest(".modal").hidden = true;
    };

    const handleDetail = () => {
        modalRef.current.hidden = false;
    };

    useLayoutEffect(() => {
        fetch("http://localhost/QLNCKH/PHP/detai.php")
            .then((response) => response.json())
            .then((res) => {
                setDsdetai(res);
            });
    }, []);

    useLayoutEffect(() => {
        fetch("http://localhost/QLNCKH/PHP/nhom.php")
            .then((response) => response.json())
            .then((res) => {
                setDsnhom(res);
            });
    }, []);

    useLayoutEffect(() => {
        setSv(dsnhom.find((sinhvien) => sinhvien.masv === currentUser.ma));
        if (sv) {
            setDt(dsdetai.find((detai) => detai.manhom === sv.manhom));
        }
    }, [dsnhom, dsdetai]);

    return (
        <div>
            {sv === undefined ? (
                <h2 className="text-center mt-12 text-[2.4rem] font-bold">Bạn chưa có nhóm nghiên cứu khoa học không thể xem trạng thái đề tài</h2>
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
                                {dt === undefined ? <></> : (
                                    <tr>
                                        <td className="p-3 border-2 max-w-[280px] border-gray-300">{dt.tendt.length <= 25 ? dt.tendt : dt.tendt.substring(0, 25) + " ..."}</td>
                                        <td className="p-3 border-2 max-w-[210px] border-gray-300">{dt.tenchunhiem}</td>
                                        <td className="p-3 border-2 max-w-[210px] border-gray-300">{dt.tengvhd}</td>
                                        <td className="p-3 border-2 max-w-[265px] border-gray-300">{dt.decuong ? (dt.decuong.length <= 25 ? dt.decuong : dt.decuong.substring(0, 25) + " ...") : "Chưa nộp đề cương"}</td>
                                        <td className="p-3 border-2 border-gray-300">
                                            <div className="flex gap-4">
                                                <div onClick={handleDetail} className="px-6 py-1 cursor-pointer hover:bg-blue-300 bg-blue-200 rounded-3xl">
                                                    <FontAwesomeIcon className="mr-2" icon={faCircleExclamation} /> Chi tiết
                                                </div>
                                                <div className="px-6 py-1 cursor-pointer text-white hover:bg-rose-500 bg-rose-400 rounded-3xl">
                                                    <FontAwesomeIcon className="mr-2" icon={faPen} /> Chỉnh sửa
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <Modal hidden ref={modalRef} onClick={handleClose} className="modal">
                        <div className="relative">
                            <h3 className="text-center m-8 text-4xl font-semibold">Chi tiết đề tài</h3>
                            <FontAwesomeIcon onClick={handleClose} className="absolute top-1/2 right-5 -translate-y-1/2 p-2 text-4xl cursor-pointer hover:opacity-70" icon={faXmark} />
                        </div>
                        <div className="p-10">
                            <div className="flex gap-12">
                                <div className="w-[300px]">
                                    <label className="block text-[1.8rem] mb-2">Mã sinh viên</label>
                                    <input
                                        className="w-full px-3 py-2 text-[1.8rem] border-solid border-2 border-gray-400 focus:border-gray-700 rounded-md"
                                        type="text"
                                        placeholder="Mã sinh viên"
                                    />
                                </div>
                                <div className="w-[300px]">
                                    <label className="block text-[1.8rem] mb-2">Tên sinh viên</label>
                                    <input className="w-full px-3 py-2 text-[1.8rem] border-solid border-2 border-gray-400 focus:border-gray-700 rounded-md" type="text" placeholder="Tên sinh viên" />
                                </div>
                            </div>
                        </div>
                    </Modal>
                </>
            )}
        </div>
    );
}

export default TrangThaiDeTai;