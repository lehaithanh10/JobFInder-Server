import admin from "firebase-admin";
import * as firebaseAccountCredentials from "./serviceAccountKey.json";

const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const uploadFileToFireBase = async (file) => {
  const bucket = admin.storage().bucket("job-finder-7324d.appspot.com");
  const blob = bucket.file(file.originalname);
  const stream = blob.createWriteStream({
    resumable: false,
    metadata: {
      contentType: file.mimetype,
    },
  });

  return new Promise((resolve, reject) => {
    stream.on("error", (err) => {
      console.error(err);
      reject(err);
    });

    stream.on("finish", async () => {
      blob
        .makePublic()
        .then(() => {
          return blob.publicUrl();
        })
        .then((url) => {
          resolve(url);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });

    stream.end(file.buffer);
  });
};

export { admin };
