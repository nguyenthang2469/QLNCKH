import { useEffect, useRef, useState, useContext } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "~/components/Button";
import Modal from "~/components/Modal";
import * as request from "~/utils/request";
import { UserContext } from "~/components/Layout/StudentLayout";

function DangKyDeTai() {
    const currentUser = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [dsgiangvien, setDsgiangvien] = useState([]);
    const [dsgvdahd, setDsgvdahd] = useState([]);
    const [sv, setSv] = useState({});
    const [tendetai, setTendetai] = useState('');
    const [gvhd, setGvhd] = useState('');
    const [dsthanhvien, setDsthanhvien] = useState([]);
    const [mathanhvien, setMathanhvien] = useState('');

    const detaiErrorRef = useRef();
    const giangvienErrorRef = useRef();
    const modalRef = useRef();
    const inputMemberRef = useRef();
    const error1Ref = useRef();
    const error2Ref = useRef();
    const error3Ref = useRef();
    const error4Ref = useRef();

    useEffect(() => {
        const fetchAPI = async (masv) => {
            setIsLoading(true);
            const res = await request.get('/nhom', { params: { masv } });
            setSv(res[0]);
            setIsLoading(false);
        };

        fetchAPI(currentUser.ma);
    }, [currentUser]);

    useEffect(() => {
        const fetchAPI = async () => {
            setIsLoading(true);
            const res = await request.get('/detai');
            let magvhd = res.map(element => {
                return element.magvhd;
            });
            setDsgvdahd(magvhd);
            setIsLoading(false);
        };

        fetchAPI();
    }, []);

    useEffect(() => {
        const fetchAPI = async (magv) => {
            setIsLoading(true);
            const res = await request.get('/giangvien', { params: { magv } });
            setDsgiangvien(res);
            setIsLoading(false);
        };

        fetchAPI(dsgvdahd);
    }, [dsgvdahd]);

    useEffect(() => {
    }, [mathanhvien]);

    const handleAddMember = (e) => {
        e.preventDefault();
        const fetchAPI = async (masv) => {
            const ressv = await request.get('/sinhvien', { params: { masv } });
            if (ressv[0]) {
                const res = await request.get('/nhom', { params: { masv } });
                if (res.length > 0) {
                    error2Ref.current.hidden = false;
                }
                else if (dsthanhvien.some((tv) => {
                    return tv.masv === mathanhvien;
                })) {
                    error3Ref.current.hidden = false;
                }
                else if (currentUser.ma === mathanhvien) {
                    error4Ref.current.hidden = false;
                }
                else {
                    setDsthanhvien(prev => [...prev, { masv: mathanhvien, tensv: ressv[0].tensv }]);
                    setMathanhvien("");
                    modalRef.current.hidden = true;
                }
            } else {
                error1Ref.current.hidden = false;
            }
        };

        fetchAPI(mathanhvien);
    };

    const handleDelete = (id) => {
        setDsthanhvien(prev => {
            const newState = prev.filter((item, index) => index !== id);
            return newState;
        });
    };

    const handleClose = (e) => {
        e.target.closest(".modal").hidden = true;
        setMathanhvien("");
        error1Ref.current.hidden = true;
        error2Ref.current.hidden = true;
        error3Ref.current.hidden = true;
        error4Ref.current.hidden = true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (tendetai === "" || gvhd === "") {
            if (tendetai === "") detaiErrorRef.current.hidden = false;
            if (gvhd === "") giangvienErrorRef.current.hidden = false;
        } else {
            const fetchAPI = async () => {
                const res = await request.get('/nhom', { params: { order: "DESC", limit: 1 } });
                let manhom = res[0]?.manhom || "nc0";
                manhom = "nc" + (Number(manhom.slice(2, manhom.length)) + 1);
                await request.post('/nhom', {
                    manhom,
                    masv: currentUser.ma,
                    tensv: currentUser.hoten,
                    vaitro: "Chủ nhiệm"
                });
                if (dsthanhvien.length > 0) {
                    dsthanhvien.map(async (thanhvien) => {
                        await request.post('/nhom', {
                            manhom,
                            masv: thanhvien.masv,
                            tensv: thanhvien.tensv,
                            vaitro: "Thành viên"
                        });
                    });
                }
                const resdt = await request.get('/detai', { params: { order: "DESC", limit: 1 } });
                let madt = resdt[0]?.madt || "dt0";
                madt = "dt" + (Number(madt.slice(2, madt.length)) + 1);
                const respostdt = await request.post('/detai', {
                    madt,
                    tendt: tendetai,
                    machunhiem: currentUser.ma,
                    tenchunhiem: currentUser.hoten,
                    manhom,
                    magvhd: gvhd.magv,
                    tengvhd: gvhd.tengv
                });
                if (respostdt) {
                    alert("Đăng ký đề tài thành công");
                    window.location.href = "/trangthaidetai";
                }
            };
            fetchAPI();
        }
    };
    return (
        <>
            {isLoading ? <div>Trang web đang được tải</div> :
                sv ? (
                    <h3 className="text-center mt-12 text-[2.4rem] font-bold">Bạn đã có đề tài, không thể đăng ký thêm</h3>
                ) : (
                    <>
                        <div>
                            <h2 className="text-center text-4xl font-bold pb-16 border-b-2 border-gray-200">Đăng ký đề tài</h2>
                            <div className="px-4 select-none">
                                <label className="block mt-8 text-3xl">Tên đề tài</label>
                                <input
                                    value={tendetai}
                                    onChange={(e) => {
                                        detaiErrorRef.current.hidden = true;
                                        setTendetai(e.target.value);
                                    }}
                                    type="text"
                                    className="text-3xl mt-3 p-3 w-full border-solid border-2 border-gray-200 focus:border-gray-400 rounded-lg"
                                    placeholder="Tên đề tài"
                                />
                                <p ref={detaiErrorRef} hidden className="text-red-500">*Đề tài không được để trống</p>
                                <label className="block mt-8 text-3xl">Mã sinh viên</label>
                                <input value={currentUser.ma} disabled type="text" className="text-3xl mt-3 p-3 w-full border-solid border-2 border-gray-200 focus:border-gray-400 rounded-lg" placeholder="Mã sinh viên" />
                                <label className="block mt-8 text-3xl">Tên sinh viên</label>
                                <input value={currentUser.hoten} disabled type="text" className="text-3xl mt-3 p-3 w-full border-solid border-2 border-gray-200 focus:border-gray-400 rounded-lg" placeholder="Mã sinh viên" />
                                {dsthanhvien ? dsthanhvien.map((tv, index) => (
                                    <div key={index} className="flex items-end gap-10 w-full">
                                        <div className="w-full">
                                            <label className="block mt-8 text-3xl">Mã thành viên</label>
                                            <input value={tv.masv} disabled type="text" className="text-3xl mt-3 p-3 w-full border-solid border-2 border-gray-200 focus:border-gray-400 rounded-lg" placeholder="Mã sinh viên" />
                                        </div>
                                        <div className="w-full">
                                            <label className="block mt-8 text-3xl">Tên thành viên</label>
                                            <input value={tv.tensv} disabled type="text" className="text-3xl mt-3 p-3 w-full border-solid border-2 border-gray-200 focus:border-gray-400 rounded-lg" placeholder="Mã sinh viên" />
                                        </div>
                                        <div onClick={() => handleDelete(index)} className="text-white shrink-0 grow px-6 py-1 cursor-pointer hover:bg-red-500 bg-red-400 rounded-3xl">
                                            <FontAwesomeIcon icon={faXmark} /> Xóa
                                        </div>
                                    </div>
                                )) : <></>}

                                <Button
                                    onClick={() => {
                                        modalRef.current.hidden = false;
                                        inputMemberRef.current.focus();
                                    }}
                                    primary
                                    className="mt-10"
                                >
                                    Thêm thành viên
                                </Button>
                                <label className="block mt-8 text-3xl">Giảng viên hướng dẫn</label>
                                <select
                                    onChange={(e) => {
                                        giangvienErrorRef.current.hidden = true;
                                        setGvhd(JSON.parse(e.target.value));
                                    }}
                                    defaultValue={'DEFAULT'}
                                    className="text-3xl mt-3 p-3 w-full border-solid border-2 border-gray-200 focus:border-gray-400 rounded-lg"
                                >
                                    <option value="DEFAULT" disabled hidden></option>
                                    {dsgiangvien.length > 0 && dsgiangvien.map((giangvien, index) => (
                                        <option key={index} value={JSON.stringify({ magv: giangvien.magv, tengv: giangvien.tengv })} >{`${giangvien.magv} - ${giangvien.tengv}`}</option>
                                    ))}
                                </select>
                                <p ref={giangvienErrorRef} hidden className="text-red-500">*Chưa chọn giảng viên hướng dẫn</p>
                                <Button onClick={handleSubmit} primary className="mt-10 w-52">Đăng ký</Button>
                            </div>
                        </div>
                        <Modal hidden ref={modalRef} onClick={handleClose} className="modal">
                            <div className="relative">
                                <h3 className="text-center m-8 text-4xl font-semibold">Thêm thành viên</h3>
                                <FontAwesomeIcon onClick={handleClose} className="absolute top-1/2 right-5 -translate-y-1/2 p-2 text-4xl cursor-pointer hover:opacity-70" icon={faXmark} />
                            </div>
                            <form onSubmit={handleAddMember} className="p-12 border-t-2 border-gray-200">
                                <div className="flex gap-12">
                                    <div className="w-[500px]">
                                        <label className="block text-[1.8rem] mb-2">Mã sinh viên</label>
                                        <input
                                            ref={inputMemberRef}
                                            value={mathanhvien}
                                            onChange={(e) => {
                                                error1Ref.current.hidden = true;
                                                error2Ref.current.hidden = true;
                                                error3Ref.current.hidden = true;
                                                error4Ref.current.hidden = true;
                                                setMathanhvien(e.target.value);
                                            }}
                                            className="w-full px-3 py-2 text-[1.8rem] border-solid border-2 border-gray-400 focus:border-gray-700 rounded-md"
                                            type="text"
                                            placeholder="Mã sinh viên"
                                            required
                                        />
                                        <p hidden ref={error1Ref} className="block text-red-600 mb-2">*Mã sinh viên không hợp lệ</p>
                                        <p hidden ref={error2Ref} className="block text-red-600 mb-2">*Thành viên này đã tham gia vào nhóm nghiên cứu khác</p>
                                        <p hidden ref={error3Ref} className="block text-red-600 mb-2">*Bạn đã thêm thành viên này, vui lòng nhập thành viên khác</p>
                                        <p hidden ref={error4Ref} className="block text-red-600 mb-2">*Bạn là chủ nhiệm đề tài, vui lòng nhập thành viên khác</p>
                                    </div>
                                </div>
                                <Button primary className="block mx-auto mt-7 w-52">Thêm</Button>
                            </form>
                        </Modal>
                    </>
                )}
        </>
    );
}

export default DangKyDeTai;