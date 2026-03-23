import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Trash2, Shield, User, Edit, Save, X } from 'lucide-react';
import axios from 'axios';

import { IMAGE_BASE_URL } from '../data/constanturl';

const AdminManagePage = () => {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ username: '', password: '' });

  // Endpoint for admin management
  const ADMIN_API = `${IMAGE_BASE_URL}admins.php`;

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get(ADMIN_API);
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    if (!newAdmin.username || !newAdmin.password) return;

    setLoading(true);
    try {
      const response = await axios.post(ADMIN_API, newAdmin);
      console.log('Add admin response:', response.data);
      setNewAdmin({ username: '', password: '' });
      fetchAdmins();
      alert('Admin added successfully!');
    } catch (error) {
      console.error('Error adding admin:', error.response?.data || error.message);
      alert('Error adding admin: ' + (error.response?.data?.error || error.message));
    }
    setLoading(false);
  };

  const handleDeleteAdmin = async (id) => {
    if (!confirm('Delete this admin?')) return;
    try {
      await axios.post(`${IMAGE_BASE_URL}delete_admin.php`, { id: id });
      fetchAdmins();
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  const handleEditAdmin = (admin) => {
    setEditingId(admin.id);
    setEditData({ username: admin.username, password: '' });
  };

  const handleUpdateAdmin = async (id) => {
    try {
      await axios.post(`${IMAGE_BASE_URL}update_admin.php`, { id: id, ...editData });
      setEditingId(null);
      setEditData({ username: '', password: '' });
      fetchAdmins();
      alert('Admin updated successfully!');
    } catch (error) {
      console.error('Error updating admin:', error);
      alert('Error updating admin: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({ username: '', password: '' });
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-[#D4AF37] mb-2">Admin Management</h1>
          <p className="text-gray-400 font-sans">Manage administrator accounts</p>
        </motion.div>

        {/* Add New Admin Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#111111] p-6 rounded-2xl mb-8 border border-white/10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <UserPlus size={20} className="text-[#D4AF37]" />
            Add New Admin
          </h2>
          <p className="text-sm text-gray-400 mb-4 font-sans">New admin credentials will be saved to database and can be used to login</p>
          <form onSubmit={handleAddAdmin} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Username"
              value={newAdmin.username}
              onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
              className="bg-[#0A0A0A] border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#D4AF37]"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={newAdmin.password}
              onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
              className="bg-[#0A0A0A] border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#D4AF37]"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-bold hover:bg-white transition-all disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Admin'}
            </button>
          </form>
        </motion.div>

        {/* Admins Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#111111] p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Shield size={20} className="text-[#D4AF37]" />
            Admin Management Table
          </h2>

          {admins.length === 0 ? (
            <p className="text-gray-500 text-center py-8 font-sans">No admins found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-[#D4AF37] font-bold text-sm">ID</th>
                    <th className="text-left py-3 px-4 text-[#D4AF37] font-bold text-sm">USERNAME</th>
                    <th className="text-left py-3 px-4 text-[#D4AF37] font-bold text-sm">PASSWORD</th>
                    <th className="text-left py-3 px-4 text-[#D4AF37] font-bold text-sm">CREATED</th>
                    <th className="text-center py-3 px-4 text-[#D4AF37] font-bold text-sm">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin, index) => (
                    <tr key={`admin-${admin.id}-${index}`} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 text-gray-300">{admin.id}</td>
                      <td className="py-3 px-4">
                        {editingId === admin.id ? (
                          <input
                            type="text"
                            value={editData.username}
                            onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                            className="bg-[#0A0A0A] border border-white/10 rounded px-2 py-1 text-white text-sm w-full"
                          />
                        ) : (
                          <span className="text-white font-medium">{admin.username}</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {editingId === admin.id ? (
                          <input
                            type="password"
                            placeholder="New password"
                            value={editData.password}
                            onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                            className="bg-[#0A0A0A] border border-white/10 rounded px-2 py-1 text-white text-sm w-full"
                          />
                        ) : (
                          <span className="text-gray-500 text-sm">••••••••</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-400 text-sm">
                        {admin.created_at ? new Date(admin.created_at).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          {editingId === admin.id ? (
                            <>
                              <button
                                onClick={() => handleUpdateAdmin(admin.id)}
                                className="text-green-400 hover:text-green-300 p-1 rounded hover:bg-green-500/10 transition-all"
                                title="Save"
                              >
                                <Save size={16} />
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="text-gray-400 hover:text-gray-300 p-1 rounded hover:bg-gray-500/10 transition-all"
                                title="Cancel"
                              >
                                <X size={16} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEditAdmin(admin)}
                                className="text-blue-400 hover:text-blue-300 p-1 rounded hover:bg-blue-500/10 transition-all"
                                title="Edit"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteAdmin(admin.id)}
                                className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/10 transition-all"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminManagePage;