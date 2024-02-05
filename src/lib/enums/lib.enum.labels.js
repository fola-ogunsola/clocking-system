import dayjs from 'dayjs';

export const CURRENT_TIME_STAMP = `${dayjs().format('DD-MMM-YYYY, HH:mm:ss')}`;
export const ADMIN_LOGIN_CONTROLLER = 'AdminAuthController::login';
export const VALIDATE_ADMIN_DATA_MIDDLEWARE = 'AdminModelMiddleware::validateData';
export const VALIDATE_UNAUTHENTICATED_ADMIN_MIDDLEWARE = 'AdminAdminMiddleware::validateUnAuthenticatedAdmin';
export const COMPARE_ADMIN_PASSWORD_MIDDLEWARE = 'AdminAuthMiddleware::compareAdminPassword';
export const IS_ADMIN_PASSWORD_CREATED_MIDDLEWARE = 'AdminAuthMiddleware::isAdminPasswordCreated';
export const OTP_GENERATION_ADMIN_CONTROLLER = 'UserAuthController::otpGenerationAdmin';
export const VERIFY_ADMIN_VERIFICATION_TOKEN_MIDDLEWARE = 'AdminAuthMiddleware::verifyAdminVerificationToken';
export const SET_PASSWORD_CONTROLLER = 'AdminAuthController::setPassword';
export const VALIDATE_ADMIN_AUTH_TOKEN_MIDDLEWARE = 'AdminAuthMiddleware::validateAdminAuthToken';
export const ADD_MEMBER_CONTROLLER = 'AdminAuthController::signUpMember';
export const CHECK_IF_MEMBER_EMAIL_ALREADY_EXIST_MIDDLEWARE = 'AdminAuthMiddleware::checkIfAdminEmailAlreadyExist'
