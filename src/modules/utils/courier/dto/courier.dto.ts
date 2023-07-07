export class CourierMessageDto {
  message: {
    to: {
      email: string;
    };
    template: string;
    data: {
      jobName: string;
      companyName: string;
      employeeName: string;
    };
  };
}
