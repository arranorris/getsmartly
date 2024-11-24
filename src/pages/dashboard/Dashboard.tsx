import { Routes, Route } from 'react-router-dom';
import DashboardHome from './DashboardHome';
import Robots from './Robots';
import Settings from './Settings';
import DashboardLayout from '../../components/DashboardLayout';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<DashboardHome />} />
        <Route path="robots" element={<Robots />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </DashboardLayout>
  );
}