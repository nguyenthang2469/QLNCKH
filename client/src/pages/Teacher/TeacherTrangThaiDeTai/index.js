import { faChevronLeft, faChevronRight, faCircleExclamation, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Button from "~/components/Button";

const currentUser = JSON.parse(localStorage.getItem("account")) || "";

function TrangThaiDeTai() {
    const [dsdetai, setDsdetai] = useState([]);
    const [dsnhom, setDsnhom] = useState([]);
    const sv = useRef({});
    useLayoutEffect(() => {
        fetch("http://localhost/QLNCKH/PHP/detai.php")
            .then((response) => response.json())
            .then((res) => {
                setDsdetai(res);
            });
    }, []);

    useEffect(() => {
        fetch("http://localhost/QLNCKH/PHP/nhom.php")
            .then((response) => response.json())
            .then((res) => {
                setDsnhom(res);
            });
        sv.current = dsnhom.find((sinhvien) => sinhvien.masv == currentUser.ma);
    }, []);

    return (
        <div>
            <h2 className="text-center text-4xl font-bold pb-16 border-b-2 border-gray-200">Trạng thái đề tài</h2>
            <div className="px-4 select-none">
                {sv.current ? (
                    <h2 className="mt-12 text-3xl">Bạn chưa có nhóm nghiên cứu khoa học</h2>
                ) : (
                    <>
                        <table className="w-full mt-12">
                            <thead>
                                <tr>
                                    <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Tên đề tài</th>
                                    <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Giảng viên hướng dẫn</th>
                                    <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Đề cương</th>
                                    <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Chức năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                { }
                                <tr>
                                    <td className="p-3 border-2 max-w-[280px] border-gray-300">Xây dựng website quan ly phong lab</td>
                                    <td className="p-3 border-2 max-w-[210px] border-gray-300">Bùi Văn Tân</td>
                                    <td className="p-3 border-2 max-w-[265px] border-gray-300">Báo cáo Nghiên cứu khoa học.docx</td>
                                    <td className="p-3 border-2 border-gray-300">
                                        <span className="ml-5 px-6 py-1 cursor-pointer hover:bg-blue-300 bg-blue-200 rounded-3xl">
                                            <FontAwesomeIcon className="mr-2" icon={faCircleExclamation} /> Chi tiết
                                        </span>
                                        <span className="ml-8 px-6 py-1 cursor-pointer text-white hover:bg-rose-500 bg-rose-400 rounded-3xl">
                                            <FontAwesomeIcon className="mr-2" icon={faPen} /> Chỉnh sửa
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 border-2 max-w-[280px] border-gray-300">Xây dựng website quan ly phong lab</td>
                                    <td className="p-3 border-2 max-w-[210px] border-gray-300">Bùi Văn Tân</td>
                                    <td className="p-3 border-2 max-w-[265px] border-gray-300">Báo cáo Nghiên cứu khoa học.docx</td>
                                    <td className="p-3 border-2 border-gray-300">
                                        <span className="ml-5 px-6 py-1 cursor-pointer hover:bg-blue-300 bg-blue-200 rounded-3xl">
                                            <FontAwesomeIcon className="mr-2" icon={faCircleExclamation} /> Chi tiết
                                        </span>
                                        <span className="ml-8 px-6 py-1 cursor-pointer text-white hover:bg-rose-500 bg-rose-400 rounded-3xl">
                                            <FontAwesomeIcon className="mr-2" icon={faPen} /> Chỉnh sửa
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 border-2 max-w-[280px] border-gray-300">Xây dựng website quan ly phong lab</td>
                                    <td className="p-3 border-2 max-w-[210px] border-gray-300">Bùi Văn Tân</td>
                                    <td className="p-3 border-2 max-w-[265px] border-gray-300">Báo cáo Nghiên cứu khoa học.docx</td>
                                    <td className="p-3 border-2 border-gray-300">
                                        <span className="ml-5 px-6 py-1 cursor-pointer hover:bg-blue-300 bg-blue-200 rounded-3xl">
                                            <FontAwesomeIcon className="mr-2" icon={faCircleExclamation} /> Chi tiết
                                        </span>
                                        <span className="ml-8 px-6 py-1 cursor-pointer text-white hover:bg-rose-500 bg-rose-400 rounded-3xl">
                                            <FontAwesomeIcon className="mr-2" icon={faPen} /> Chỉnh sửa
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 border-2 max-w-[280px] border-gray-300">Xây dựng website quan ly phong lab</td>
                                    <td className="p-3 border-2 max-w-[210px] border-gray-300">Bùi Văn Tân</td>
                                    <td className="p-3 border-2 max-w-[265px] border-gray-300">Báo cáo Nghiên cứu khoa học.docx</td>
                                    <td className="p-3 border-2 border-gray-300">
                                        <span className="ml-5 px-6 py-1 cursor-pointer hover:bg-blue-300 bg-blue-200 rounded-3xl">
                                            <FontAwesomeIcon className="mr-2" icon={faCircleExclamation} /> Chi tiết
                                        </span>
                                        <span className="ml-8 px-6 py-1 cursor-pointer text-white hover:bg-rose-500 bg-rose-400 rounded-3xl">
                                            <FontAwesomeIcon className="mr-2" icon={faPen} /> Chỉnh sửa
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 border-2 max-w-[280px] border-gray-300">Xây dựng website quan ly phong lab</td>
                                    <td className="p-3 border-2 max-w-[210px] border-gray-300">Bùi Văn Tân</td>
                                    <td className="p-3 border-2 max-w-[265px] border-gray-300">Báo cáo Nghiên cứu khoa học.docx</td>
                                    <td className="p-3 border-2 border-gray-300">
                                        <span className="ml-5 px-6 py-1 cursor-pointer hover:bg-blue-300 bg-blue-200 rounded-3xl">
                                            <FontAwesomeIcon className="mr-2" icon={faCircleExclamation} /> Chi tiết
                                        </span>
                                        <span className="ml-8 px-6 py-1 cursor-pointer text-white hover:bg-rose-500 bg-rose-400 rounded-3xl">
                                            <FontAwesomeIcon className="mr-2" icon={faPen} /> Chỉnh sửa
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 border-2 max-w-[280px] border-gray-300">Xây dựng website quan ly phong lab</td>
                                    <td className="p-3 border-2 max-w-[210px] border-gray-300">Bùi Văn Tân</td>
                                    <td className="p-3 border-2 max-w-[265px] border-gray-300">Báo cáo Nghiên cứu khoa học.docx</td>
                                    <td className="p-3 border-2 border-gray-300">
                                        <div className="flex gap-4">
                                            <div className="px-6 py-1 cursor-pointer hover:bg-blue-300 bg-blue-200 rounded-3xl">
                                                <FontAwesomeIcon className="mr-2" icon={faCircleExclamation} /> Chi tiết
                                            </div>
                                            <div className="px-6 py-1 cursor-pointer text-white hover:bg-rose-500 bg-rose-400 rounded-3xl">
                                                <FontAwesomeIcon className="mr-2" icon={faPen} /> Chỉnh sửa
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="mt-8 flex justify-end items-center">
                            <button className="py-2 px-5 bg-gray-200 rounded-lg">
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            <span className="mx-6">1</span>
                            <button className="py-2 px-5 bg-gray-200 rounded-lg">
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default TrangThaiDeTai;