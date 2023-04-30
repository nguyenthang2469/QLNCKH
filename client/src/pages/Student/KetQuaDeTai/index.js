import { useLayoutEffect, useState } from "react";

const currentUser = JSON.parse(localStorage.getItem("account")) || "";

function KetQuaDeTai() {
    const [dsketqua, setDsketqua] = useState([]);
    const [dsnhom, setDsnhom] = useState([]);
    const [sv, setSv] = useState();
    const [kq, setKq] = useState();

    useLayoutEffect(() => {
        fetch("http://localhost/QLNCKH/PHP/ketqua.php")
            .then((response) => response.json())
            .then((res) => {
                setDsketqua(res);
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
            setKq(dsketqua.find((detai) => detai.manhom === sv.manhom));
        }
    }, [dsnhom, dsketqua]);

    return (
        <div>
            {sv === undefined ? (
                <h2 className="text-center mt-12 text-[2.4rem] font-bold">Bạn chưa có nhóm nghiên cứu khoa học không thể xem đánh giá</h2>
            ) : (
                <>
                    {kq === undefined ? <></> : (
                        <>
                            {
                                kq.danhgia === "" ? (
                                    <h2 className="text-center mt-12 text-[2.4rem] font-bold">Đề tài chưa chấm, không có đánh giá</h2>
                                ) : (
                                    <>
                                        <h2 className="text-center text-4xl font-bold pb-16 border-b-2 border-gray-200">Đánh giá đề tài</h2>
                                        <div className="px-4 select-none">
                                            <table className="w-full mt-12">
                                                <thead>
                                                    <tr>
                                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Chủ nhiệm đề tài</th>
                                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Giảng viên Chấm</th>
                                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Điểm</th>
                                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Đánh giá</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="p-3 border-2 max-w-[280px] border-gray-300">{kq.tenchunhiem}</td>
                                                        <td className="p-3 border-2 max-w-[210px] border-gray-300">{kq.tengvcham}</td>
                                                        <td className="p-3 border-2 max-w-[210px] border-gray-300">{kq.diem}</td>
                                                        <td className="p-3 border-2 max-w-[265px] border-gray-300">{kq.danhgia}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                )
                            }
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default KetQuaDeTai;