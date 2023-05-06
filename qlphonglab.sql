DROP DATABASE IF EXISTS `qlnckh`;

CREATE DATABASE IF NOT EXISTS `qlnckh`;
USE `qlnckh`;

CREATE TABLE `account` (
  `taikhoan` varchar(50) NOT NULL,
  `matkhau` varchar(50) NOT NULL,
  `hoten` varchar(50) NOT NULL,
  `quyen` varchar(50) NOT NULL,
  CONSTRAINT PK_account PRIMARY KEY (`taikhoan`)
);

CREATE TABLE `sinhvien` (
  `masv` varchar(30) NOT NULL,
  `tensv` varchar(50) NOT NULL,
  `ngaysinh` date DEFAULT NULL,
  `gioitinh` int DEFAULT 0,
  `lop` varchar(30) DEFAULT NULL,
  `khoa` varchar(30) DEFAULT NULL,
  `diachi` varchar(30) DEFAULT NULL,
  CONSTRAINT PK_sinhvien PRIMARY KEY (`masv`)
);

CREATE TABLE `giangvien` (
  `magv` varchar(30) NOT NULL,
  `tengv` varchar(50) NOT NULL,
  `ngaysinh` DATE DEFAULT NULL,
  `gioitinh` int DEFAULT 0,
  `khoa` varchar(30) DEFAULT NULL,
  `diachi` varchar(30) DEFAULT NULL,
  CONSTRAINT PK_giangvien PRIMARY KEY (`magv`)
);

CREATE TABLE `nhom` (
  `manhom` varchar(30) NOT NULL,
  `masv` varchar(30) NOT NULL,
  `tensv` varchar(50) NOT NULL,
  `vaitro` varchar(20) NOT NULL,
  CONSTRAINT PK_nhom PRIMARY KEY (`manhom`, `masv`),
  CONSTRAINT FK_nhom_sinhvien FOREIGN KEY (`masv`) REFERENCES sinhvien(`masv`)
);

CREATE TABLE `detai` (
  `madt` varchar(30) NOT NULL,
  `tendt` varchar(255) NOT NULL,
  `machunhiem` varchar(30) NOT NULL,
  `tenchunhiem` varchar(50) NOT NULL,
  `manhom` varchar(30) NOT NULL,
  `magvhd` varchar(30) NOT NULL,
  `tengvhd` varchar(50) NOT NULL,
  `trangthai` varchar(20) NOT NULL DEFAULT 'Đang chờ duyệt',
  `decuong` varchar(255) DEFAULT NULL,
  CONSTRAINT PK_detai PRIMARY KEY (`madt`),
  CONSTRAINT FK_detai_nhom FOREIGN KEY (`manhom`) REFERENCES nhom(`manhom`) ON DELETE CASCADE,
  CONSTRAINT FK_detai_giangvien FOREIGN KEY (`magvhd`) REFERENCES giangvien(`magv`)
);

CREATE TABLE `ketqua` (
  `madt` varchar(30) NOT NULL,
  `tendt` varchar(255) NOT NULL,
  `manhom` varchar(30) NOT NULL,
  `tenchunhiem` varchar(50) NOT NULL,
  `magvcham` varchar(30) DEFAULT NULL,
  `tengvcham` varchar(50) DEFAULT NULL,
  `diem` decimal(4,2) DEFAULT NULL,
  `danhgia` text DEFAULT NULL,
  CONSTRAINT PK_ketqua PRIMARY KEY (`madt`),
  CONSTRAINT FK_ketqua_detai FOREIGN KEY (`madt`) REFERENCES detai(`madt`) ON DELETE CASCADE,
  CONSTRAINT FK_ketqua_nhom FOREIGN KEY (`manhom`) REFERENCES nhom(`manhom`) ON DELETE CASCADE,
  CONSTRAINT FK_ketqua_giangvien FOREIGN KEY (`magvcham`) REFERENCES giangvien(`magv`)
);

