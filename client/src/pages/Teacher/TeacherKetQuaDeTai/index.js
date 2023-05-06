import { useEffect, useState, useContext } from "react";
import * as request from "~/utils/request";
import { UserContext } from "~/components/Layout/TeacherLayout";

function TeacherKetQuaDeTai() {
    const currentUser = useContext(UserContext);

    const [detai, setDetai] = useState(null);
    const [ketqua, setKetqua] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAPI = async (magvhd) => {
            setIsLoading(true)
            const res = await request.get("/detai", { params: { magvhd } });
            if(res[0]) {
                setDetai(res[0]);
                const reskq = await request.get("/ketqua", { params: { madt: res[0].madt } });
                reskq[0] && setKetqua(reskq[0]);
            }
            setIsLoading(false);
        };
        fetchAPI(currentUser.ma);
    }, [currentUser]);

    return (
        <div>
            {isLoading ? <div>Trang web đang được tải</div> :
                !detai ? (
                    <h2 className="text-center mt-12 text-[2.4rem] font-bold">Bạn chưa hướng dẫn nhóm nghiên cứu nào</h2>
                ) : 
                !ketqua ? (
                    <h2 className="text-center mt-12 text-[2.4rem] font-bold">Nhóm nghiên cứu của bạn chưa được phân công giáo viên chấm</h2>
                ) : 
                !ketqua.diem ? (
                    <h2 className="text-center mt-12 text-[2.4rem] font-bold">Nhóm nghiên cứu của bạn chưa được chấm</h2>
                ) : (
                    <>
                        <h2 className="text-center text-4xl font-bold pb-16 border-b-2 border-gray-200">Trạng thái đề tài</h2>
                        <div className="px-4 select-none">
                            <table className="w-full mt-12">
                                <thead>
                                    <tr>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Tên đề tài</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Chủ nhiệm đề tài</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Giảng viên chấm</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Điểm</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Đánh giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-3 border-2 max-w-[280px] border-gray-300">{ketqua.tendt}</td>
                                        <td className="p-3 border-2 max-w-[210px] border-gray-300">{ketqua.tenchunhiem}</td>
                                        <td className="p-3 border-2 max-w-[210px] border-gray-300">{ketqua.tengvcham}</td>
                                        <td className="p-3 border-2 max-w-[265px] border-gray-300">{ketqua.diem}</td>
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

export default TeacherKetQuaDeTai;