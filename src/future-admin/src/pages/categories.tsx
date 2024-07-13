import React, { useEffect, ElementType, useState, ChangeEvent, useRef } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { useAppDispatch, useAppSelector } from '../store/hook'
import { selectCategories } from '../redux/reducer/category-slice'
import { createCategory, deleteCategory, getCategories, updateCategory } from '../redux/action/category-actions'
import Image from 'next/image'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button, { ButtonProps } from '@mui/material/Button'
import { Plus, Pencil, TrashCan } from 'mdi-material-ui'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import { Dialog, DialogActions, DialogTitle, FormHelperText, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

interface FormValue {
  name: string
  image: string
}

export default function Categories() {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(selectCategories)
  const formRef = useRef<HTMLDivElement>(null)

  const [open, setOpen] = React.useState(false)
  const [imgSrc, setImgSrc] = useState<string>('/images/default.png')
  const [imageFile, setImageFile] = useState<File>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<FormValue>({
    defaultValues: {
      name: '',
      image: ''
    }
  })

  const onChangeImage = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)

      reader.readAsDataURL(files[0])

      setImageFile(files[0])
    }
  }

  const handleFetchCategories = () => {
    try {
      dispatch(getCategories()).unwrap()
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const onSubmit = async (value: FormValue) => {
    try {
      setIsSubmitting(true)
      const formData = new FormData()

      if (value.name) {
        formData.append('name', value.name)
      }

      if (imageFile) {
        formData.append('file', imageFile as File)
      }

      if (isUpdate) {
        await dispatch(updateCategory({ _id: selectedCategory, body: formData })).unwrap()
        toast.success('Cập nhập thành công.')
      } else {
        await dispatch(createCategory(formData)).unwrap()
        toast.success('Thêm mới thành công.')
      }

      reset()
      setImgSrc('/images/default.png')
      setIsSubmitting(false)
      setImageFile(undefined)
    } catch (error) {
      setIsSubmitting(false)
      toast.error((error as IResponseError).error || (isUpdate ? 'Không thể cập nhập' : 'Không thể thêm mới.'))
    }
  }

  const onEditButonClick = (category: ICategory) => () => {
    setImgSrc(category.image)
    setImageFile(undefined)
    setIsUpdate(true)
    setValue('name', category.name)
    setValue('image', '')
    setSelectedCategory(category._id)
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const onAddButtonClick = () => {
    reset()
    setIsUpdate(false)
    setImgSrc('/images/default.png')
    setImageFile(undefined)
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleClickOpen = (id: string) => () => {
    setOpen(true)
    setSelectedCategory(id)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = async () => {
    try {
      await dispatch(deleteCategory(selectedCategory)).unwrap()
      setOpen(false)
      toast.success('Xóa thành công')
    } catch (error) {
      toast.error('Xóa thất bại')
    }
  }

  useEffect(() => {
    handleFetchCategories()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Danh sách phân loại'
            titleTypographyProps={{ variant: 'h6' }}
            action={
              <Button onClick={onAddButtonClick} variant='contained'>
                <Plus sx={{ marginRight: 2 }} /> Thêm
              </Button>
            }
          />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Hình ảnh</TableCell>
                  <TableCell align='right'>Tên</TableCell>
                  <TableCell align='right'>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.length > 0 &&
                  categories.map(row => (
                    <TableRow
                      key={row._id}
                      sx={{
                        '&:last-of-type td, &:last-of-type th': {
                          border: 0
                        }
                      }}
                    >
                      <TableCell component='th' scope='row'>
                        <Image src={row.image} width={150} objectPosition={'center'} objectFit='contain' height={150} />
                      </TableCell>
                      <TableCell align='right'>{row.name}</TableCell>
                      <TableCell align='right'>
                        <Box>
                          <IconButton onClick={onEditButonClick(row)} color='primary' sx={{ marginRight: 2 }}>
                            <Pencil />
                          </IconButton>
                          <IconButton onClick={handleClickOpen(row._id)} color='error'>
                            <TrashCan />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card ref={formRef}>
          <CardHeader
            title={isUpdate ? 'Cập nhập phân loại' : 'Thêm phân loại mới'}
            titleTypographyProps={{ variant: 'h6' }}
          />
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Controller
                    name='name'
                    control={control}
                    rules={{ required: { value: true, message: 'Vui lòng nhập tên cho phân loại' } }}
                    render={({ field: { onChange, value }, fieldState: { error, invalid } }) => (
                      <TextField
                        error={invalid}
                        helperText={error?.message}
                        fullWidth
                        label='Tên phân loại'
                        value={value}
                        onChange={onChange}
                        placeholder='Leonard Carter'
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ImgStyled src={imgSrc} alt='Profile Pic' />
                    <Box>
                      <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                        Tải lên 1 ảnh mới
                        <Controller
                          name='image'
                          control={control}
                          rules={{ required: { value: !isUpdate, message: 'Vui lòng chọn ảnh.' } }}
                          render={({ field: { onChange, value }, fieldState: { error, invalid } }) => (
                            <>
                              <input
                                hidden
                                type='file'
                                value={value}
                                onChange={e => {
                                  onChange(e)
                                  onChangeImage(e)
                                }}
                                accept='image/png, image/jpeg'
                                id='account-settings-upload-image'
                              />
                            </>
                          )}
                        />
                      </ButtonStyled>
                    </Box>
                  </Box>
                  {errors.image && <FormHelperText error={true}>{errors.image.message}</FormHelperText>}
                </Grid>
                <Grid item xs={12}>
                  <Button disabled={isSubmitting} type='submit' variant='contained' size='large'>
                    Xong
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle sx={{ fontWeight: 500 }} id='alert-dialog-title'>
            Bạn có muốn xóa <b>{categories.find(item => item._id === selectedCategory)?.name}</b>?
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
