

let allowNotifications = false;
let isGranted = Notification.permission === "granted";



export const start = () => {

  // don't allow notifications for the first 10 seconds
  const tenSeconds = 1000 * 10;
  window.setTimeout(() => allowNotifications = true, tenSeconds);

  if (Notification.permission === "default") {
    Notification.requestPermission()
      .then( permission => {
          console.log(permission, Notification.permission);
          isGranted = permission === "granted";
      });
  }
};


export const notify = ({ author, text}) => {
  if (allowNotifications && isGranted) {
    new Notification(`new message from ${author}`, {
      text,
      silent: true,
    });
  }
};
