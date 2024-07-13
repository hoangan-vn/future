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
import { toast } from 'react-hot-toast'
import productAPI from '../../api/product-api'
import Typography from '@mui/material/Typography'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material'
import { useRouter } from 'next/router'

interface Column {
  id: 'name' | 'category' | 'quantity' | 'price' | 'action'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Tên sản phẩm', minWidth: 270 },
  { id: 'category', label: 'Loại', minWidth: 100 },
  {
    id: 'quantity',
    label: 'Số lượng',
    minWidth: 100,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'price',
    label: 'Giá tiền (VND)',
    minWidth: 100,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'action',
    label: 'Hành động',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2)
  }
]

interface DataRow {
  name: string
  category: string
  quantity: number
  price: number
  action: string
}

const TableProducts = () => {
  // ** States
  const [page, setPage] = useState<number>(0)
  const [rows, setRows] = useState<DataRow[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [totalProds, setTotalProds] = useState<number>(0)
  const [open, setOpen] = useState(false)
  const [seletedProd, setSelectedProd] = useState<string>()

  const router = useRouter()

  const handleClose = () => {
    setOpen(false)
  }

  const handleClickOpen = (id: string) => () => {
    setOpen(true)
    setSelectedProd(id)
  }

  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage)
    await handleGetProdPagination(newPage)
  }

  const handleGetProdPagination = async (page: number) => {
    try {
      setLoading(true)
      const res = await productAPI.getPagination(10, page)
      if (totalProds === 0) {
        setTotalProds(res.numOfProds)
      }
      setRows(
        res.products.map(prod => ({
          name: prod.name,
          action: prod._id,
          category: prod.category.name,
          price: prod.price,
          quantity: prod.quantity
        }))
      )
      setLoading(false)
    } catch (error) {
      console.log('error: ', error)
      setLoading(false)
      toast.error((error as IResponseError).error)
    }
  }

  const handleDelete = async () => {
    try {
      if (seletedProd) {
        await productAPI.deleteProduct(seletedProd)
        setOpen(false)
        setTotalProds(totalProds - 1)
        setRows(value => value.filter(prod => prod.action !== seletedProd))
        toast.success('Xóa thành công')
      }
    } catch (error) {
      toast.error('Xóa thất bại')
    }
  }

  const handleClickUpdate = (productId: string) => () => {
    router.push(`/product/update/${productId}`)
  }

  useEffect(() => {
    handleGetProdPagination(0)
  }, [])

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
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.action}>
                      {columns.map(column => {
                        const value = row[column.id]

                        if (column.id === 'action') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <IconButton onClick={handleClickUpdate(row.action)} aria-label='edit' color='primary'>
                                <EditIcon />
                              </IconButton>
                              <IconButton onClick={handleClickOpen(row.action)} aria-label='delete' color='error'>
                                <DeleteIcon />
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
              Không có sản phẩm
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
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle sx={{ fontWeight: 500 }} id='alert-dialog-title'>
            Bạn có muốn xóa sản phẩm <b>{rows.find(item => item.action === seletedProd)?.name}</b>?
          </DialogTitle>
          <DialogActions>
            <Button variant='contained' onClick={handleClose}>
              Không
            </Button>
            <Button variant='contained' color='error' onClick={handleDelete} autoFocus>
              Có
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  )
}

export default TableProducts
