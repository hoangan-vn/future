import { createAsyncThunk } from '@reduxjs/toolkit'
import categoryApi from '../../api/category-api'

export const getCategories = createAsyncThunk('categories', async (_body, thunkAPI) => {
  try {
    const response = await categoryApi.getCategories()

    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const createCategory = createAsyncThunk('categories/create', async (body: FormData, thunkAPI) => {
  try {
    const response = await categoryApi.create(body)

    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const updateCategory = createAsyncThunk('categories/update', async (body: IUpdateCategory, thunkAPI) => {
  try {
    const response = await categoryApi.update(body)

    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const deleteCategory = createAsyncThunk('categories/delete', async (id: string, thunkAPI) => {
  try {
    const response = await categoryApi.delete(id)

    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