-- Chèn dữ liệu
INSERT INTO `account` VALUES
  ('sv001', 'sv123456', 'Đàm Văn Anh', 'sinhvien'),
  ('sv003', 'sv123456', 'Nguyễn Khắc Anh', 'sinhvien'),
  ('sv006', 'sv123456', 'Nguyễn Thị Diệu', 'sinhvien'),
  ('sv009', 'sv123456', 'Nguyễn Văn Đức', 'sinhvien'),
  ('sv012', 'sv123456', 'Hoàng Thị Thùy Dương', 'sinhvien'),
  ('sv013', 'sv123456', 'Trần Quang Hải', 'sinhvien'),
  ('sv016', 'sv123456', 'Nguyễn Văn Hòa', 'sinhvien'),
  ('sv022', 'sv123456', 'Nguyễn Trường Huy', 'sinhvien'),
  ('sv029', 'sv123456', 'Nguyễn Trọng Minh', 'sinhvien'),
  ('sv033', 'sv123456', 'Phạm Thảo Nguyên', 'sinhvien'),
  ('sv048', 'sv123456', 'Trần Mạnh Toàn', 'sinhvien'),
  ('sv034', 'sv123456', 'Đoàn Trọng Nhất', 'sinhvien'),
  ('sv052', 'sv123456', 'Lê Thành Trung', 'sinhvien'),
  ('sv053', 'sv123456', 'Lê Tràng Trung', 'sinhvien'),
  ('gv002', 'gv123456', 'Phan Bách An', 'giangvien'),
  ('gv004', 'gv123456', 'Trần Hoài An', 'giangvien'),
  ('gv005', 'gv123456', 'Hoàng Tùng Anh', 'giangvien'),
  ('gv009', 'gv123456', 'Lưu Mỹ Anh', 'giangvien'),
  ('gv014', 'gv123456', 'Lê Gia Bảo', 'giangvien'),
  ('gv017', 'gv123456', 'Lê Thị Hiếu', 'giangvien'),
  ('gv022', 'gv123456', 'Nguyễn Minh Châu', 'giangvien'),
  ('gv029', 'gv123456', 'Bùi Văn Tân', 'giangvien'),
  ('gv030', 'gv123456', 'Lê Ánh Dương', 'giangvien'),
  ('gv033', 'gv123456', 'Phan Văn Dương', 'giangvien'),
  ('gv034', 'gv123456', 'Phạm Công Đại', 'giangvien'),
  ('gv035', 'gv123456', 'Trần Thị Lan Anh', 'giangvien'),
  ('qtv001', 'qtv123456', 'Nguyễn Đức Đại', 'quantrivien'),
  ('qtv002', 'qtv123456', 'Vũ Thị Thanh Hằng', 'quantrivien'),
  ('qtv003', 'qtv123456', 'Nguyễn Hoàng chiến', 'quantrivien');

