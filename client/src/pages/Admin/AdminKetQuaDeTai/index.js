import { useEffect, useState } from "react";
import * as request from "~/utils/request";

function AdminKetQuaDeTai() {
    const [dsketqua, setDsketqua] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAPI = async () => {
            setIsLoading(true)
            const res = await request.get("/ketqua");
            res.length && setDsketqua(res);
            setIsLoading(false);
        };
        fetchAPI();
    }, []);

    return (
        <div>
            {isLoading ? <div>Trang web đang được tải</div> :
                !dsketqua.length ? (
                    <h2 className="text-center mt-12 text-[2.4rem] font-bold">Hiện chưa có đề tài nào đã được chấm</h2>
                ) : (
                    <>
                        <h2 className="text-center text-4xl font-bold pb-16 border-b-2 border-gray-200">Danh sách kết quả đề tài</h2>
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
                                {
                                    dsketqua.map((kq, index) => (
                                        <tr key={index}>
                                            <td className="p-3 border-2 max-w-[280px] border-gray-300">{kq.tendt}</td>
                                            <td className="p-3 border-2 max-w-[210px] border-gray-300">{kq.tenchunhiem}</td>
                                            <td className="p-3 border-2 max-w-[210px] border-gray-300">{kq.tengvcham}</td>
                                            <td className="p-3 border-2 max-w-[265px] border-gray-300">{kq.diem}</td>
                                            <td className="py-3 px-6 border-2 max-w-[265px] border-gray-300 text-justify">{kq.danhgia}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default AdminKetQuaDeTai;