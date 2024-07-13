import { NextRequest, NextFetchEvent } from 'next/server'
import { NextResponse } from 'next/server'
import adminApi from '../api/admin-api'

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  if (req.nextUrl.pathname === '/login/') {
    return NextResponse.next()
  }

  const token = req.cookies['Authorization']
  console.log('token: ', token)
  const data = await fetch(`http://localhost:5500/api/v1/admin/validate`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  // .then((data: any) => {
  //   console.log('ata.status: ', data.status)
  //   if (data.status === 200 || data.status == 201) {
  //     return NextResponse.next()
  //   } else {
  //     return NextResponse.redirect('/login') // redirect
  //   }
  // })
  // .catch(() => {
  //   return NextResponse.redirect('/login') // redirect
  // })
  console.log('data.status: ', data.status)
  if (data.status === 200 || data.status == 201) {
    return NextResponse.next()
  } else {
    return NextResponse.redirect('/login') // redirect
  }
}
