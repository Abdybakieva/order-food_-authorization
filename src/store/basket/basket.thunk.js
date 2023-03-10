import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  deleteBasketRequest,
  getBasketRequest,
  postBasketRequest,
  postSubmitOrder,
  putBasketRequest,
} from '../../api/mealService'

export const getBasket = createAsyncThunk(
  'basket/getBasket',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await getBasketRequest()

      return data.data.items
    } catch (error) {
      return rejectWithValue('Some thing wen wronf')
    }
  }
)

export const addtoBasket = createAsyncThunk(
  'basket/addToBasket',
  async (newItem, { dispatch, rejectWithValue }) => {
    try {
      await postBasketRequest(newItem)
      // await fetchApi(`foods/${newItem.id}/addToBasket`, {
      //   method: 'POST',
      //   body: { amount: newItem.amount },
      // })

      return dispatch(getBasket())
    } catch (error) {
      return rejectWithValue('Some thing wen wronf')
    }
  }
)

export const updeteBasketItem = createAsyncThunk(
  'basket/updeteBasket',
  async ({ amount, id }, { dispatch, rejectWithValue }) => {
    try {
      await putBasketRequest(amount, id)
      // await fetchApi(`basketItem/${id}/update`, {
      //   method: 'PUT',
      //   body: { amount },
      // })
      dispatch(getBasket())
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const deleteBasketItem = createAsyncThunk(
  'basket/deleteBasket',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await deleteBasketRequest(id)
      // await fetchApi(`basketItem/${id}/delete`, {
      //   method: 'DELETE',
      // })
      dispatch(getBasket())
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const submitOrder = createAsyncThunk(
  'basket/submitOrder',
  async ({ orderData }, { dispatch, rejectWithValue }) => {
    try {
      await postSubmitOrder(orderData)
      // await fetch(`https://jsonplaceholder.typicode.com/posts`, {
      //   method: 'POST',
      //   body: orderData,
      // })

      return dispatch(getBasket())
    } catch (error) {
      return rejectWithValue('Some thing wen wronf')
    }
  }
)