INSERT INTO `sinhvien` VALUES 
  ('sv001', 'Đàm Văn Anh', '2002-04-09', 0, 'DHTI14A12HN', 'CNTT', 'Vĩnh Phúc'),
  ('sv002', 'Lô Quang Anh', '2002-08-06', 0, 'DHTI14A12HN', 'CNTT', 'Quảng Ninh'),
  ('sv003', 'Nguyễn Khắc Anh', '2002-11-27', 0, 'DHTI14A12HN', 'CNTT', 'Hà Nội'),
  ('sv004', 'Bùi Thọ Đăng', '2002-04-03', 0, 'DHTI14A12HN', 'CNTT', 'Ninh Bình'),
  ('sv005', 'Vũ Thành Đạt', '2002-09-08', 0, 'DHTI14A2HN', 'CNTT', 'Hà Nam'),
  ('sv006', 'Nguyễn Thị Diệu', '2002-04-22', 1, 'DHTI14A12HN', 'CNTT', 'Vĩnh Phúc'),
  ('sv007', 'Phạm Hữu Đồng', '2002-08-25', 0, 'DHTI14A12HN', 'CNTT', 'Hà Nam'),
  ('sv008', 'Nguyễn Quang Đức', '2002-11-11', 0, 'DHTI15A12HN', 'CNTT', 'Hà Nam'),
  ('sv009', 'Nguyễn Văn Đức', '2002-12-06', 0, 'DHTI14A12HN', 'CNTT', 'Ninh Bình'),
  ('sv010', 'Vương Tiến Dũng', '2002-05-13', 0, 'DHTI14A12HN', 'CNTT', 'Hải Dương'),
  ('sv011', 'Bùi Minh Dương', '2002-07-24', 0, 'DHTI14A12HN', 'CNTT', 'Ninh Bình'),
  ('sv012', 'Hoàng Thị Thùy Dương', '2002-09-06', 1, 'DHTI14A12HN', 'CNTT', 'Thái Bình'),
  ('sv013', 'Trần Quang Hải', '2002-05-23', 0, 'DHTI14A12HN', 'CNTT', 'Hưng Yên'),
  ('sv014', 'Đoàn Sông Hào', '2002-11-15', 0, 'DHTI14A11HN', 'CNTT', 'Bắc Ninh'),
  ('sv015', 'Nguyễn Văn Hào', '2002-02-18', 0, 'DHTI14A12HN', 'CNTT', 'Vĩnh Phúc'),
  ('sv016', 'Nguyễn Văn Hòa', '2002-11-13', 0, 'DHTI14A12HN', 'CNTT', 'Thái Bình'),
  ('sv017', 'Nguyễn Đức Hoàng', '2002-09-19', 0, 'DHTI14A12HN', 'CNTT', 'Ninh Bình'),
  ('sv018', 'Bùi Tuấn Hưng', '2002-05-22', 0, 'DHTI14A12HN', 'CNTT', 'Hải Phòng'),
  ('sv019', 'Trần Duy Hưng', '2002-08-31', 0, 'DHTI14A12HN', 'CNTT', 'Hải Phòng'),
  ('sv020', 'Đỗ Công Hướng', '2002-03-12', 0, 'DHTI14A12HN', 'CNTT', 'Quảng Ninh'),
  ('sv021', 'Nguyễn Thị Hường', '2002-05-10', 1, 'DHTI14A12HN', 'CNTT', 'Hải Dương'),
  ('sv022', 'Nguyễn Trường Huy', '2002-09-06', 0, 'DHTI14A12HN', 'CNTT', 'Hải Phòng'),
  ('sv023', 'Phạm Thị Thanh Huyền', '2002-03-09', 1, 'DHTI14A12HN', 'CNTT', 'Hải Dương'),
  ('sv024', 'Lại Nhân Khuê', '2002-07-11', 0, 'DHTI14A12HN', 'CNTT', 'Nam Định'),
  ('sv025', 'Nguyễn Trung Kiên', '2002-09-06', 0, 'DHTI14A12HN', 'CNTT', 'Bắc Ninh'),
  ('sv026', 'Nguyễn Đức Mạnh', '2002-01-02', 0, 'DHTI14A12HN', 'CNTT', 'Nam Định'),
  ('sv027', 'Trần Quang Mạnh', '2002-10-18', 0, 'DHTI14A12HN', 'CNTT', 'Vĩnh Phúc'),
  ('sv028', 'Lê Anh Minh', '2002-11-22', 0, 'DHTI14A12HN', 'CNTT', 'Thái Bình'),
  ('sv029', 'Nguyễn Trọng Minh', '2002-09-19', 0, 'DHTI14A12HN', 'CNTT', 'Hải Phòng'),
  ('sv030', 'Lại Thị Yến My', '2002-06-14', 1, 'DHTI14A12HN', 'CNTT', 'Vĩnh Phúc'),
  ('sv031', 'Nguyễn Văn Nam', '2002-11-12', 0, 'DHTI14A12HN', 'CNTT', 'Hải Dương'),
  ('sv032', 'Hoàng Xuân Ngọc', '2002-11-19', 0, 'DHTI14A12HN', 'CNTT', 'Hưng Yên'),
  ('sv033', 'Phạm Thảo Nguyên', '2002-03-03', 1, 'DHTI14A12HN', 'CNTT', 'Hải Dương'),
  ('sv034', 'Đoàn Trọng Nhất', '2002-08-28', 0, 'DHTI14A12HN', 'CNTT', 'Hà Nam'),
  ('sv035', 'Phạm Văn Phong', '2002-03-28', 0, 'DHTI14A12HN', 'CNTT', 'Ninh Bình'),
  ('sv036', 'Nguyễn Đức Phương', '2002-11-10', 0, 'DHTI14A12HN', 'CNTT', 'Hà Nội'),
  ('sv037', 'Nguyễn Minh Phương', '2002-11-12', 0, 'DHTI14A12HN', 'CNTT', 'Hưng Yên'),
  ('sv038', 'Phạm Đình Quân', '2002-06-14', 0, 'DHTI14A12HN', 'CNTT', 'Ninh Bình'),
  ('sv039', 'Khuất Hoàng Sơn', '2002-04-20', 0, 'DHTI14A12HN', 'CNTT', 'Hải Phòng'),
  ('sv040', 'Nguyễn Văn Sơn', '2002-10-19', 0, 'DHTI14A12HN', 'CNTT', 'Thái Bình'),
  ('sv041', 'Phan Thanh Tâm', '2002-01-05', 0, 'DHTI14A12HN', 'CNTT', 'Nam Định'),
  ('sv042', 'Nguyễn Thiện Thắng', '2002-10-25', 0, 'DHTI14A12HN', 'CNTT', 'Quảng Ninh'),
  ('sv043', 'Lê Duy Thành', '2002-10-20', 0, 'DHTI14A12HN', 'CNTT', 'Quảng Ninh'),
  ('sv044', 'Nguyễn Văn Thành', '2002-12-04', 0, 'DHTI14A12HN', 'CNTT', 'Thái Bình'),
  ('sv045', 'Nguyễn Công Thế', '2002-08-06', 0, 'DHTI14A12HN', 'CNTT', 'Hải Phòng'),
  ('sv046', 'Nguyễn Thị Thuyên', '2002-09-07', 1, 'DHTI14A12HN', 'CNTT', 'Hải Phòng'),
  ('sv047', 'Nguyễn Phi Tiến', '2002-03-13', 0, 'DHTI14A12HN', 'CNTT', 'Hải Dương'),
  ('sv048', 'Trần Mạnh Toàn', '2002-06-24', 0, 'DHTI14A12HN', 'CNTT', 'Hải Phòng'),
  ('sv049', 'Bùi Thị Huyền Trang', '2002-04-20', 1, 'DHTI14A12HN', 'CNTT', 'Hải Phòng'),
  ('sv050', 'Vũ Thị Ánh Trinh', '2002-04-03', 1, 'DHTI14A12HN', 'CNTT', 'Hà Nam'),
  ('sv051', 'Dương Văn Trung', '2002-05-08', 0, 'DHTI14A12HN', 'CNTT', 'Bắc Ninh'),
  ('sv052', 'Lê Thành Trung', '2002-12-25', 0, 'DHTI14A12HN', 'CNTT', 'Nam Định'),
  ('sv053', 'Lê Tràng Trung', '2002-01-09', 0, 'DHTI14A12HN', 'CNTT', 'Bắc Ninh'),
  ('sv054', 'Nguyễn Anh Tú', '2002-04-07', 0, 'DHTI14A12HN', 'CNTT', 'Hà Nam'),
  ('sv055', 'Đinh Thị Hồng Tươi', '2002-09-28', 1, 'DHTI14A12HN', 'CNTT', 'Hải Dương'),
  ('sv056', 'Nguyễn Tiến Việt', '2002-04-20', 0, 'DHTI14A12HN', 'CNTT', 'Hải Phòng'),
  ('sv057', 'Nguyễn Đình Vũ', '2002-07-11', 0, 'DHTI14A12HN', 'CNTT', 'Nam Định'),
  ('sv058', 'Trần Việt An', '2002-07-22', 0, 'DHTI14A12HN', 'CNTT', 'Nam Định');
  
