// ** React Imports
import React, { ChangeEvent, ElementType, useState } from 'react'
import productAPI from '../../../api/product-api'
import categoryApi from '../../../api/category-api'
import { useAppDispatch } from '../../../store/hook'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

// ** MUI Imports
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button, { ButtonProps } from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'

interface Props {
    categories: IOption[]
    product: IUpdateProduct
}

interface FormValue {
    name: string
    thumbnail: any
    images: any
    price: number
    quantity: number
    category: IOption
    description: string
}

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        textAlign: 'center'
    }
}))

const ImgStyled = styled('img')(({ theme }) => ({
    width: 120,
    height: 120,
    borderRadius: theme.shape.borderRadius,
    objectFit: 'cover'
}))

export const getServerSideProps = async (context: any) => {
    const productId = context.query.productId as string
    const product = await productAPI.getProductUpdate(productId)
    const cateRes = await categoryApi.getCategories()
    const categories: IOption[] = cateRes.map(cate => ({ label: cate.name, value: cate._id }))

    return {
        props: {
            categories,
            product
        }
    }
}

export default function UpdateProduct({ categories, product }: Props) {
    // ** state
    const [thumbnailFile, setThumbnailFile] = useState<File>()
    const [thumbnail, setThumbnail] = useState<string>(product.thumbnail)
    const [imgFiles, setImgFiles] = useState<File[]>([])
    const [imgSrc, setImgSrc] = useState<string[]>(product.images)

    // ** react-hook-form
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormValue>({
        defaultValues: {
            thumbnail: '',
            images: '',
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            category: categories.find(cate => cate.value === product.category)
        }
    })

    const onChangeThumbnail = (file: ChangeEvent) => {
        const { files } = file.target as HTMLInputElement
        if (files && files.length !== 0) {
            setThumbnail(URL.createObjectURL(files[0]))
            setThumbnailFile(files[0])
        }
    }

    const onChangeImgs = (file: ChangeEvent) => {
        const { files } = file.target as HTMLInputElement
        const rawFiles: File[] = []
        const urlFiles: string[] = []

        if (files && files.length !== 0) {
            const length = files.length > 3 ? 3 : files.length
            for (let i = 0; i < length; i++) {
                const file = files[i]
                rawFiles.push(file)
                urlFiles.push(URL.createObjectURL(file))
            }

            setImgFiles(rawFiles)
            setImgSrc(urlFiles)
        }
    }

    const onSubmit = async (data: FormValue) => {
        try {
            const formData = new FormData()
            if (thumbnailFile) {
                formData.append('images', thumbnailFile as File)
            }
            if (data.price) {
                formData.append('price', data.price.toString())
            }

            if (data.quantity) {
                formData.append('quantity', data.quantity.toString())
            }

            if (data.category) {
                formData.append('category', data.category.value)
            }

            if (data.name) {
                formData.append('name', data.name)
            }
            if (data.description) {
                formData.append('description', data.description)
            }

            if (imgFiles.length > 0) {
                for (const file of imgFiles) {
                    formData.append('images', file)
                }
            }

            if (thumbnailFile && imgFiles.length > 0) {
                formData.append('updateImageField', 'all')
            } else if (thumbnailFile && imgFiles.length === 0) {
                formData.append('updateImageField', 'thumbnail')
            } else if (!thumbnailFile && imgFiles.length > 0) {
                formData.append('updateImageField', 'images')
            }

            toast.loading('Đang cập nhật sản phẩm...', { id: 'updateProduct' })
            await productAPI.updateProduct(formData, product._id);
            toast.dismiss('updateProduct')
            toast.success('Cập nhật sản phẩm thành công')
        } catch (error) {
            console.log('error: ', error)
            toast.dismiss('updateProduct')
            toast.error((error as IResponseError).error)
        }
    }

    return (
        <Card>
            <CardHeader title='Cập nhật sản phẩm' titleTypographyProps={{ variant: 'h6' }} />
            <Divider sx={{ margin: 0 }} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <FormLabel style={{ fontWeight: 500 }} error={errors.thumbnail?.message ? true : false}>
                                Ảnh đại diện cho sản phẩm
                            </FormLabel>
                            <Box sx={{ display: 'flex', columnGap: '20px', alignItems: 'center', marginTop: '20px' }}>
                                <ImgStyled src={thumbnail} alt='product picture' />
                                <Box>
                                    <ButtonStyled component='label' variant='contained' htmlFor='thumbnail-upload-image'>
                                        Tải ảnh lên
                                        <Controller
                                            name='thumbnail'
                                            control={control}
                                            render={({ field: { onChange, value } }) => (
                                                <input
                                                    hidden
                                                    type='file'
                                                    value={value}
                                                    onChange={e => {
                                                        onChange(e)
                                                        onChangeThumbnail(e)
                                                    }}
                                                    accept='image/png, image/jpeg'
                                                    id='thumbnail-upload-image'
                                                />
                                            )}
                                        />
                                    </ButtonStyled>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <FormLabel style={{ fontWeight: 500 }} error={errors.images?.message ? true : false}>
                                Các ảnh khác
                            </FormLabel>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', marginTop: '20px' }}>
                                {imgSrc.map(img => (
                                    <ImgStyled key={img} src={img} alt='product picture' />
                                ))}
                                <Box>
                                    <ButtonStyled component='label' variant='contained' htmlFor='another-upload-image'>
                                        Tải ảnh lên
                                        <Controller
                                            name='images'
                                            control={control}
                                            render={({ field: { onChange, value } }) => (
                                                <input
                                                    type='file'
                                                    multiple
                                                    hidden
                                                    accept='image/png, image/jpeg'
                                                    value={value}
                                                    onChange={e => {
                                                        onChange(e)
                                                        onChangeImgs(e)
                                                    }}
                                                    id='another-upload-image'
                                                />
                                            )}
                                        />
                                    </ButtonStyled>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name={'name'}
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error, invalid } }) => (
                                    <TextField
                                        fullWidth
                                        error={invalid}
                                        helperText={error?.message}
                                        label='Tên sản phẩm'
                                        placeholder='sản phẩm A'
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name={'quantity'}
                                defaultValue={100}
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error, invalid } }) => (
                                    <TextField
                                        fullWidth
                                        error={invalid}
                                        helperText={error?.message}
                                        label='Số lượng'
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name={'price'}
                                defaultValue={1000}
                                rules={{
                                    min: { value: 1000, message: 'Giá tiền phải lớn hơn 1000 VND' }
                                }}
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error, invalid } }) => (
                                    <TextField
                                        fullWidth
                                        error={invalid}
                                        helperText={error?.message}
                                        label='Giá tiền'
                                        InputProps={{
                                            startAdornment: <InputAdornment position='start'>VND</InputAdornment>
                                        }}
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name={'category'}
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error, invalid } }) => (
                                    <Autocomplete
                                        disablePortal
                                        id='category'
                                        value={value ? value : null}
                                        isOptionEqualToValue={(option, value) => option.value === value.value}
                                        options={categories}
                                        sx={{ width: '100%' }}
                                        renderInput={params => (
                                            <TextField {...params} error={invalid} helperText={error?.message} label='Loại sản phẩm' />
                                        )}
                                        onChange={(e, value) => {
                                            onChange(value)

                                            return value
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name={'description'}
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error, invalid } }) => (
                                    <TextField
                                        fullWidth
                                        error={invalid}
                                        helperText={error?.message}
                                        multiline
                                        rows={4}
                                        label='Mô tả'
                                        placeholder='Mô tả sản phẩm A'
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
                                Lưu
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </form>
        </Card>
    )
}
