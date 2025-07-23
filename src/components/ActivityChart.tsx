
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const data = [
  { name: 'Active', value: 18, color: '#34c38f' },
  { name: 'Inactive', value: 4, color: '#f1b44c' },
  { name: 'Suspended', value: 2, color: '#f46a6a' },
];

const ActivityChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <XAxis type="number" hide />
        <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 14 }} width={80} />
        <Tooltip
          cursor={{ fill: '#f3f4f6' }}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
          }}
        />
        <Bar dataKey="value" barSize={30} radius={[0, 5, 5, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
export default ActivityChart;
