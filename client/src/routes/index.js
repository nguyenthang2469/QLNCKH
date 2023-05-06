import { StudentLayout, TeacherLayout, AdminLayout } from '~/components/Layout';
import Login from '~/pages/Login';
import Home from '~/pages/Student/Home';
import Profile from '~/pages/Student/Profile';
import DangKyDeTai from '~/pages/Student/DangKyDeTai';
import TrangThaiDeTai from '~/pages/Student/TrangThaiDeTai';
import KetQuaDeTai from '~/pages/Student/KetQuaDeTai';

import AdminHome from '~/pages/Admin/AdminHome';
import AdminProfile from '~/pages/Admin/AdminProfile';
import PhanCongDeTai from '~/pages/Admin/PhanCongDeTai';
import PhancongGV from '~/pages/Admin/PhanCongGV';
import DanhSachGiangVien from '~/pages/Admin/DanhSachGiangVien';
import DanhSachDeTai from '~/pages/Admin/DanhSachDeTai';
import DanhSachSinhVien from '~/pages/Admin/DanhSachSinhVien';

import TeacherHome from '~/pages/Teacher/TeacherHome';
import TeacherProfile from '~/pages/Teacher/TeacherProfile';
import ChamDeTai from '~/pages/Teacher/ChamDeTai';
import TeacherKetQuaDeTai from '~/pages/Teacher/TeacherKetQuaDeTai';
import TeacherTrangThaiDeTai from '~/pages/Teacher/TeacherTrangThaiDeTai';
import KetQuaCham from '~/pages/Teacher/KetQuaCham';
import AdminKetQuaDeTai from '~/pages/Admin/AdminKetQuaDeTai';

const publicRoutes = [
    { title: 'Đăng nhập', path: '/', component: Login, layout: null }
];

const privateRoutes = [
    { title: 'Trang chủ', path: '/', component: Home, layout: StudentLayout },
    { title: 'Trang cá nhân', path: '/profile', component: Profile, layout: StudentLayout },
    { title: 'Đăng ký đề tài', path: '/dangkydetai', component: DangKyDeTai, layout: StudentLayout },
    { title: 'Trạng thái đề tài', path: '/trangthaidetai', component: TrangThaiDeTai, layout: StudentLayout },
    { title: 'Kết quả đề tài', path: '/ketquadetai', component: KetQuaDeTai, layout: StudentLayout },

    { title: 'Trang chủ', path: '/teacher', component: TeacherHome, layout: TeacherLayout },
    { title: 'Trang cá nhân', path: '/teacher/profile', component: TeacherProfile, layout: TeacherLayout },
    { title: 'Trạng thái đề tài', path: '/teacher/trangthaidetai', component: TeacherTrangThaiDeTai, layout: TeacherLayout },
    { title: 'Chấm điểm đề tài', path: '/teacher/chamdetai', component: ChamDeTai, layout: TeacherLayout },
    { title: 'Kết quả đề tài hướng dẫn', path: '/teacher/ketquadetai', component: TeacherKetQuaDeTai, layout: TeacherLayout },
    { title: 'Kết quả đã chấm', path: '/teacher/ketquacham', component: KetQuaCham, layout: TeacherLayout },

    { title: 'Trang chủ', path: '/admin', component: AdminHome, layout: AdminLayout },
    { title: 'Trang cá nhân', path: '/admin/profile', component: AdminProfile, layout: AdminLayout },
    { title: 'Danh sách đề tài', path: '/admin/detai', component: DanhSachDeTai, layout: AdminLayout },
    { title: 'Phân công đề tài', path: '/admin/phancongdetai', component: PhanCongDeTai, layout: AdminLayout },
    { title: 'Kết quả đề tài', path: '/admin/ketquadetai', component: AdminKetQuaDeTai, layout: AdminLayout },
    { title: 'Phân công giáo viên chấm đề tài', path: '/admin/gvdetai', component: PhancongGV, layout: AdminLayout },
    { title: 'Danh sách giảng viên', path: '/admin/dsgiangvien', component: DanhSachGiangVien, layout: AdminLayout },
    { title: 'Danh sách sinh viên', path: '/admin/dssinhvien', component: DanhSachSinhVien, layout: AdminLayout },
];

export {
    publicRoutes,
    privateRoutes
};