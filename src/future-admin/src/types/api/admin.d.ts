type ResAdmin = {
  name: string
  username: string
}

type AdminLogin = {
  username: string
  password: string
}
type UpdateAdmin = {
  name?: string
  password?: string
  oldPassword: string
}

