import { createHmac } from "crypto";
import {
  CREATE_ORDER_SUCCESS,
  CREAT_PAYMENT_URL_ZALOPAY_SUCCESS,
  ERROR_CREATE_ORDER,
  ERROR_GET_ALL_ORDERS,
  ERROR_CREAT_PAYMENT_URL_ZALOPAY,
  ERROR_GET_ORDER_HISTORY,
  ERROR_ORDER_NOT_FOUND,
  ERROR_PRODUCT_NOT_FOUND,
  ERROR_USER_NOT_FOUND,
  GET_ALL_ORDERS_SUCCESS,
  GET_ORDER_HISTORY_SUCCESS,
  QUERY_ORDER_STATUS_ZALOPAY_SUCCESS,
  ERROR_QUERY_ORDER_STATUS_ZALOPAY,
  ERROR_UPDATE_STATUS,
  ERROR_USERNAME_ORDER_NOT_FOUND,
  ERROR_ADDRESS_ORDER_NOT_FOUND,
  ERROR_ORDER_DETAIL_BY_ID,
  ERROR_ORDER_DETAIL_BY_ID_NOT_FOUND,
  ERROR_ORDER_ITEM_NOT_FOUND,
  GET_ALL_ORDERS_ITEMS_SUCCESS,
  GET_REVENUE_OF_CURRENT_YEAR_SUCCESS,
  ERROR_GET_REVENUE_OF_CURRENT_YEAR,
  ERROR_GET_REVENUE_FOLLOW_TIME,
  GET_REVENUE_FOLLOW_TIME_SUCCESS,
} from "../constances";
import { HttpStatus, OrderStatus } from "../constances/enum";
import {
  ICallBackZaloPay,
  ICreateOrder,
  ICreateZaloPayOrder,
  IDataCallbackZalopay,
  IQueryZaloPayOrderStatus,
} from "../dto/request";
import {
  IAllOrders,
  IOrderHistoryRes,
  IOrderRes,
  IOrderRevenue,
  IQueryZaloPayOrderStatusRes,
  IRevenueValue,
} from "../dto/response/order.dto";
import Order from "../models/order";
import OrderItem, { IOrderItem, IOrderItemModel } from "../models/order-item";
import Product from "../models/product";
import User from "../models/user";
import { handleResFailure, handlerResSuccess } from "../utils/handle-response";
import { generateOrderId } from "../utils/random-string";
import moment from "moment";
import axios from "axios";
import CryptoJS from "crypto-js";
import qs from "qs";
import { CloudinaryService } from "./cloudinary.service";
import Address from "../models/address";
import { subtractDays } from "../utils/date";