INSERT INTO `giangvien` VALUES
  ('gv001', 'Hoàng Bảo An', '1983-04-07', 1, 'CNTT', 'Bắc Ninh'),
  ('gv002', 'Phan Bách An', '1978-05-06', 0, 'CNTT', 'Hưng Yên'),
  ('gv003', 'Phan Thành An', '1983-08-22', 0, 'CNTT', 'Hải Dương'),
  ('gv004', 'Trần Hoài An', '1982-01-26', 1, 'CNTT', 'Quảng Ninh'),
  ('gv005', 'Hoàng Tùng Anh', '1992-09-21', 0, 'CNTT', 'Hải Phòng'),
  ('gv006', 'Lê Minh Anh', '1988-07-24', 1, 'CNTT', 'Hải Dương'),
  ('gv007', 'Lê Phương Tuệ Anh', '1983-07-22', 1, 'CNTT', 'Quảng Ninh'),
  ('gv008', 'Lê Thuỳ Anh', '1986-01-12', 1, 'CNTT', 'Thái Bình'),
  ('gv009', 'Lưu Mỹ Anh', '1975-11-13', 1, 'CNTT', 'Ninh Bình'),
  ('gv010', 'Phan Lương Anh', '1982-12-06', 1, 'CNTT', 'Ninh Bình'),
  ('gv011', 'Phan Quang Anh', '1979-11-07', 0, 'CNTT', 'Hải Dương'),
  ('gv012', 'Vũ Vân Anh', '1981-06-30', 1, 'CNTT', 'Hưng Yên'),
  ('gv013', 'Lê Thiên Ân', '1982-12-03', 1, 'CNTT', 'Hà Nam'),
  ('gv014', 'Lê Gia Bảo', '1971-06-14', 0, 'CNTT', 'Hải Dương'),
  ('gv015', 'Lê Thị Mừng', '1979-01-21', 1, 'CNTT', 'Hải Phòng'),
  ('gv016', 'Trần Ngọc Bích', '1982-06-14', 1, 'CNTT', 'Ninh Bình'),
  ('gv017', 'Lê Thị Hiếu', '1986-08-01', 1, 'CNTT', 'Hải Dương'),
  ('gv018', 'Lê Đức Bình', '1993-09-23', 0, 'CNTT', 'Nam Định'),
  ('gv019', 'Hoàng Chí Công', '1973-11-14', 0, 'CNTT', 'Hưng Yên'),
  ('gv020', 'Lê Thành Công', '1979-01-05', 0, 'CNTT', 'Hưng Yên'),
  ('gv021', 'Lê Thị Thu Hiền', '1984-11-03', 1, 'CNTT', 'Vĩnh Phúc'),
  ('gv022', 'Nguyễn Minh Châu', '1975-03-25', 1, 'CNTT', 'Hưng Yên'),
  ('gv023', 'Hoàng Thị Phượng', '1990-10-19', 1, 'CNTT', 'Hà Nam'),
  ('gv024', 'Bùi Minh Chi', '1985-12-08', 1, 'CNTT', 'Hưng Yên'),
  ('gv025', 'Vũ Văn Đốc', '1983-05-24', 0, 'CNTT', 'Vĩnh Phúc'),
  ('gv026', 'Lê Mạnh Chiến', '1991-01-10', 0, 'CNTT', 'Nam Định'),
  ('gv027', 'Lê Thụy Du', '1991-04-16', 0, 'CNTT', 'Thái Bình'),
  ('gv028', 'Lê Anh Dũng', '1993-12-23', 0, 'CNTT', 'Vĩnh Phúc'),
  ('gv029', 'Bùi Văn Tân', '1984-09-10', 0, 'CNTT', 'Hưng Yên'),
  ('gv030', 'Lê Ánh Dương', '1975-03-11', 0, 'CNTT', 'Hà Nam'),
  ('gv031', 'Lê Thái Dương', '1978-08-12', 0, 'CNTT', 'Thái Bình'),
  ('gv032', 'Nguyễn Thị Hiền', '1983-02-18', 1, 'CNTT', 'Hải Phòng'),
  ('gv033', 'Phan Văn Dương', '1978-04-11', 0, 'CNTT', 'Vĩnh Phúc'),
  ('gv034', 'Phạm Công Đại', '1973-11-20', 0, 'CNTT', 'Bắc Ninh'),
  ('gv035', 'Trần Thị Lan Anh', '1979-08-09', 1, 'CNTT', 'Hải Phòng');
    
