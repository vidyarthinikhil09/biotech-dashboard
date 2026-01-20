"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Users, DollarSign, Activity, TrendingUp, Search, Bell } from 'lucide-react';

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ total: 0, value: 0, active: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    fetchLeads();
  }, []);

  async function fetchLeads() {
    const { data, error } = await supabase.from('leads').select('*');
    if (data) {
      setLeads(data);
      const totalVal = data.reduce((acc, curr) => acc + curr.deal_value, 0);
      const activeLeads = data.filter(l => l.status !== 'Closed').length;
      setStats({ total: data.length, value: totalVal, active: activeLeads });
    }
  }

  if (!isClient) return <div className="flex items-center justify-center h-screen bg-slate-50 text-slate-400">Loading Dashboard...</div>;

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* SIDEBAR - Premium Dark Theme */}
      <aside className="w-72 bg-[#0f172a] text-white flex flex-col hidden md:flex shadow-2xl z-10">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">BioTech<span className="text-indigo-400">Flow</span></h1>
          </div>
          
          <nav className="space-y-2">
            <NavItem icon={<TrendingUp size={20} />} label="Dashboard" active />
            <NavItem icon={<Users size={20} />} label="Leads Pipeline" />
            <NavItem icon={<Activity size={20} />} label="Analytics" />
          </nav>
        </div>
        
        <div className="mt-auto p-8 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500"></div>
            <div>
              <p className="text-sm font-medium text-white">Dr. Admin</p>
              <p className="text-xs text-slate-400">Head of Sales</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT - Soft Gradient Background */}
      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 to-slate-100">
        
        {/* TOP HEADER */}
        <header className="flex justify-between items-center p-8 pb-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Sales Overview</h2>
            <p className="text-slate-500 mt-1">Welcome back, here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-full shadow-sm border border-slate-200 text-slate-500 hover:text-indigo-600 cursor-pointer transition">
              <Search size={20} />
            </div>
            <div className="bg-white p-2 rounded-full shadow-sm border border-slate-200 text-slate-500 hover:text-indigo-600 cursor-pointer transition">
              <Bell size={20} />
            </div>
          </div>
        </header>

        <div className="p-8 pt-4 space-y-8">
          
          {/* KPI CARDS - Floating Effect */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
              title="Total Pipeline" 
              value={`$${stats.value.toLocaleString()}`} 
              icon={<DollarSign className="text-emerald-600" size={24} />} 
              trend="+12% from last month"
              color="emerald"
            />
            <StatCard 
              title="Active Negotiations" 
              value={stats.active} 
              icon={<Activity className="text-indigo-600" size={24} />} 
              trend="5 leads requiring attention"
              color="indigo"
            />
            <StatCard 
              title="Total Prospects" 
              value={stats.total} 
              icon={<Users className="text-amber-600" size={24} />} 
              trend="+3 new this week"
              color="amber"
            />
          </div>

          {/* CHART SECTION - Clean & Modern */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">Revenue by Therapeutic Area</h3>
              <select className="text-sm border-none bg-slate-50 text-slate-600 rounded-lg px-3 py-1 cursor-pointer outline-none hover:bg-slate-100">
                <option>Last 6 Months</option>
              </select>
            </div>
            
            <div className="overflow-x-auto">
              <BarChart width={700} height={300} data={leads} barSize={50}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="sector" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontSize: 12}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontSize: 12}} 
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar 
                  dataKey="deal_value" 
                  fill="#6366f1" 
                  radius={[6, 6, 0, 0]} 
                />
              </BarChart>
            </div>
          </div>

          {/* TABLE SECTION - Glassy & Spacious */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Recent Deals</h3>
              <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">View All</button>
            </div>
            <table className="w-full text-left">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Company</th>
                  <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Person</th>
                  <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Deal Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors duration-150 group cursor-default">
                    <td className="p-5">
                      <p className="font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">{lead.company_name}</p>
                      <p className="text-xs text-slate-400 mt-1">{lead.sector}</p>
                    </td>
                    <td className="p-5 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs text-slate-500 font-medium">
                          {lead.contact_person.charAt(0)}
                        </div>
                        {lead.contact_person}
                      </div>
                    </td>
                    <td className="p-5">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="p-5 text-right font-medium text-slate-700">
                      ${lead.deal_value.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- HELPER COMPONENTS FOR STYLING ---

function NavItem({ icon, label, active }) {
  return (
    <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
      {icon}
      <span className="font-medium">{label}</span>
    </a>
  );
}

function StatCard({ title, value, icon, trend, color }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl bg-${color}-50`}>
          {icon}
        </div>
        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+4.5%</span>
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{value}</h3>
        <p className="text-xs text-slate-400 mt-2 font-medium">{trend}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    'Closed': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'New': 'bg-blue-100 text-blue-700 border-blue-200',
    'Negotiation': 'bg-amber-100 text-amber-700 border-amber-200',
    'Contacted': 'bg-purple-100 text-purple-700 border-purple-200'
  };
  
  const defaultStyle = 'bg-slate-100 text-slate-700 border-slate-200';
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || defaultStyle}`}>
      {status}
    </span>
  );
}