// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import toast from 'react-hot-toast'
import { Controller, useForm } from 'react-hook-form'
import { FormHelperText } from '@mui/material'
import adminApi from '../api/admin-api'

interface State {
  password: string
  showPassword: boolean
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

interface FormValue {
  username: string
  password: string
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const router = useRouter()

  const handleClickShowPassword = () => {
    setShowPassword(value => !value)
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const onSubmit = async (values: FormValue) => {
    try {
      setLoading(true)
      await adminApi.login({
        username: values.username,
        password: values.password
      })
      setLoading(false)
      router.push('/')
    } catch (error) {
      setLoading(false)
      toast.error((error as IResponseError).error)
    }
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg xmlns='http://www.w3.org/2000/svg' width='98' height='25' fill='none' viewBox='0 0 98 25'>
              <path
                fill='black'
                d='M.04.448h14.72v4.48H4.68v5.344h8.736v4.48H4.68V24H.04V.448zm21.682 24.224c-1.258 0-2.314-.384-3.168-1.152-.853-.79-1.301-1.803-1.344-3.04V10.016h4.48v8.8c.043.619.203 1.12.48 1.504.278.363.747.544 1.408.544.662 0 1.227-.224 1.696-.672.49-.448.864-1.056 1.12-1.824.278-.79.416-1.675.416-2.656v-5.696h4.48V24h-4.064l-.352-2.56.064.288a6.04 6.04 0 01-1.216 1.536c-.49.448-1.077.79-1.76 1.024-.661.256-1.408.384-2.24.384zm14.988-20.8h4.48v6.08h3.392v3.488H41.19V24h-4.48V13.44h-2.176V9.952h2.176v-6.08zm15.294 20.8c-1.26 0-2.315-.384-3.168-1.152-.854-.79-1.302-1.803-1.344-3.04V10.016h4.48v8.8c.042.619.202 1.12.48 1.504.277.363.746.544 1.407.544.662 0 1.227-.224 1.697-.672.49-.448.864-1.056 1.12-1.824.277-.79.416-1.675.416-2.656v-5.696h4.48V24h-4.065l-.351-2.56.063.288a6.038 6.038 0 01-1.215 1.536 4.97 4.97 0 01-1.76 1.024c-.662.256-1.408.384-2.24.384zM69.71 10.016l.416 3.84-.096-.576a6.205 6.205 0 011.664-2.112c.704-.597 1.397-1.056 2.08-1.376.704-.32 1.237-.48 1.6-.48l-.224 4.48c-1.045-.128-1.941.043-2.688.512a4.813 4.813 0 00-1.728 1.856 5.016 5.016 0 00-.608 2.368V24h-4.448V10.016h4.032zm14.848 14.368c-1.707 0-3.157-.32-4.352-.96-1.173-.64-2.07-1.525-2.688-2.656-.619-1.13-.928-2.432-.928-3.904 0-1.408.363-2.677 1.088-3.808a7.85 7.85 0 012.912-2.688c1.216-.683 2.57-1.024 4.064-1.024 2.005 0 3.648.587 4.928 1.76 1.301 1.152 2.144 2.827 2.528 5.024l-10.88 3.456-.992-2.432 7.872-2.656-.928.416a3.174 3.174 0 00-.928-1.44c-.427-.427-1.077-.64-1.952-.64-.661 0-1.248.16-1.76.48-.49.299-.875.736-1.152 1.312-.256.555-.384 1.216-.384 1.984 0 .875.16 1.61.48 2.208.32.576.757 1.013 1.312 1.312a3.851 3.851 0 001.856.448c.49 0 .96-.085 1.408-.256.47-.17.928-.395 1.376-.672l1.984 3.328A11.25 11.25 0 0186.991 24c-.853.256-1.664.384-2.432.384zm8.484-2.688c0-.661.234-1.216.703-1.664.491-.448 1.025-.672 1.6-.672.534 0 1.035.224 1.504.672.491.448.737 1.003.737 1.664 0 .704-.246 1.27-.737 1.696-.469.405-.97.608-1.503.608-.576 0-1.11-.203-1.6-.608-.47-.427-.704-.992-.704-1.696z'
              ></path>
            </svg>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Chào mừng bạn tới Future! 👋🏻
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name='username'
              control={control}
              rules={{
                required: { value: true, message: 'Yêu cầu nhập tên đăng nhập' }
              }}
              defaultValue={''}
              render={({ field: { onChange, value }, fieldState: { error, invalid } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  error={invalid}
                  helperText={error?.message}
                  autoFocus
                  fullWidth
                  id='username'
                  label='Tên đăng nhập'
                  sx={{ marginBottom: 4 }}
                />
              )}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Mật khẩu</InputLabel>
              <Controller
                name='password'
                defaultValue={''}
                control={control}
                rules={{ required: { value: true, message: 'Yêu cầu nhập mật khẩu' } }}
                render={({ field: { onChange, value }, fieldState: { error, invalid } }) => (
                  <>
                    <OutlinedInput
                      label='Mật khẩu'
                      value={value}
                      id='auth-login-password'
                      onChange={onChange}
                      error={invalid}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            aria-label='toggle password visibility'
                          >
                            {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {invalid && <FormHelperText error={invalid}>{error?.message}</FormHelperText>}
                  </>
                )}
              />
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel control={<Checkbox />} label='Ghi nhớ tài khoản' />
              <Link passHref href='/'>
                <LinkStyled onClick={e => e.preventDefault()}>Quên mật khẩu?</LinkStyled>
              </Link>
            </Box>
            <Button
              disabled={loading}
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              sx={{ marginBottom: 7 }}
            >
              {loading ? 'Đang đăng nhâp...' : 'Đăng nhập'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
