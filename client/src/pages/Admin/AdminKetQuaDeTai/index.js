import { useEffect, useState } from "react";
import * as request from "~/utils/request";

function AdminKetQuaDeTai() {
    const [dsketqua, setDsketqua] = useState([]);
    const [dsketquahienthi, setDsketquahienthi] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [attrSearch, setAttrSearch] = useState("tendt");
    const [valueSearch, setValueSearch] = useState("");

    useEffect(() => {
        const fetchAPI = async () => {
            setIsLoading(true)
            const res = await request.get("/ketqua");
            if(res.length) {
                setDsketqua(res);
                setDsketquahienthi(res);
            }
            setIsLoading(false);
        };
        fetchAPI();
    }, []);

    const handleSearch = (e) => {
        setValueSearch(e.target.value);
        if(e.target.value) {
            setDsketquahienthi(dsketqua.filter(kq => kq[attrSearch].toLowerCase().includes(e.target.value.toLowerCase())))
        } else setDsketquahienthi(dsketqua);
    }

    return (
        <div>
            {isLoading ? <div>Trang web đang được tải</div> :
                !dsketqua.length ? (
                    <h2 className="text-center mt-12 text-[2.4rem] font-bold">Hiện chưa có đề tài nào đã được chấm</h2>
                ) : (
                    <>
                        <h2 className="text-center text-4xl font-bold pb-16 border-b-2 border-gray-200">Danh sách kết quả đề tài</h2>
                        <div className="mt-4">
                            <span>Tìm kiếm</span>
                            <select
                                value={attrSearch}
                                onChange={e => setAttrSearch(e.target.value)}
                                className="mx-4 px-3 py-2 text-[1.8rem] border-solid border-2 border-gray-400 focus:border-gray-600 rounded-md"
                            >
                                <option value="tendt">Tên đề tài</option>
                                <option value="tenchunhiem">Chủ nhiệm đề tài</option>
                                <option value="tengvcham">Giảng viên chấm</option>
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
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Giảng viên chấm</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Điểm</th>
                                        <th className="p-3 text-3xl font-semibold bg-[#aff3f7] border-2 border-gray-300">Đánh giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    dsketquahienthi.map((kq, index) => (
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