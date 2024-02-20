import getTemplate from './index';

export const commonTemplate = (messageType, data) => {
  const heading = {
    // adminInviteMail: 'Admin invite',
    adminForgotPassword: 'Reset your password',
    adminResetPassword: 'Password reset successful'
  };
  
  let headerText;
  switch (messageType) {
  case `${messageType}`:
    headerText = heading[messageType];
    break;
  default:
    headerText = '';
    break;
  }

  return `
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <title></title>
</head>
<body style=" background: #eeeeee; padding-top: 20px">
  <div style="font-family: Poppins; max-width: 600px; margin: 20px auto;  background: #FFFFFF;">
    <!--   HEADER   -->
    <table role="header" width="100%">
      <tr>
        <td style="padding: 40px 40px 0px; width: 73%;">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjjOxZX_leEdZWnXVrJjtx-b0Ymjp3L0-fPQ&usqp=CAU" 
          width="150px"
          alt="baobab-icon">
        </td>
      </tr>
    </table>
    
    <!--   CONTENT   -->
    <table role="content" style="padding: 40px 50px; color: #363740; width: 100%;">
      <tr>
        <td style="font-weight: 900; font-size: 1.2rem; line-height: 48px; color: #84868c; padding-bottom: 23px">
          <span>${headerText}</span>
        </td>
      </tr>
      
      ${getTemplate(messageType, data)} 

      <tr>
      <td>
        <p>Regards,</p>
        <p>The PiousClock Team</p>
      </td>
</tr>
    </table>
    <!--    FOOTER    -->
    <table role="footer" width="100%">
    <tr align="center">
      <td  style="padding: 20px 0;">
        
        <div style="color: #84868c; font-weight: 300; padding: 20px 0;  border-top: 2px solid #d9ecd4">
          <span>©${new Date(new Date()).getFullYear()} PiousClock. All rights reserved.
          </span>
        </div>
      </td>
    </tr>
  </table>
  </div>
</body>
</html>`;
};
