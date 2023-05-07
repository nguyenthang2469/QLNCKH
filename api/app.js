const express = require('express');
const db = require('./config/db');
const cors = require('cors');

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

// Tài khoản
app.get("/api/user", (req, res) => {
    const taikhoan = req.query.taikhoan;
    if (taikhoan) {
        db.query("SELECT * FROM account where taikhoan = ?", taikhoan, (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send(result);
        });
    } else {
        db.query("SELECT * FROM account", (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send(result);
        });
    }
});

app.put("/api/user/:taikhoan", (req, res) => {
    const taikhoan = req.params.taikhoan;
    const matkhau = req.body.matkhau;

    db.query("UPDATE account SET matkhau = ? where taikhoan = ?", [matkhau, taikhoan], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});

// Sinh viên
app.get("/api/sinhvien", (req, res) => {
    const masv = req.query.masv;
    if (masv) {
        db.query("SELECT masv, tensv, DATE_FORMAT(ngaysinh, '%Y-%m-%d') as 'ngaysinh', gioitinh, lop, khoa, diachi FROM sinhvien where masv = ?", masv, (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send(result);
        });
    } else {
        db.query("SELECT masv, tensv, DATE_FORMAT(ngaysinh, '%Y-%m-%d') as 'ngaysinh', gioitinh, lop, khoa, diachi FROM sinhvien", (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send(result);
        });
    }
});

app.put("/api/sinhvien/:masv", (req, res) => {
    const masv = req.params.masv;
    const ngaysinh = req.body.ngaysinh;
    const gioitinh = Number(req.body.gioitinh);
    const lop = req.body.lop;
    const khoa = req.body.khoa;
    const diachi = req.body.diachi;

    db.query("UPDATE sinhvien SET ngaysinh = ?, gioitinh = ?, lop = ?, khoa = ?, diachi = ? where masv = ?", [ngaysinh, gioitinh, lop, khoa, diachi, masv], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});

// Nhóm
app.get("/api/nhom", (req, res) => {
    const masv = req.query.masv;
    const manhom = req.query.manhom;
    const vaitro = req.query.vaitro;
    const order = req.query.order;
    const limit = Number(req.query.limit);

    if (masv) {
        db.query("SELECT * FROM nhom where masv = ?", masv, (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send(result);
        });
    } else if (manhom && vaitro) {
        db.query("SELECT * FROM nhom where manhom = ? and vaitro = ?", [manhom, vaitro], (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send(result);
        });
    }
    else if (order && limit) {
        if (order.toLowerCase() === "asc") {
            db.query("SELECT * FROM nhom ORDER BY manhom ASC limit ?", limit, (err, result) => {
                if (err) {
                    console.log(err);
                }
                res.send(result);
            });
        } else {
            db.query("SELECT * FROM nhom ORDER BY manhom DESC limit ?", limit, (err, result) => {
                if (err) {
                    console.log(err);
                }
                res.send(result);
            });
        }
    } else {
        db.query("SELECT * FROM nhom", (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send(result);
        });
    }
});

app.post("/api/nhom", (req, res) => {
    const manhom = req.body.manhom;
    const masv = req.body.masv;
    const tensv = req.body.tensv;
    const vaitro = req.body.vaitro;

    db.query("INSERT INTO nhom (manhom, masv, tensv, vaitro) VALUES(?,?,?,?)", [manhom, masv, tensv, vaitro], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});

app.delete("/api/nhom/:manhom", (req, res) => {
    const manhom = req.params.manhom;
    db.query("DELETE FROM nhom where manhom = ?", manhom, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});

// Giảng viên
app.get("/api/giangvien", (req, res) => {
    const magv = req.query.magv;
    if (magv) {
        if (Array.isArray(magv)) {
            db.query("SELECT magv, tengv, DATE_FORMAT(ngaysinh, '%Y-%m-%d') as 'ngaysinh', gioitinh, khoa, diachi FROM giangvien where magv not in (?)", [magv], (err, result) => {
                if (err) {
                    console.log(err);
                }
                res.send(result);
            });
        } else if (magv.startsWith('!')) {
            db.query("SELECT magv, tengv, DATE_FORMAT(ngaysinh, '%Y-%m-%d') as 'ngaysinh', gioitinh, khoa, diachi FROM giangvien where magv <> ?", magv.slice(1, magv.length), (err, result) => {
                if (err) {
                    console.log(err);
                }
                res.send(result);
            });
        } else {
            db.query("SELECT magv, tengv, DATE_FORMAT(ngaysinh, '%Y-%m-%d') as 'ngaysinh', gioitinh, khoa, diachi FROM giangvien where magv = ?", magv, (err, result) => {
                if (err) {
                    console.log(err);
                }
                res.send(result);
            });
        }
    } else {
        db.query("SELECT magv, tengv, DATE_FORMAT(ngaysinh, '%Y-%m-%d') as 'ngaysinh', gioitinh, khoa, diachi FROM giangvien", (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send(result);
        });
    }
});

app.put("/api/giangvien/:magv", (req, res) => {
    const magv = req.params.magv;
    const ngaysinh = req.body.ngaysinh;
    const gioitinh = req.body.gioitinh;
    const khoa = req.body.khoa;
    const diachi = req.body.diachi;

    db.query("UPDATE giangvien SET ngaysinh = ?, gioitinh = ?, khoa = ?, diachi = ? where magv = ?", [ngaysinh, gioitinh, khoa, diachi, magv], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});

// Đề tài
app.get("/api/detai", (req, res) => {
    const manhom = req.query.manhom;
    const magvhd = req.query.magvhd;
    const order = req.query.order;
    const limit = Number(req.query.limit);
    const trangthai = req.query.trangthai;
    const madt = req.query.madt;
    const decuong = req.query.decuong;

    if (manhom) {
        db.query("SELECT * FROM detai where manhom = ?", manhom, (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send(result);
        });
    } else if (magvhd) {
        db.query("SELECT * FROM detai where magvhd = ?", magvhd, (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send(result);
        });
    } else if (trangthai) {
        db.query("SELECT * FROM detai where trangthai = ?", trangthai, (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send(result);
        });
    } else if (decuong && madt) {
        db.query("SELECT * FROM detai where decuong is not null and decuong <> '' and madt not in (?)", [madt], (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send(result);
        });
    } else if (decuong) {
        db.query("SELECT * FROM detai where decuong is not null and decuong <> ''", (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send(result);
        });
    } else if (madt) {
        if(Array.isArray(madt)) {
            db.query("SELECT * FROM detai where madt in (?)", [madt], (err, result) => {
                if (err) {
                    console.log(err);
                }
                res.send(result);
            });
        } else {
            db.query("SELECT * FROM detai where madt = ?", madt, (err, result) => {
                if (err) {
                    console.log(err);
                }
                res.send(result);
            });
        }
    } else if (order && limit) {
        if (order.toLowerCase() === "asc") {
            db.query("SELECT * FROM detai ORDER BY madt ASC limit ?", limit, (err, result) => {
                if (err) {
                    console.log(err);
                }
                res.send(result);
            });
        } else {
            db.query("SELECT * FROM detai ORDER BY madt DESC limit ?", limit, (err, result) => {
                if (err) {
                    console.log(err);
                }
                res.send(result);
            });
        }
    } else {
        db.query("SELECT * FROM detai", (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send(result);
        });
    }
});

app.put("/api/detai/:madt", (req, res) => {
    const decuong = req.body.decuong;
    const trangthai = req.body.trangthai;
    const madt = req.params.madt;

    if(decuong) {
        db.query("UPDATE detai SET decuong = ? where madt = ?", [decuong, madt], (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send(result);
        });
    } else {
        db.query("UPDATE detai SET trangthai = ? where madt = ?", [trangthai, madt], (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send(result);
        });
    }
});

app.post("/api/detai", (req, res) => {
    const madt = req.body.madt;
    const tendt = req.body.tendt;
    const machunhiem = req.body.machunhiem;
    const tenchunhiem = req.body.tenchunhiem;
    const manhom = req.body.manhom;
    const magvhd = req.body.magvhd;
    const tengvhd = req.body.tengvhd;

    db.query("INSERT INTO detai (madt, tendt, machunhiem, tenchunhiem, manhom, magvhd, tengvhd) VALUES(?,?,?,?,?,?,?)", [madt, tendt, machunhiem, tenchunhiem, manhom, magvhd, tengvhd], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});

// Kết quả
app.get("/api/ketqua", (req, res) => {
    const manhom = req.query.manhom;
    const magvcham = req.query.magvcham;
    const diem = req.query.diem;
    const madt = req.query.madt;

    if (madt) {
        db.query("SELECT * FROM ketqua where madt = ?", madt, (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send(result);
        });
    } else if (manhom) {
        db.query("SELECT * FROM ketqua where manhom = ?", manhom, (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send(result);
        });
    } else if (magvcham && diem) {
        if(diem === "null") {
            db.query("SELECT * FROM ketqua where magvcham = ? and diem is null", magvcham, (err, result) => {
                if (err) {
                    console.log(err);
                }
                res.send(result);
            });
        } else {
            db.query("SELECT * FROM ketqua where magvcham = ? and diem is not null", magvcham, (err, result) => {
                if (err) {
                    console.log(err);
                }
                res.send(result);
            });
        }
    } else if (magvcham) {
        db.query("SELECT * FROM ketqua where magvcham = ?", magvcham, (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send(result);
        });
    } else {
        db.query("SELECT * FROM ketqua", (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send(result);
        });
    }
});

app.put("/api/ketqua/:madt", (req, res) => {
    const diem = req.body.diem;
    const danhgia = req.body.danhgia;
    const madt = req.params.madt;

    db.query("UPDATE ketqua SET diem = ?, danhgia = ? where madt = ?", [diem, danhgia, madt], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});

app.post("/api/ketqua", (req, res) => {
    const madt = req.body.madt;
    const tendt = req.body.tendt;
    const manhom = req.body.manhom;
    const tenchunhiem = req.body.tenchunhiem;
    const magvcham = req.body.magvcham;
    const tengvcham = req.body.tengvcham;

    db.query("INSERT INTO ketqua (madt, tendt, manhom, tenchunhiem, magvcham, tengvcham) VALUES(?,?,?,?,?,?)", [madt, tendt, manhom, tenchunhiem , magvcham, tengvcham], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;