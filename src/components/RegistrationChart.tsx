
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { name: 'Jan', companies: 2 },
  { name: 'Feb', companies: 4 },
  { name: 'Mar', companies: 3 },
  { name: 'Apr', companies: 5 },
  { name: 'May', companies: 7 },
  { name: 'Jun', companies: 3 },
];

const RegistrationChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
          }}
        />
        <Line type="monotone" dataKey="companies" stroke="#5b73e8" strokeWidth={3} dot={{ r: 5, fill: '#5b73e8' }} activeDot={{ r: 7 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RegistrationChart;