INSERT INTO `nhom` VALUES
  ('nc1', 'sv001', 'Đàm Văn Anh', 'Chủ nhiệm'),
  ('nc1', 'sv004', 'Bùi Thọ Đăng', 'Thành viên'),
  ('nc1', 'sv003', 'Nguyễn Khắc Anh', 'Thành viên'),
  ('nc1', 'sv007', 'Phạm Hữu Đồng', 'Thành viên'),
  ('nc2', 'sv009', 'Nguyễn Văn Đức', 'Chủ nhiệm'),
  ('nc2', 'sv002', 'Lô Quang Anh', 'Thành viên'),
  ('nc2', 'sv006', 'Nguyễn Thị Diệu', 'Thành viên'),
  ('nc3', 'sv012', 'Hoàng Thị Thùy Dương', 'Chủ nhiệm'),
  ('nc3', 'sv013', 'Trần Quang Hải', 'Thành viên'),
  ('nc4', 'sv016', 'Nguyễn Văn Hòa', 'Chủ nhiệm'),
  ('nc4', 'sv022', 'Nguyễn Trường Huy', 'Thành viên'),
  ('nc4', 'sv018', 'Bùi Tuấn Hưng', 'Thành viên'),
  ('nc5', 'sv033', 'Phạm Thảo Nguyên', 'Chủ nhiệm'),
  ('nc5', 'sv045', 'Nguyễn Công Thế', 'Thành viên'),
  ('nc5', 'sv038', 'Phạm Đình Quân', 'Thành viên'),
  ('nc5', 'sv041', 'Phan Thanh Tâm', 'Thành viên'),
  ('nc6', 'sv029', 'Nguyễn Trọng Minh', 'Chủ nhiệm'),
  ('nc6', 'sv027', 'Trần Quang Mạnh', 'Thành viên'),
  ('nc6', 'sv011', 'Bùi Minh Dương', 'Thành viên'),
  ('nc6', 'sv040', 'Nguyễn Văn Sơn', 'Thành viên'),
  ('nc6', 'sv048', 'Trần Mạnh Toàn', 'Thành viên'),
  ('nc7', 'sv034', 'Đoàn Trọng Nhất', 'Chủ nhiệm');
    
