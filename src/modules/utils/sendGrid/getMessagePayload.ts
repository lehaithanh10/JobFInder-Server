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
      to: messageData.payload.toEmail,
      from: "jobfinderofficialbetad@gmail.com",
      subject: `Notification from ${messageData.payload.jobName} - ${messageData.payload.companyName}`,
      text: "Sorry! We regret to inform that you have not been selected for this job. Please keep applying you will find a suitable one.",
      html: `<p><span style="font-size: 18px;">Dear ${
        messageData.payload.employeeName || messageData.payload.toEmail
      },</span></p>
      <p><span style="font-size: 18px;">Firstly we wanted to express our sincere appreciation for your recent application for the <strong>${
        messageData.payload.jobName
      }</strong> position at <strong>${
        messageData.payload.companyName
      }</strong>.</span></p>
      <p><span style="font-size: 18px;">We regret to inform that you <strong>have not been selected</strong> for this job.</span></p>
      <p><span style="font-size: 18px;">Please do not be discouraged by this result. Your qualifications are commendable, and we believe the right opportunity is waiting for you. We encourage you to continue your job search and pursue positions that align with your aspirations.</span></p>
      <p><span style="font-size: 18px;">We wish you every success in finding your ideal job.</span></p>
      <p><span style="font-size: 18px;">Best regards,</span></p>
      <p><span style="font-size: 18px;">Job Finder Team</span></p>`,
    };
  } else if (messageData.notificationType === ENotificationType.ACCEPT_JOB) {
    return {
      to: messageData.payload.toEmail,
      from: "jobfinderofficialbetad@gmail.com",
      subject: `Notification from ${messageData.payload.jobName} - ${messageData.payload.companyName}`,
      html: `<p><span style="font-size: 18px;">Dear ${
        messageData.payload.employeeName || messageData.payload.toEmail
      },</span></p>
      <p><span style="font-size: 18px;">We are thrilled to inform you that your application for the <strong>${
        messageData.payload.jobName
      }</strong> position at <strong>${
        messageData.payload.companyName
      }</strong> has been <strong>ACCEPTED</strong>!</span></p> 
      <p><span style="font-size: 18px;">On behalf of Job Finder team, we want to extend our warmest congratulations to you.</span></p>
      <p><span style="font-size: 18px;">Your application and qualifications have stood out among the pool of candidates, and as a result, <strong>${
        messageData.payload.companyName
      }</strong> would like to invite you for an interview. This is a significant achievement and a testament to your skills, experience, and potential fit within the company.</span></p>
      <p><span style="font-size: 18px;">Once again, congratulations on this well-deserved opportunity! Your advancement to the interview stage is a significant milestone, and we wish you the best of luck as you prepare. Embrace this moment and showcase your true potential.</span></p>
      <p><span style="font-size: 18px;">Best regards,</span></p>
      <p><span style="font-size: 18px;">Job Finder Team</span></p>`,
    };
  } else {
    return {
      to: messageData.payload.toEmail,
      from: "jobfinderofficialbetad@gmail.com",
      subject: "Welcome to Job Finder",
      html: `<p><span style="font-size: 18px;">Dear ${messageData.payload.toEmail},</span></p>
      <p><span style="font-size: 18px;">Welcome to join Job Finder System! We are thrilled to have you as a new member of our community. With our platform, you will have access to a wide range of job opportunities and valuable resources to support your job search.</span></p>
      <p><span style="font-size: 18px;">We are committed to helping you find your ideal job and succeed in your career. Feel free to explore all the features and resources available on our platform.</span></p>
      <p><span style="font-size: 18px;">Thank you once again for joining with us. We look forward to assisting you in your job search journey and witnessing your career growth.</span></p>
      <p><span style="font-size: 18px;">Best regards,</span></p>
      <p><span style="font-size: 18px;">Job Finder Team</span></p>`,
    };
  }
};
