import { config } from "dotenv";

config();
import { Injectable } from "@nestjs/common";
const sendgrid = require("@sendgrid/mail");

import { SendGridMessageDto } from "./dto/sendGrid.dto";

@Injectable()
export class SendGridUtil {
  constructor() {
    sendgrid.setApiKey(process.env.SEND_GRID_API_KEY);
  }

  async sendEmail(sendGridMessage: SendGridMessageDto) {
    await sendgrid.send(sendGridMessage);
  }
}
