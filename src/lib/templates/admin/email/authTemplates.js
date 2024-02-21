// import config from '../../../../config';

export const adminForgotPassword = (data) => `
<tr>
  <td>
    <h2 style="font-family: 'Figtree';font-style: normal;font-weight: 500;font-size: 20px;line-height: 36px;color: #84868c;">
    Hi ${data.fullname},
    </h2>
  </td>
</tr>

<tr>
  <td>
    <p style="font-family: 'Figtree';font-style: normal;font-weight: 400;font-size: 18px;line-height: 24px;color: #84868c;margin-bottom: 30px;">
      You requested to change your password. <br>
      Kindly use the verification code below to reset your password.
    </p>
  </td>
</tr>

<tr border="0" cellspacing="0" cellpadding="0" width="100%">
  <td style=" background-color:#f2faf1;padding: 12px 35px;width: 100%;height: 35px;border-radius: 8px;"
  align="center">
    <span style=" text-decoration: none; display: inline-block;font-family: 'Figtree';font-style: normal;font-weight: 700;
      font-size: 20px;line-height: 24px;text-align: center;color: #1a201d;letter-spacing: 3px;">
      ${data.resetPasswordToken}
    </span>
  </td>
</tr>

<tr>
  <td style="padding-bottom: 40px">
    <p style="font-family: 'Figtree';font-style: normal;font-weight: 400;font-size: 18px;line-height: 24px;color: #84868c;margin-bottom: 30px;">
    If you did not request a new password, please let us know immediately by replying to this email.
    </p>
  </td>
</tr>`;

export const adminResetPassword = (data) => `
<tr>
  <td>
    <h2 style="font-family: 'Figtree';font-style: normal;font-weight: 500;font-size: 20px;line-height: 36px;color: #84868c;">
    Hi ${data.fullname},
    </h2>
  </td>
</tr>

<tr>
  <td>
    <p style="font-family: 'Figtree';font-style: normal;font-weight: 400;font-size: 18px;line-height: 24px;color: #84868c;margin-bottom: 30px;">
    Your password has been successfully reset.
    </p>
  </td>
</tr>

<tr border="0" cellspacing="0" cellpadding="0" width="100%">

<tr>
  <td style="padding-bottom: 40px">
    <p style="font-family: 'Figtree';font-style: normal;font-weight: 400;font-size: 18px;line-height: 24px;color: #84868c;margin-bottom: 30px;">
    if you didn’t initiate reset password, kindly reach out to support.
    </p>
  </td>
</tr>`;