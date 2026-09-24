import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';

const AnalyticsDashboard = ({ needs }) => {
  // Mock trend data based on needs count
  const data = [
    { name: 'Mon', count: 4, impact: 200 },
    { name: 'Tue', count: 7, impact: 450 },
    { name: 'Wed', count: 5, impact: 300 },
    { name: 'Thu', count: needs.length + 2, impact: needs.length * 100 },
    { name: 'Fri', count: needs.length, impact: needs.length * 120 },
  ];

  const categoryData = [
    { name: 'Medical', value: needs.filter(n => n.category === 'Medical').length || 1 },
    { name: 'Food', value: needs.filter(n => n.category === 'Food').length || 2 },
    { name: 'Shelter', value: needs.filter(n => n.category === 'Shelter').length || 1 },
  ];

  const COLORS = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b'];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header>
        <h2 className="text-2xl font-bold">Intelligence Analytics</h2>
        <p className="text-gray-400">Advanced resource distribution metrics</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-6 min-h-[300px]">
          <h3 className="text-sm font-bold text-gray-500 uppercase mb-6 tracking-widest">Impact Trend (Lives Saved)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="name" stroke="#666" fontSize={10} />
              <YAxis stroke="#666" fontSize={10} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #ffffff10', borderRadius: '12px' }}
              />
              <Area type="monotone" dataKey="impact" stroke="#f43f5e" fillOpacity={1} fill="url(#colorImpact)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6 min-h-[300px]">
          <h3 className="text-sm font-bold text-gray-500 uppercase mb-6 tracking-widest">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="name" stroke="#666" fontSize={10} />
              <YAxis stroke="#666" fontSize={10} />
              <Tooltip contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #ffffff10', borderRadius: '12px' }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MiniStat label="Avg. Response" value="14.2m" trend="-12%" />
        <MiniStat label="Success Rate" value="98.4%" trend="+2%" />
        <MiniStat label="Active Nodes" value="24" trend="+5" />
        <MiniStat label="Gemini Trust" value="0.99" trend="Stable" />
      </div>
    </div>
  );
};

const MiniStat = ({ label, value, trend }) => (
  <div className="glass-card p-4 border-white/5">
    <div className="text-[10px] uppercase font-bold text-gray-500 mb-1">{label}</div>
    <div className="text-xl font-bold flex items-baseline gap-2">
      {value}
      <span className={`text-[10px] ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
        {trend}
      </span>
    </div>
  </div>
);

export default AnalyticsDashboard;
