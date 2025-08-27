import { createFileRoute, Link as TSRLink } from '@tanstack/react-router'
import { ArrowDown, ArrowRight, ArrowUp } from 'lucide-react'
import { Bar, BarChart, ResponsiveContainer, XAxis } from 'recharts'
import colors from 'tailwindcss/colors'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export const Route = createFileRoute('/_authenticated/_app/_overview/')({
  component: Index,
})

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: colors.lime[300],
  },
  mobile: {
    label: 'Mobile',
    color: colors.lime[300],
  },
} satisfies ChartConfig

function Index() {
  return (
    <div className="mx-auto w-full max-w-7xl py-10">
      <div className="flex items-center space-x-2">
        <h3 className="font-semibold text-2xl">General</h3>
        <Badge
          className="shrink-0 grow-0 rounded-full text-xs"
          variant="outline"
        >
          <span className="text-ring">GET /v1/ </span>
          <span>OS Reports</span>
        </Badge>
      </div>
      <div className="mt-10 flex items-center gap-1 text-sm">
        <span>Statistics</span>
        <span className="text-ring">Last 24 hours</span>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-ring text-sm">Customers</span>
              <span className="font-bold text-2xl">1K</span>
            </div>
            <Badge variant="destructive">
              <ArrowDown />
              37,84%
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-ring text-sm">Services</span>
              <span className="font-bold text-2xl">1K</span>
            </div>
            <Badge variant="destructive">
              <ArrowDown />
              37,84%
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-ring text-sm">Services Order</span>
              <span className="font-bold text-2xl">1K</span>
            </div>
            <Badge className="bg-green-500 text-green-950">
              <ArrowUp />
              37,84%
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-ring text-sm">Inventory</span>
              <span className="font-bold text-2xl">1K</span>
            </div>
            <Badge className="bg-green-500 text-green-950">
              <ArrowUp />
              37,84%
            </Badge>
          </CardContent>
        </Card>
        <div className="col-span-4 col-start-1 rounded-xl bg-zinc-800 p-1">
          <div className="h-52 rounded-xl bg-zinc-900">
            <ResponsiveContainer>
              <ChartContainer
                className="min-h-[200px] w-full"
                config={chartConfig}
              >
                <BarChart accessibilityLayer data={chartData}>
                  <XAxis
                    axisLine={false}
                    dataKey="month"
                    tickFormatter={(value) => value.slice(0, 3)}
                    tickLine={false}
                    tickMargin={10}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    radius={4}
                  />
                  <Bar
                    dataKey="mobile"
                    fill="var(--color-desktop)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-between px-4 py-2 text-sm">
            <span className="text-zinc-400">
              Amount of service per day in last 28 days
            </span>
            <TSRLink
              className="flex items-center justify-center gap-2 underline-offset-2 hover:underline"
              to="/full-report"
            >
              View full statistics
              <ArrowRight className="size-4" />
            </TSRLink>
          </div>
        </div>
      </div>
    </div>
  )
}
