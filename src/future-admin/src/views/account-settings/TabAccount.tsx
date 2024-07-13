// ** React Imports
// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { useEffect, useMemo, useState } from 'react'
import adminApi from 'src/api/admin-api'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-hot-toast'

// ** Icons Imports

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

interface IFormValue {
  name: string
  password: string
  oldPassword: string
}

const TabAccount = () => {
  // ** State
  const [admin, setAdmin] = useState<ResAdmin>()
  const { watch, control, handleSubmit, reset } = useForm<IFormValue>({
    defaultValues: useMemo(() => {
      if (admin)
        return {
          name: admin.name,
          password: '',
          oldPassword: ''
        }
      else
        return {
          name: '',
          password: '',
          oldPassword: ''
        }
    }, [admin])
  })

  const watchPassword = watch('password')

  const fetchAdmin = async () => {
    try {
      const response = await adminApi.get()
      setAdmin(response)
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = async (value: IFormValue) => {
    console.log(value)
    try {
      const res = await adminApi.update({
        name: value.name,
        password: value.password,
        oldPassword: value.oldPassword
      })
      setAdmin(res)
    } catch (error) {
      toast.error((error as IResponseError).error)
      console.log(error)
    }
  }

  useEffect(() => {
    reset(admin)
  }, [admin])

  useEffect(() => {
    fetchAdmin()
  }, [])

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Username'
              placeholder='johnDoe'
              value={admin ? admin.username : 'admin'}
              disabled
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name='name'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error, invalid } }) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  fullWidth
                  error={invalid}
                  helperText={error}
                  label='Name'
                  placeholder='John Doe'
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name='oldPassword'
              control={control}
              rules={{ required: { value: watchPassword ? true : false, message: 'Vui lòng nhập mật khẩu' } }}
              render={({ field: { onChange, value }, fieldState: { error, invalid } }) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  fullWidth
                  error={invalid}
                  helperText={error?.message}
                  label='Old Password'
                  placeholder=''
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name='password'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error, invalid } }) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  fullWidth
                  error={invalid}
                  helperText={error}
                  label='Password'
                  placeholder=''
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} type='submit'>
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
