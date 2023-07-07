import { config } from "dotenv";

config();
import { Injectable } from "@nestjs/common";
import { CourierMessageDto } from "./dto/courier.dto";
const { CourierClient } = require("@trycourier/courier");

@Injectable()
export class CourierUtil {
  constructor() {}

  async sendEmail(courierMessage: CourierMessageDto) {
    const courier = CourierClient({ authorizationToken: process.env.COURIER_AUTH_TOKEN });
    await courier.send(courierMessage);
  }
}
