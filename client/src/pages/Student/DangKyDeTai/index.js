import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "~/components/Button";
import Modal from "~/components/Modal";

const currentUser = JSON.parse(localStorage.getItem("account")) || "";

function DangKyDeTai() {
    const [dsnhom, setDsnhom] = useState([]);
    const [dssinhvien, setDssinhvien] = useState([]);
    const [sv, setSv] = useState(false);
    const [giangviens, setGiangviens] = useState([]);
    const [detai, setDetai] = useState('');
    const [masvadd, setMasvadd] = useState('');
    const [tensvadd, setTensvadd] = useState('');
    const [thanhvien, setThanhvien] = useState([]);
    const [gvhd, setGvhd] = useState('');
    const [desc, setDesc] = useState('');
    const modalRef = useRef();
    const error1Ref = useRef();
    const error2Ref = useRef();
    const error3Ref = useRef();
    const error4Ref = useRef();
    const detaiErrorRef = useRef();
    const giangvienErrorRef = useRef();

    useLayoutEffect(() => {
        fetch("http://localhost/QLNCKH/PHP/nhom.php")
            .then((response) => response.json())
            .then((res) => {
                setDssinhvien(res);
            });
    }, []);

    const handleAddMember = (e) => {
        e.preventDefault();
        setMasvadd('');
        setTensvadd('');
        modalRef.current.hidden = false;
        if (masvadd !== "") {
            if (masvadd.startsWith("sv")) {
                if (dssinhvien.some((sinhvien) => sinhvien.masv === masvadd)) {
                    error2Ref.current.hidden = false;
                }
                else if (thanhvien.some((tv) => {
                    return tv.masv === masvadd;
                })) {
                    error3Ref.current.hidden = false;
                }
                else if (currentUser.ma === masvadd) {
                    error4Ref.current.hidden = false;
                }
                else {
                    setThanhvien([...thanhvien, { "masv": masvadd, "tensv": tensvadd }]);
                    modalRef.current.hidden = true;
                }
            } else {
                error1Ref.current.hidden = false;
            }
        }
    };

    const handleClose = (e) => {
        e.target.closest(".modal").hidden = true;
        error1Ref.current.hidden = true;
        error2Ref.current.hidden = true;
        error3Ref.current.hidden = true;
        error4Ref.current.hidden = true;
    };

    const handleSubmit = () => {
        if (detai === "") detaiErrorRef.current.hidden = false;
        if (gvhd === "") giangvienErrorRef.current.hidden = false;

    };

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: 'POST',
            headers: {
                // 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "userId": 1,
                "id": 0,
                "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
            })
        })
            .then((response) => {
                console.log(response);
                response.json();
            })
            .then((res) => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    });

    useEffect(() => {
        fetch("http://localhost/QLNCKH/PHP/giangvien.php")
            .then((response) => response.json())
            .then((res) => {
                setGiangviens(res);
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
        setSv(dsnhom.some((sinhvien) => sinhvien.masv === currentUser.ma));
    });
    return (
        <>
            {sv ? (
                <h3 className="text-center mt-12 text-[2.4rem] font-bold">Bạn đã có đề tài không thể đăng ký thêm</h3>
            ) : (
                <>
                    <div>
                        <h2 className="text-center text-4xl font-bold pb-16 border-b-2 border-gray-200">Đăng ký đề tài</h2>
                        <div className="px-4 select-none">
                            <label className="block mt-8 text-3xl">Tên đề tài</label>
                            <input
                                value={detai}
                                onChange={(e) => {
                                    detaiErrorRef.current.hidden = true;
                                    setDetai(e.target.value);
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
                            <label className="block mt-8 text-3xl">Giảng viên hướng dẫn</label>
                            <select
                                onChange={(e) => {
                                    giangvienErrorRef.current.hidden = true;
                                    setGvhd(e.target.value);
                                }}
                                defaultValue={'DEFAULT'}
                                className="text-3xl mt-3 p-3 w-full border-solid border-2 border-gray-200 focus:border-gray-400 rounded-lg"
                            >
                                <option value="DEFAULT" disabled hidden></option>
                                {giangviens.map((giangvien, index) => (
                                    <option key={index} value={giangvien.magv} >{`${giangvien.magv} - ${giangvien.tengv}`}</option>
                                ))}
                            </select>
                            <p ref={giangvienErrorRef} hidden className="text-red-500">*Chưa chọn giảng viên hướng dẫn</p>
                            <Button onClick={handleAddMember} primary className="mt-10">Thêm thành viên</Button>
                            <label className="block mt-8 text-3xl">Mô tả đề tài</label>
                            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="text-3xl mt-3 p-3 w-full border-solid border-2 border-gray-200 focus-visible:outline-none focus:border-gray-400 rounded-lg" rows="6" placeholder="Mô tả thông tin về đề tài"></textarea>
                            <Button onClick={handleSubmit} primary className="mt-10 w-52">Đăng ký</Button>
                        </div>
                    </div>
                    <Modal hidden ref={modalRef} onClick={handleClose} className="modal">
                        <div className="relative">
                            <h3 className="text-center m-8 text-4xl font-semibold">Thêm thành viên</h3>
                            <FontAwesomeIcon onClick={handleClose} className="absolute top-1/2 right-5 -translate-y-1/2 p-2 text-4xl cursor-pointer hover:opacity-70" icon={faXmark} />
                        </div>
                        <form onSubmit={handleAddMember} className="p-10">
                            <div className="flex gap-12">
                                <div className="w-[300px]">
                                    <label className="block text-[1.8rem] mb-2">Mã sinh viên</label>
                                    <input
                                        value={masvadd}
                                        onChange={(e) => {
                                            error1Ref.current.hidden = true;
                                            error2Ref.current.hidden = true;
                                            error3Ref.current.hidden = true;
                                            error4Ref.current.hidden = true;
                                            setMasvadd(e.target.value);
                                        }}
                                        className="w-full px-3 py-2 text-[1.8rem] border-solid border-2 border-gray-400 focus:border-gray-700 rounded-md"
                                        type="text"
                                        placeholder="Mã sinh viên"
                                    />
                                    <p hidden ref={error1Ref} className="block text-red-600 mb-2">*Mã sinh viên không hợp lệ</p>
                                    <p hidden ref={error2Ref} className="block text-red-600 mb-2">*Thành viên này đã tham gia vào nhóm nghiên cứu khác</p>
                                    <p hidden ref={error3Ref} className="block text-red-600 mb-2">*Bạn đã thêm thành viên này, vui lòng nhập sinh viên khác</p>
                                    <p hidden ref={error4Ref} className="block text-red-600 mb-2">*Bạn là chủ nhiệm đề tài, vui lòng nhập thành viên khác</p>
                                </div>
                                <div className="w-[300px]">
                                    <label className="block text-[1.8rem] mb-2">Tên sinh viên</label>
                                    <input value={tensvadd} onChange={(e) => setTensvadd(e.target.value)} className="w-full px-3 py-2 text-[1.8rem] border-solid border-2 border-gray-400 focus:border-gray-700 rounded-md" type="text" placeholder="Tên sinh viên" />
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