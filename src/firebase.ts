import admin from 'firebase-admin'
import dotenv from 'dotenv'

dotenv.config()

const serviceAccount = process.env.PROD === 'true' ? (require("../keys/serviceAccountKeyProd")) : (require("../keys/serviceAccountKeyDev.json"))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  
  export default admin;


