import { useContext, useEffect, useState } from "react";
import { UserContext } from "~/components/Layout/StudentLayout";
import * as request from "~/utils/request";

function KetQuaDeTai() {
    const currentUser = useContext(UserContext);

    const [ketqua, setKetqua] = useState({});
    const [sinhvien, setSinhvien] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAPI = async (masv) => {
            setIsLoading(true);
            const ressv = await request.get('/nhom', { params: { masv } });
            if(ressv.length > 0) {
                const reskq = await request.get("/ketqua", { params: { manhom: ressv[0].manhom } });
                setKetqua(reskq[0]);
            }
            setSinhvien(ressv[0]);
            setIsLoading(false);
        };
        fetchAPI(currentUser.ma);
    }, [currentUser]);
    return (
        <div>
            {isLoading ? <div>Trang web đang được tải</div> :
                !sinhvien ? (
                    <h2 className="text-center mt-12 text-[2.4rem] font-bold">Bạn chưa có nhóm nghiên cứu khoa học không thể xem đánh giá</h2>
                ) :
                    !ketqua ? (<h2 className="text-center mt-12 text-[2.4rem] font-bold">Chưa phân công giáo viên chấm, không có đánh giá</h2>) : 
                        ketqua.diem === null ? (<h2 className="text-center mt-12 text-[2.4rem] font-bold">Đang chờ giáo viên chấm điểm</h2>) : (
                        <>
                            <h2 className="text-center text-4xl font-bold pb-16 border-b-2 border-gray-200">Đánh giá đề tài</h2>
                            <div className="px-4 select-none">
                                <table className="w-full mt-12 text-center">
                                    <thead>
                                        <tr>
                                            <th className="w-1/5 p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Tên đề tài</th>
                                            <th className="w-1/6 p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Chủ nhiệm đề tài</th>
                                            <th className="w-1/6 p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Giảng viên Chấm</th>
                                            <th className="w-1/7 p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Điểm</th>
                                            <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Đánh giá</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="py-3 px-6 border-2 max-w-[280px] border-gray-300">{ketqua.tendt}</td>
                                            <td className="py-3 px-6 border-2 max-w-[280px] border-gray-300">{ketqua.tenchunhiem}</td>
                                            <td className="py-3 px-6 border-2 max-w-[210px] border-gray-300">{ketqua.tengvcham}</td>
                                            <td className="py-3 px-6 border-2 max-w-[210px] border-gray-300">{ketqua.diem}</td>
                                            <td className="py-3 px-6 border-2 max-w-[265px] border-gray-300 text-justify">{ketqua.danhgia}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )
            }
        </div>
    );
}

export default KetQuaDeTai;