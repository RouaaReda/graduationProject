const admin = require('firebase-admin');
const serviceAccount = require('C:/Users/roro_/Downloads/awesomeproject-af00c-firebase-adminsdk-myzoa-ace61532af.json');  // Ensure this is the correct service account key file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Function to send a notification
const sendNotification = async (token) => {
  const message = {
    notification: {
      body: 'عزيزي المستخدم يظهر لدينا ان هذه المكالمة قد تكون من محتال '
    },
    token: token,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

// Replace 'YOUR_DEVICE_FCM_TOKEN' with the actual device FCM token you got from your app
const deviceToken = 'fasXpk0fRkm9DEjuDQPKZJ:APA91bHrZ3Jk-5KpuViic4CTB39Jc_M1h9ehyxLOlYuurQ2ybWcQXBkh7-ikp_cfZtfsMLnF4eyd51NP3QUpxRh3aQewF7TRr515cNUXN_7p6-D-sKMZpm1dwL9iNMw5KHbJGBO-TOwt';
sendNotification(deviceToken);