export class OrderService {
  static async createOrder(dto: ICreateOrder, userId: string) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return handleResFailure(ERROR_USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      const orderItems: string[] = [];
      for (let i = 0; i < dto.orderItems.length; i++) {
        const orderItem = dto.orderItems[i];
        const product = await Product.findByIdAndUpdate(orderItem.product, {
          $inc: {
            quantity: -orderItem.quantity,
          },
        });

        if (!product) {
          return handleResFailure(
            ERROR_PRODUCT_NOT_FOUND,
            HttpStatus.NOT_FOUND
          );
        }

        const newOrderItem = new OrderItem({
          product: orderItem.product,
          price: orderItem.price,
          quantity: orderItem.quantity,
        });
        await newOrderItem.save();

        orderItems.push(newOrderItem.id);
      }

      const totalPrice = dto.orderItems.reduce(
        (total, orderItem) => total + orderItem.price * orderItem.quantity,
        0
      );

      const newOrder = new Order({
        orderItems: orderItems,
        user: userId,
        total: totalPrice,
        address: dto.address,
        shortId: generateOrderId(),
        paymentMethod: dto.paymentMethod,
      });
      await newOrder.save();

      return handlerResSuccess<string>(CREATE_ORDER_SUCCESS, newOrder.id);
    } catch (error) {
      return handleResFailure(ERROR_CREATE_ORDER, HttpStatus.BAD_REQUEST);
    }
  }

  static async getOrderHistoryFollowStatus(
    userId: string,
    orderStatus: OrderStatus
  ) {
    try {
      const userFound = await User.findById(userId);
      if (!userFound) {
        return handleResFailure(ERROR_USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      const ordersHistoryRes: IOrderHistoryRes[] = [];
      const orders = await Order.find({
        user: userId,
        status: orderStatus,
      })
        .populate("orderItems")
        .sort({ createdAt: -1 });
      for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        const firstProd = await Product.findById(
          (order.orderItems[0] as IOrderItemModel).product
        );
        if (!firstProd) {
          return handleResFailure(
            ERROR_PRODUCT_NOT_FOUND,
            HttpStatus.NOT_FOUND
          );
        }

        const imgURL = await CloudinaryService.getImageUrl(firstProd.thumbnail);

        ordersHistoryRes.push({
          _id: order.id,
          shortId: order.shortId,
          createdAt: order.createdAt as string,
          total: order.total,
          firstProduct: {
            _id: firstProd.id,
            thumbnail: imgURL,
            name: firstProd.name,
            price: (order.orderItems[0] as IOrderItemModel).price,
            quantity: (order.orderItems[0] as IOrderItemModel).quantity,
          },
          orderItemsLength: order.orderItems.length,
        });
      }

      return handlerResSuccess<IOrderHistoryRes[]>(
        GET_ORDER_HISTORY_SUCCESS,
        ordersHistoryRes
      );
    } catch (error) {
      console.log("error: ", error);
      return handleResFailure(ERROR_GET_ORDER_HISTORY, HttpStatus.BAD_REQUEST);
    }
  }
  static async getAllOrders(limit: number, page: number) {
    try {
      const orderArray: IAllOrders[] = [];
      const allOrders = await Order.find()
        .skip(page * limit)
        .limit(limit);
      if (!allOrders) {
        return handleResFailure(ERROR_GET_ALL_ORDERS, HttpStatus.NOT_FOUND);
      }
      const numOfProds = await Order.count();
      // tìm tên khách hàng và address theo id và sau đó là bỏ vào array.
      for (let i = 0; i < allOrders.length; i++) {
        const order = allOrders[i];
        const usernameInfo = await User.findById(order.user);
        if (!usernameInfo) {
          return handleResFailure(
            ERROR_USERNAME_ORDER_NOT_FOUND,
            HttpStatus.NOT_FOUND
          );
        }
        const addressInfo = await Address.findById(order.address);
        if (!addressInfo) {
          return handleResFailure(
            ERROR_ADDRESS_ORDER_NOT_FOUND,
            HttpStatus.NOT_FOUND
          );
        }
        orderArray.push({
          shortId: order.shortId,
          address: `${addressInfo.specificAddress} ,${addressInfo.ward} ,${addressInfo.district} ,${addressInfo.province}`,
          userName: usernameInfo.name,
          status: order.status,
          dateCreated: order.createdAt as string,
          total: order.total,
        });
      }
      return handlerResSuccess<IOrderRes>(GET_ALL_ORDERS_SUCCESS, {
        allOrders: orderArray,
        numOfProds,
      });
    } catch (error) {
      console.log("error", error);
      return handleResFailure(ERROR_GET_ALL_ORDERS, HttpStatus.BAD_REQUEST);
    }
  }
  static async getOrdersFollowDateNow(limit: number, page: number) {
    try {
      const orderArray: IAllOrders[] = [];
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0); // Đặt giá trị giờ phút giây của ngày hiện tại về 00:00:00
      const tomorrow = new Date(today);
      tomorrow.setUTCDate(tomorrow.getUTCDate() + 1); // Tăng ngày lên 1 để xác định đến cuối ngày
      const allOrders = await Order.find({
        createdAt: {
          $gte: today,
          $lt: tomorrow,
        },
      })
        .limit(limit)
        .skip(page * limit);
      if (!allOrders) {
        return handleResFailure(ERROR_GET_ALL_ORDERS, HttpStatus.NOT_FOUND);
      }
      const numOfProds = allOrders.length;
      for (let i = 0; i < allOrders.length; i++) {
        const order = allOrders[i];
        const usernameInfo = await User.findById(order.user);
        if (!usernameInfo) {
          return handleResFailure(
            ERROR_USERNAME_ORDER_NOT_FOUND,
            HttpStatus.NOT_FOUND
          );
        }
        const addressInfo = await Address.findById(order.address);
        if (!addressInfo) {
          return handleResFailure(
            ERROR_ADDRESS_ORDER_NOT_FOUND,
            HttpStatus.NOT_FOUND
          );
        }
        orderArray.push({
          shortId: order.shortId,
          address: `${addressInfo.specificAddress} ,${addressInfo.ward} ,${addressInfo.district} ,${addressInfo.province}`,
          userName: usernameInfo.name,
          status: order.status,
          dateCreated: order.createdAt as string,
          total: order.total,
        });
      }
      return handlerResSuccess<IOrderRes>(GET_ALL_ORDERS_SUCCESS, {
        allOrders: orderArray,
        numOfProds,
      });
    } catch (error) {
      console.log("error", error);
      return handleResFailure(ERROR_GET_ALL_ORDERS, HttpStatus.BAD_REQUEST);
    }
  }
  static async updateStatusOrder(orderId: string, status: OrderStatus) {
    try {
      const orderStatus = await Order.updateOne(
        { shortId: { $eq: orderId } },
        { $set: { status: status } }
      );
      console.log(orderStatus);
      if (orderStatus.modifiedCount === 0) {
        return handleResFailure(ERROR_ORDER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
      return handlerResSuccess<string>(GET_ALL_ORDERS_SUCCESS, status);
    } catch (error) {
      console.log("error", error);
      return handleResFailure(ERROR_UPDATE_STATUS, HttpStatus.BAD_REQUEST);
    }
  }
  static async getDetailOrderById(orderId: string) {
    try {
      const orderInfoById = await Order.findOne({ shortId: orderId });
      if (!orderInfoById) {
        return handleResFailure(
          ERROR_ORDER_DETAIL_BY_ID_NOT_FOUND,
          HttpStatus.BAD_REQUEST
        );
      }
      const orderItemsIdArray: string[] = orderInfoById.orderItems as string[];
      const itemsOrderArray: IOrderItem[] = [];
      for (let i = 0; i < orderItemsIdArray.length; i++) {
        const orderItem = orderItemsIdArray[i];
        const orderItemInfo = await OrderItem.findById(orderItem);
        if (!orderItemInfo) {
          return handleResFailure(
            ERROR_ORDER_ITEM_NOT_FOUND,
            HttpStatus.NOT_FOUND
          );
        }
        const productInfo = await Product.findById(orderItemInfo.product);
        if (!productInfo) {
          return handleResFailure(
            ERROR_PRODUCT_NOT_FOUND,
            HttpStatus.NOT_FOUND
          );
        }
        itemsOrderArray.push({
          product: productInfo.name,
          price: orderItemInfo.price,
          quantity: orderItemInfo.quantity,
        });
      }
      return handlerResSuccess<IOrderItem[]>(
        GET_ALL_ORDERS_ITEMS_SUCCESS,
        itemsOrderArray
      );
    } catch (error) {
      console.log("error", error);
      return handleResFailure(ERROR_ORDER_DETAIL_BY_ID, HttpStatus.BAD_REQUEST);
    }
  }
  static async createPaymentZaloPayURL(dto: ICreateZaloPayOrder) {
    try {
      // APP INFO
      const config = {
        app_id: process.env.APP_ID,
        key1: process.env.KEY1 as string,
        key2: process.env.KEY2 as string,
        endpoint: process.env.ENDPOINT_CREATE_ORDER as string,
      };

      const embed_data = {
        redirecturl: process.env.REDIRECT_URL,
      };

      const items: any = [];
      const transID = dto.order_id;
      const order: any = {
        app_id: config.app_id,
        app_user: "ZaloPayDemo",
        app_time: Date.now(), // miliseconds
        amount: dto.amount,
        app_trans_id: `${moment().format("YYMMDD")}_${transID}`,
        bank_code: dto.bank_code,
        embed_data: JSON.stringify(embed_data),
        item: JSON.stringify(items),
        callback_url: process.env.CALLBACK_URL,
        description: `ZaloPayDemo - Thanh toán cho đơn hàng #${transID}`,
      };

      // appid|app_trans_id|appuser|amount|apptime|embeddata|item
      const data =
        config.app_id +
        "|" +
        order.app_trans_id +
        "|" +
        order.app_user +
        "|" +
        order.amount +
        "|" +
        order.app_time +
        "|" +
        order.embed_data +
        "|" +
        order.item;
      order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

      const response = await axios.post(config.endpoint, null, {
        params: order,
      });

      return handlerResSuccess<string>(
        CREAT_PAYMENT_URL_ZALOPAY_SUCCESS,
        response.data.order_url
      );
    } catch (error) {
      console.log("error: ", error);
      return handleResFailure(
        ERROR_CREAT_PAYMENT_URL_ZALOPAY,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  static async callbackZaloPay(dto: ICallBackZaloPay) {
    console.log("dto: ", dto);
    try {
      const result: { return_code: number; return_message: string } = {
        return_code: 0,
        return_message: "",
      };
      const config = {
        app_id: process.env.APP_ID,
        key1: process.env.KEY1 as string,
        key2: process.env.KEY2 as string,
        endpoint: process.env.ENDPOINT_CREATE_ORDER as string,
      };

      const dataStr = dto.data;
      const reqMac = dto.mac;

      const mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();

      if (reqMac !== mac) {
        // callback không hợp lệ
        result.return_code = -1;
        result.return_message = "mac not equal";
      } else {
        // thanh toán thành công
        // merchant cập nhật trạng thái cho đơn hàng
        const dataJson = JSON.parse(dataStr) as IDataCallbackZalopay;
        console.log(
          "update order's status = success where app_trans_id =",
          dataJson["app_trans_id"]
        );

        result.return_code = 1;
        result.return_message = "success";
      }

      return result;
    } catch (error: any) {
      console.log("error: ", error);
      return { return_code: 0, return_message: error.message };
    }
  }

  static async queryZalopayOrderStatus(app_trans_id: string) {
    try {
      const order_id = app_trans_id.split("_")[1];

      const config = {
        app_id: process.env.APP_ID,
        key1: process.env.KEY1 as string,
        key2: process.env.KEY2 as string,
        endpoint: process.env.ENDPOINT_QUERY_ORDER_STATUS as string,
      };

      const postData: any = {
        app_id: config.app_id,
        app_trans_id, // Input your app_trans_id
      };

      const data =
        postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
      postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

      const postConfig = {
        method: "post",
        url: config.endpoint,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify(postData),
      };

      const response = await axios(postConfig);

      if (response.data.return_code !== 1) {
        const order = await Order.findByIdAndDelete(order_id);
        if (order) {
          for (let i = 0; i < order.orderItems.length; i++) {
            const orderItemId = order.orderItems[i];
            await OrderItem.findByIdAndDelete(orderItemId);
          }
        }
      }

      return handlerResSuccess<IQueryZaloPayOrderStatusRes>(
        QUERY_ORDER_STATUS_ZALOPAY_SUCCESS,
        {
          orderStatus: response.data.return_code,
        }
      );
    } catch (error) {
      console.log("error: ", error);
      return handleResFailure(
        ERROR_QUERY_ORDER_STATUS_ZALOPAY,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  static async getRevenueOfCurrentYear() {
    try {
      const now = new Date().getFullYear();

      const orders = (await Order.aggregate([
        {
          $project: {
            status: "$status",
            orderItems: "$orderItems",
            year: { $year: "$createdAt" },
          },
        },
        { $match: { year: now, status: "completed" } },
        { $unwind: "$orderItems" },
        {
          $lookup: {
            from: "orderitems",
            foreignField: "_id",
            localField: "orderItems",
            as: "orderItems",
          },
        },
        { $unwind: "$orderItems" },
        {
          $group: {
            _id: "$_id",
            sum: {
              $sum: {
                $multiply: ["$orderItems.price", "$orderItems.quantity"],
              },
            },
          },
        },
      ])) as { _id: string; sum: number }[];

      return handlerResSuccess(
        GET_REVENUE_OF_CURRENT_YEAR_SUCCESS,
        orders.reduce((prev, curr) => prev + curr.sum, 0)
      );
    } catch (error) {
      return handleResFailure(
        ERROR_GET_REVENUE_OF_CURRENT_YEAR,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  static async getRevenueFollowTime(timeReport: string) {
    try {
      let query: { [index: string]: any } = {};

      if (timeReport === "month") {
        const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);
        const lastDayOfYear = new Date(new Date().getFullYear(), 11, 31);
        query = {
          createdAt: { $gte: firstDayOfYear, $lte: lastDayOfYear },
        };
      } else if (timeReport === "week") {
        const today = new Date();
        const aWeekAgo = subtractDays(today, 6);
        query = {
          createdAt: { $gte: aWeekAgo, $lte: today },
        };
      }

      let orders: IOrderRevenue[] = [];

      orders = await Order.aggregate([
        {
          $match: {
            status: "completed",
            ...query,
          },
        },
        {
          $project: {
            total: 1,
            createdAt: 1,
          },
        },
      ]);

      if (timeReport === "month") {
        const monthRevenue: IRevenueValue[] = [];

        for (let month = 0; month < 12; month++) {
          const monthOrderRevenue = orders.reduce((monthTotal, currOrder) => {
            if (currOrder.createdAt.getMonth() === month) {
              return monthTotal + currOrder.total;
            }
            return monthTotal;
          }, 0);
          monthRevenue.push({
            label: (month + 1).toString(),
            value: monthOrderRevenue,
          });
        }

        return handlerResSuccess(GET_REVENUE_FOLLOW_TIME_SUCCESS, monthRevenue);
      } else if (timeReport === "week") {
        const weekRevenue: IRevenueValue[] = [];
        const today = new Date();

        for (let day = 0; day < 7; day++) {
          const date = subtractDays(today, day);
          const dateTotalRevenue = orders.reduce((total, currOrder) => {
            if (currOrder.createdAt.getDate() === date.getDate()) {
              return total + currOrder.total;
            }
            return total;
          }, 0);

          weekRevenue.push({
            value: dateTotalRevenue,
            label:
              date.getDate().toString() +
              "/" +
              (date.getMonth() + 1).toString(),
          });
        }
        return handlerResSuccess(GET_REVENUE_FOLLOW_TIME_SUCCESS, weekRevenue);
      }
    } catch (error) {
      console.log("error: ", error);
      return handleResFailure(
        ERROR_GET_REVENUE_FOLLOW_TIME,
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
