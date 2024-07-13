// ** React Imports
import { ReactElement, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import productAPI from '../../api/product-api'
import { toast } from 'react-hot-toast'
import { userApi } from '../../api/user-api'
import orderAPI from '../../api/order-api'

interface DataType {
  stats: string
  title: string
  color: ThemeColor
  icon: ReactElement
}

const StatsItem = ({ stats, color, title, icon }: DataType) => {
  return (
    <Grid item xs={12} sm={3}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${color}.main`
          }}
        >
          {icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{title}</Typography>
          <Typography variant='h6'>{stats}</Typography>
        </Box>
      </Box>
    </Grid>
  )
}

const StatisticsCard = () => {
  const [numberOfProducts, setNumberOfProducts] = useState(0)
  const [numberOfUsers, setNumberOfUsers] = useState(0)
  const [revenueOfCurrentYear, setRevenueOfCurrentYear] = useState(0)

  const handleFetchNumberOfProducts = async () => {
    try {
      const response = await productAPI.countProduct()
      setNumberOfProducts(response)
    } catch (error) {
      toast.error('Không thể lấy sô lượng sản phẩm')
    }
  }

  const handleFetchNumberOfUsers = async () => {
    try {
      const response = await userApi.countUsers()
      setNumberOfUsers(response)
    } catch (error) {
      toast.error('Không thể lấy sô lượng người dùng')
    }
  }

  const handleFetchRevenueOfCurrentYear = async () => {
    try {
      const response = await orderAPI.getRevenueOfCurrentYear()
      setRevenueOfCurrentYear(response)
    } catch (error) {
      toast.error('Không thể lấy sô lượng người dùng')
    }
  }

  useEffect(() => {
    handleFetchNumberOfProducts()
    handleFetchNumberOfUsers()
    handleFetchRevenueOfCurrentYear()
  }, [])

  return (
    <Card>
      <CardHeader
        title='Thống kê'
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          <StatsItem
            stats={numberOfUsers.toString()}
            color='success'
            title='Khách hàng'
            icon={<AccountOutline sx={{ fontSize: '1.75rem' }} />}
          />
          <StatsItem
            stats={numberOfProducts.toString()}
            color='warning'
            title='Sản phẩm'
            icon={<CellphoneLink sx={{ fontSize: '1.75rem' }} />}
          />
          <StatsItem
            stats={revenueOfCurrentYear.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            color='info'
            title={`Doanh thu`}
            icon={<CurrencyUsd sx={{ fontSize: '1.75rem' }} />}
          />
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
