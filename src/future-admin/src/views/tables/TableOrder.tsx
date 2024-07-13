// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-hot-toast'
import Typography from '@mui/material/Typography'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, styled } from '@mui/material'
import { useRouter } from 'next/router'
import orderAPI from 'src/api/order-api'
import moment from 'moment'
import { TimelineDot } from '@mui/lab'

interface Column {
  id: 'id' | 'customerName' | 'address' | 'totalPrice' | 'status' | 'orderDate'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'id', label: 'Mã đơn hàng', minWidth: 100 },
  { id: 'customerName', label: 'Khách hàng', minWidth: 150 },
  {
    id: 'address',
    label: 'Địa chỉ',
    minWidth: 200

    // format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'orderDate',
    label: 'Ngày tạo đơn',
    minWidth: 100
  },
  {
    id: 'totalPrice',
    label: 'Tổng tiền (VND)',
    minWidth: 50,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'status',
    label: 'Tình trạng',
    minWidth: 200,
    align: 'right'
  }
]

interface DataRow {
  id: string
  customerName: string
  address: string
  totalPrice: number
  orderDate: string
  status: string
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(4)
  }
}))

export interface DialogTitleProps {
  id: string
  children?: React.ReactNode
  onClose: () => void
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 6, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            color: theme => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}
interface props {
  value: string
}

const TableOrder = ({ value }: props) => {
  // ** States
  const [page, setPage] = useState<number>(0)
  const [rows, setRows] = useState<DataRow[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [totalProds, setTotalProds] = useState<number>(0)
  const [open, setOpen] = useState(false)
  const [seletedProd, setSelectedProd] = useState<string>('')
  const [orderItemsInfo, setOrderItemsInfo] = useState<IOrderItemsInfo[]>([])

  const router = useRouter()

  const handleClose = () => {
    setOpen(false)
  }
  const handleUpdateStatus = async (status: string) => {
    setOpen(false)
    const res1 = await orderAPI.updateStatusInvoice(seletedProd, status)
    console.log(res1)
    setTimeout(() => {
      toast.success(`Update status order success to: ${res1}`), 1000
    })
    router.reload()
  }

  const handleClickOpen = (id: string) => async () => {
    setOpen(true)
    setSelectedProd(id)
    const res2 = await orderAPI.getOrderItemsInfo(id)
    setOrderItemsInfo(res2)
    console.log(res2)
  }

  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage)
    await handleGetProdPagination(newPage)
  }

  const handleGetProdPagination = async (page: number) => {
    try {
      setLoading(true)
      const res = await orderAPI.getAllInvoices(10, page)
      console.log(res)

      setTotalProds(res.numOfProds)

      setRows(
        res.allOrders.map(prod => ({
          id: prod.shortId,
          customerName: prod.userName,
          address: prod.address,
          totalPrice: prod.total,
          orderDate: moment(prod.dateCreated).format('DD/MM/YYYY hh:mm:ss'),
          status: prod.status
        }))
      )
      setLoading(false)
    } catch (error) {
      console.log('error: ', error)
      setLoading(false)
      toast.error((error as IResponseError).error)
    }
  }

  const handleGetInvoiceFollowDatePagination = async (page: number) => {
    try {
      setLoading(true)
      const res = await orderAPI.getInvoiceFollowDate(10, page)
      console.log(res)

      setTotalProds(res.numOfProds)

      setRows(
        res.allOrders.map(prod => ({
          id: prod.shortId,
          customerName: prod.userName,
          address: prod.address,
          totalPrice: prod.total,
          orderDate: moment(prod.dateCreated).format('DD/MM/YYYY hh:mm:ss'),
          status: prod.status
        }))
      )
      setLoading(false)
    } catch (error) {
      console.log('error: ', error)
      setLoading(false)
      toast.error((error as IResponseError).error)
    }
  }

  // const handleDelete = async () => {

  useEffect(() => {
    switch (value) {
      case 'none':
        handleGetProdPagination(0)
        break
      case 'date':
        handleGetInvoiceFollowDatePagination(0)
        console.log('a')
        break
      default:
        handleGetProdPagination(0)
    }
  }, [value])

  return (
    <Grid container>
      <Grid item xs={12}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 &&
                !loading &&
                rows.map(row => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                      {columns.map(column => {
                        const value = row[column.id]

                        if (column.id === 'status') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                              <IconButton onClick={handleClickOpen(row.id)} aria-label='edit' color='primary'>
                                <EditIcon />
                              </IconButton>
                            </TableCell>
                          )
                        } else
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                          )
                      })}
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
          {rows.length === 0 && !loading && (
            <Typography color='text.secondary' sx={{ textAlign: 'center', mt: 4 }}>
              Không có đơn hàng
            </Typography>
          )}
          {loading && (
            <Typography color='text.secondary' sx={{ textAlign: 'center', mt: 4 }}>
              Đang tải dữ liệu...
            </Typography>
          )}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component='div'
          count={totalProds}
          rowsPerPage={10}
          page={page}
          onPageChange={handleChangePage}
        />
      </Grid>
      <Grid item xs={12}>
        <BootstrapDialog
          maxWidth='lg'
          onClose={handleClose}
          aria-labelledby='customized-dialog-title'
          open={open}
          color='primary'
        >
          <BootstrapDialogTitle id='customized-dialog-title' onClose={handleClose}>
            Cập nhật trạng thái đơn hàng!
          </BootstrapDialogTitle>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <DialogTitle display='flex' justifyContent='center' alignItems='center'>
                Tên sản phẩm
              </DialogTitle>
            </Grid>
            <Grid item xs={4}>
              <DialogTitle display='flex' justifyContent='center' alignItems='center'>
                Giá
              </DialogTitle>
            </Grid>
            <Grid item xs={4}>
              <DialogTitle display='flex' justifyContent='center' alignItems='center'>
                số lượng
              </DialogTitle>
            </Grid>
            {/* <Grid item xs={3}>
              <DialogTitle display='flex' justifyContent='center' alignItems='center'>
                Quantity
              </DialogTitle>
            </Grid> */}
          </Grid>
          {orderItemsInfo.map(item => (
            // eslint-disable-next-line react/jsx-key
            <DialogContent key={item.product}>
              <Grid container spacing={2} sx={{ paddingLeft: 12 }}>
                {/* <Grid item xs={3}>
                  <Typography>{item.product}</Typography>
                </Grid> */}
                <Grid item xs={4}>
                  <Typography>{item.product}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography display='flex' justifyContent='center' alignItems='center'>
                    {item.price.toLocaleString('en-US')}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography display='flex' justifyContent='center' alignItems='center'>
                    {item.quantity}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
          ))}
          <DialogActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
            <Button variant='contained' color='error' onClick={() => handleUpdateStatus('pending')} autoFocus>
              Đang xử lý
            </Button>
            <Button variant='contained' onClick={() => handleUpdateStatus('delivering')} autoFocus>
              Đang giao hàng
            </Button>
            <Button variant='contained' color='success' onClick={() => handleUpdateStatus('completed')}>
              Đã giao
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </Grid>
    </Grid>
  )
}

export default TableOrder
