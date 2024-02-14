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
export const ADD_MEMBER_CONTROLLER = 'AdminController::signUpMember';
export const CHECK_IF_MEMBER_EMAIL_ALREADY_EXIST_MIDDLEWARE = 'AdminAuthMiddleware::checkIfAdminEmailAlreadyExist'
export const DELETE_MEMBER_CONTROLLER = 'AdminController::deleteMember';
export const UPDATING_MEMBER_CONTROLLER = 'AdminController::updateMember';
export const GENERATE_ADMIN_PASSWORD_TOKEN_CONTROLLER = 'AdminAuthController::generateAdminPasswordResetToken';
export const CHECK_IF_MEMBER_ID_MIDDLEWARE = 'AdminAuthMiddleware::checkIfMemberIdExist'
export const FETCH_MEMBERS_CONTROLLER = 'AdminController::fetchMembers';
export const FETCH_ONE_MEMBERS_CONTROLLER = 'AdminController::fetchOneMenber';
export const CLOCK_OUT_MEMBER_CONTROLLER = 'MemberController::clockOutMember';
export const CLOCK_IN_MEMBER_CONTROLLER = 'MemberController::clockInMember';
export const FETCH_TOTALS_CONTROLLER = 'AdminController::getTotal';
export const FETCH_RECENTLY_CONTROLLER = 'AdminController::recentlyAddedMembers';
export const FETCH_RECENTLY_CLOCK_IN_CONTROLLER = 'AdminController::recentlyClockInMembers';
export const MEMBERS_FETCHED_WITH_CLOCKIN_AND_CLOCKOUT_SUCCESSFULLY_CONTROLLER = 'AdminController::fetchAllMembersWithClockInAndClockOut';
export const SET_NEW_PASSWORD_CONTROLLER = 'AdminController::checkIfMemberEmailExistForBulkUpload';
export const CHECK_IF_MEMBER_EMAIL_ALREADY_EXIST_FOR_BULK_UPLOAD_MIDDLEWARE = 'AdminAuthMiddleware::checkIfMemberEmailExistForBulkUpload'

