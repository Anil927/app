export const requestNotificationPermission = async () => {
    if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            console.log('Notification permission granted.');
        } else {
            console.log('Notification permission denied.');
        }
    } else {
        console.log('This browser does not support notifications.');
    }
};


// {
//     "subject": "mailto: <anil.byteiq@gmail.com>",
//         "publicKey": "BP1WQgGLE5sfhVDHxAMGkdbqtoaBHV-gh_burMF27fWLXYwHCqyVv7hZJ6SVsDvN79oIEfflB4s_0ao8K2NuKQU",
//             "privateKey": "r3myB0vcwfir3f8ZUqhE1HBx4i2Wh4w6bG-Gn2oMgr4"
// }