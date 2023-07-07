export enum ENotificationType {
  WELCOME = "welcome",
  REJECT_JOB = "reject-job",
  ACCEPT_JOB = "accept-job",
}

type MessageData = {
  notificationType: ENotificationType;
  payload: {
    toEmail: string;
    jobName?: string;
    companyName?: string;
    employeeName?: string;
  };
};

export const getMessagePayload = (messageData: MessageData) => {
  if (messageData.notificationType === ENotificationType.REJECT_JOB) {
    return {
      message: {
        to: {
          email: "haithuthanhtien@gmail.com",
        },
        template: "YD6407ZF1N48X6QJ7MR4J2DNQT2S",
        data: {
          jobName: messageData.payload.jobName,
          companyName: messageData.payload.companyName,
          employeeName: messageData.payload.employeeName,
        },
      },
    };
  } else {
    return {
      message: {
        to: {
          email: "haithuthanhtien@gmail.com",
        },
        template: "E2EEAHJ9M94Y2ANHRAKDENVPCGQB",
        data: {
          jobName: messageData.payload.jobName,
          companyName: messageData.payload.companyName,
          employeeName: messageData.payload.employeeName,
        },
      },
    };
  }
};