INSERT INTO `detai` VALUES
  ('dt1', 'Xây dựng phần mềm quản lý quán cà phê', 'sv001', 'Đàm Văn Anh', 'nc1', 'gv005', 'Hoàng Tùng Anh', 'Đã duyệt', 'Đề cương Xây dựng phần mềm quản lý quán cà phê.docx'),
  ('dt2', 'Xây dựng ứng dụng bán hàng thời trang', 'sv009', 'Nguyễn Văn Đức', 'nc2', 'gv002', 'Phan Bách An', 'Đã duyệt', 'Mục lục Xây dựng ứng dụng bán hàng thời trang.docx'),
  ('dt3', 'Phân tích, thiết kế và cài đặt phần mềm quản lý khách sạn', 'sv012', 'Hoàng Thị Thùy Dương', 'nc3', 'gv014', 'Lê Gia Bảo', 'Đã duyệt', 'Đề cương Phân tích, thiết kế và cài đặt phần mềm quản lý khách sạn.docx'),
  ('dt4', 'Ứng dụng C# lập trình Game ', 'sv016', 'Nguyễn Văn Hòa', 'nc4', 'gv029', 'Bùi Văn Tân', 'Đã duyệt', null),
  ('dt5', 'Lập trình mô phỏng bằng Unity', 'sv033', 'Phạm Thảo Nguyên', 'nc5', 'gv022', 'Nguyễn Minh Châu', 'Đã duyệt', null),
  ('dt6', 'Xây dựng Website cho một phòng Lab', 'sv029', 'Nguyễn Trọng Minh', 'nc6', 'gv017', 'Lê Thị Hiếu', 'Đang chờ duyệt', null),
  ('dt7', 'Xây dựng phần mềm quản lý thư viện', 'sv034', 'Đoàn Trọng Nhất', 'nc7', 'gv009', 'Lưu Mỹ Anh', 'Đang chờ duyệt', null);

INSERT INTO `ketqua` VALUES
  ('dt1', 'Xây dựng phần mềm quản lý quán cà phê', 'nc1', 'Đàm Văn Anh', 'gv004', 'Trần Hoài An', 8.5, 'Xây dựng phần mềm quản lý quán cà phê là một đề tài mang tính ứng dụng cao và có thể giúp các chủ quán cà phê dễ dàng quản lý và điều hành quán của mình một cách hiệu quả. Tuy nhiên, việc đánh giá đề tài này không thể chỉ dựa trên một phương diện duy nhất, mà phải xem xét tổng thể các yếu tố như tính năng, giao diện, hiệu suất, độ tin cậy và tính bảo mật. Về ưu điểm, phần mềm quản lý quán cà phê cung cấp các tính năng quản lý thực đơn, đặt hàng, quản lý kho hàng, quản lý tài chính, giúp các chủ quán cà phê dễ dàng quản lý và điều hành quán của mình. Ngoài ra, phần mềm có tính linh hoạt, có thể được tùy chỉnh để phù hợp với các nhu cầu cụ thể của quán cà phê. Đặc biệt, phần mềm quản lý quán cà phê giúp tiết kiệm thời gian và công sức trong việc quản lý và điều hành quán, giúp chủ quán tập trung vào việc cải thiện chất lượng dịch vụ và tăng doanh thu. Tuy nhiên, việc xây dựng phần mềm quản lý quán cà phê cũng có một số nhược điểm. Đầu tiên, nếu phần mềm không được thiết kế và triển khai đúng cách, nó có thể gây ra các lỗi hoặc sự cố kỹ thuật, gây ảnh hưởng đến hoạt động của quán cà phê. Thứ hai, việc xây dựng phần mềm tốn kém chi phí cho việc phát triển và triển khai phần mềm, đòi hỏi các chủ quán cà phê phải đầu tư một khoản chi phí lớn. Thứ ba, một số phần mềm có tính năng phức tạp, giao diện khó sử dụng hoặc không dễ hiểu, gây khó khăn cho người sử dụng.'),
  ('dt2', 'Xây dựng ứng dụng bán hàng thời trang', 'nc2', 'Nguyễn Văn Đức', 'gv030', 'Lê Ánh Dương', null, null);