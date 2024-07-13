import {
  Body,
  Controller,
  Request,
  Post,
  Route,
  Security,
  Tags,
  Get,
  Query,
  Put,
} from "tsoa";
import { OrderService } from "../services/order.service";
import {
  ICallBackZaloPay,
  ICreateOrder,
  ICreateZaloPayOrder,
  IQueryZaloPayOrderStatus,
} from "../dto/request";
import { IGetUserAuthInfoRequest } from "../types/express";
import { OrderStatus } from "../constances/enum";
import { IUpdateStatus } from "../dto/response/order.dto";
import { ICreateMAC } from "../dto/response/order.dto";

@Tags("Orders")
@Route("orders")
export class OrdersController extends Controller {
  @Security("jwt", ["user"])
  @Post()
  public async createOrder(
    @Body() body: ICreateOrder,
    @Request() request: IGetUserAuthInfoRequest
  ) {
    return OrderService.createOrder(body, request.user.userId);
  }

  @Security("jwt", ["user"])
  @Get("/history")
  public async getOrderHistoryfollowStatus(
    @Query("status") status: OrderStatus,
    @Request() request: IGetUserAuthInfoRequest
  ) {
    return OrderService.getOrderHistoryFollowStatus(
      request.user.userId,
      status
    );
  }

  @Get("/pagination")
  public async getAllOrders(
    @Query("limit") limit: number,
    @Query("page") page: number
  ) {
    return OrderService.getAllOrders(limit, page);
  }
  @Get("/order-follow-date/pagination")
  public async getOrdersFollowDate(
    @Query("limit") limit: number,
    @Query("page") page: number
  ) {
    return OrderService.getOrdersFollowDateNow(limit, page);
  }
  @Put("/update-status")
  public async updateStatusOrder(
    @Query("order-id") orderId: string,
    @Query("status") status: OrderStatus
  ) {
    return OrderService.updateStatusOrder(orderId, status);
  }
  @Get("/order-by-id")
  public async getDetailOrderById(@Query("order-id") orderId: string) {
    return OrderService.getDetailOrderById(orderId);
  }
  // @Post("/pay-with-zalopay")
  // public async payWithZalopay(@Body() dto: ICreateZaloPayOrder) {
  //   return OrderService.createPaymentZaloPayURL(dto);
  // }

  // @Post("/callback-zalo-pay")
  // public async callbackZaloPay(@Body() dto: ICallBackZaloPay) {
  //   return OrderService.callbackZaloPay(dto);
  // }

  // @Post("/query-zalopay-order-status")
  // public async queryZalopayOrderStatus(@Body() dto: IQueryZaloPayOrderStatus) {
  //   return OrderService.queryZalopayOrderStatus(dto.app_trans_id);
  // }

  @Security("jwt", ["admin"])
  @Get("/revenue")
  public getRevenueFollowTime(@Query() timeReport: string) {
    return OrderService.getRevenueFollowTime(timeReport);
  }

  @Security("jwt", ["admin"])
  @Get("/revenue-current-year")
  public async getRevenueOfCurrentYear() {
    return OrderService.getRevenueOfCurrentYear();
  }
}
