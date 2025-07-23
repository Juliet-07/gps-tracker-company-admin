
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", active: 842, inactive: 105 },
  { month: "Feb", active: 980, inactive: 120 },
  { month: "Mar", active: 1105, inactive: 95 },
  { month: "Apr", active: 1240, inactive: 130 },
  { month: "May", active: 1480, inactive: 110 },
  { month: "Jun", active: 1847, inactive: 153 },
];

const chartConfig = {
    active: {
      label: "Active",
      color: "hsl(var(--primary))",
    },
    inactive: {
      label: "Inactive",
      color: "hsl(var(--muted-foreground))",
    },
};

const DeviceActivityChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Device Activity Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <LineChart
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
                <Line
                    dataKey="active"
                    type="monotone"
                    stroke="var(--color-active)"
                    strokeWidth={2}
                    dot={false}
                />
                <Line
                    dataKey="inactive"
                    type="monotone"
                    stroke="var(--color-inactive)"
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DeviceActivityChart;
