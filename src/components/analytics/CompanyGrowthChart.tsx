
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { month: "Jan", companies: 4 },
  { month: "Feb", companies: 6 },
  { month: "Mar", companies: 9 },
  { month: "Apr", companies: 14 },
  { month: "May", companies: 21 },
  { month: "Jun", companies: 24 },
];

const chartConfig = {
    companies: {
        label: "Companies",
        color: "hsl(var(--success))",
    },
};


const CompanyGrowthChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <AreaChart
                data={chartData}
                margin={{
                top: 5,
                right: 20,
                left: -10,
                bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                />
                <defs>
                    <linearGradient id="fillCompanies" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-companies)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--color-companies)" stopOpacity={0.1} />
                    </linearGradient>
                </defs>
                <Area
                    type="monotone"
                    dataKey="companies"
                    stroke="var(--color-companies)"
                    fillOpacity={1}
                    fill="url(#fillCompanies)"
                />
            </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
export default CompanyGrowthChart;
