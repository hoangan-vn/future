import { useTheme } from '@mui/material/styles'
import React, { useEffect, useState } from 'react'
import { ApexOptions } from 'apexcharts'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Box } from '@mui/material'
import orderApi from '../../api/order.api'
import ReactApexcharts from '../../@core/components/react-apexcharts'

interface Props {
    timeType: string
    onChange: (value: string) => void
}

const RevenueTimeSelect = ({ timeType, onChange }: Props) => {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as string)
    }

    return (
        <FormControl sx={{ width: 200 }}>
            <InputLabel id='demo-simple-select-label'>Thời gian</InputLabel>
            <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={timeType}
                label='Thời gian'
                onChange={handleChange}
            >
                <MenuItem value={'month'}>Tháng</MenuItem>
                <MenuItem value={'week'}>Tuần</MenuItem>
            </Select>
        </FormControl>
    )
}

const OrderRevenue = () => {
    // ** Hook
    const theme = useTheme()
    const [timeType, setTimeType] = useState('month')
    const [chartDataRevenue, setChartDataRevenue] = useState<IChartData[]>([])

    const options: ApexOptions = {
        chart: {
            parentHeightOffset: 0,
            toolbar: { show: false }
        },
        plotOptions: {
            bar: {
                borderRadius: 9,
                distributed: false,
                columnWidth: '40%',
                endingShape: 'rounded',
                startingShape: 'rounded'
            }
        },
        stroke: {
            width: 2,
            colors: [theme.palette.background.paper]
        },
        legend: { show: true },
        grid: {
            strokeDashArray: 7,
            padding: {
                top: -1,
                right: 0,
                left: -12,
                bottom: 5
            }
        },
        dataLabels: { enabled: false },
        // colors: [theme.palette.primary.main, theme.palette.secondary.main],
        states: {
            hover: {
                filter: { type: 'none' }
            },
            active: {
                filter: { type: 'none' }
            }
        },
        xaxis: {
            // type: 'category',
            tickPlacement: 'on',
            labels: { show: true },
            axisTicks: { show: false },
            axisBorder: { show: false }
        },
        yaxis: {
            show: true,
            tickAmount: 4,
            labels: {
                offsetX: -17,
                formatter: value => `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}k`
            }
        }
    }

    const handleChangeTimeType = (timeType: string) => {
        setTimeType(timeType)
        handleFetchOrderRevenue(timeType)
    }

    const handleFetchOrderRevenue = async (timeType: string) => {
        const response = await orderApi.getOrderRevenue(timeType)
        let revenue: IChartData[] = []

        revenue = response.data.data.map(item => ({ x: item.label, y: item.value }))
        setChartDataRevenue(revenue)
    }

    useEffect(() => {
        handleFetchOrderRevenue(timeType)
    }, [])

    return (
        <Card>
            <CardHeader
                title='Biểu đồ doanh thu'
                titleTypographyProps={{
                    sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
                }}
                action={
                    <Box sx={{ display: 'flex', columnGap: 4 }}>
                        <RevenueTimeSelect onChange={handleChangeTimeType} timeType={timeType} />
                    </Box>
                }
            />
            <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
                {chartDataRevenue.length > 0 && (
                    // @ts-ignore
                    <ReactApexcharts
                        type='bar'
                        height={205}
                        options={options}
                        series={
                            [{ name: 'Doanh thu', data: chartDataRevenue, color: theme.palette.primary.main }]
                        }
                    />
                )}
            </CardContent>
        </Card>
    )
}

export default OrderRevenue