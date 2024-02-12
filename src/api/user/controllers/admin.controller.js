import dayjs from 'dayjs';
const bcrypt = require('bcryptjs');
import authQueries from '../queries/queries.auth'
import { processAnyData, processNoneData} from '../services/services.db';
import Response from '../../../lib/http/lib.http.responses';
import enums from '../../../lib/enums';
import * as Helpers from '../../../lib/utils/admin/lib.utils.admin.helper'
import MemberPayload from '../../../lib/payloads/admin/lib.payload.admin.admin'
import * as Hash from '../../../lib/utils/admin/lib.utils.admin.hash';
import { hash } from 'bcrypt';


/** 
*  Admin Add members
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {Next} next - Call the next operation.
 * @returns { JSON } - A JSON response containing user details
 * @memberof AdminController
 */


export const signUpMember = async(req, res) => {
    try{
        // const {body} = req;
        // const memberName = `${body.first_name} ${body.last_name} ${body.email} ${body.phone_number} ${body.image}`;
        var first_name = req.body.first_name;
        var last_name = req.body.last_name;
        var email = req.body.email;
        var phone_number = req.body.phone_number;
        var profile_image = req.file && req.file.location ? req.file.location : req.body.profile_image;
        const payload = [first_name, last_name , email, phone_number, profile_image]
        await processNoneData(authQueries.addMember, payload)
        logger.info(`${enums.CURRENT_TIME_STAMP}, ${req.body.email}:::Info: admin successfully add member signUpMember.admin.controllers.admin.js`);
        return Response.success(res, enums.MEMBER_SUCCESSFULLY_ADDED, enums.HTTP_CREATED);
    } catch (error) {
        logger.error(`Adding member failed:::${enums.ADD_MEMBER_CONTROLLER}`, error.message);
    }
}


/** 
*  Admin Edit member
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {Next} next - Call the next operation.
 * @returns { JSON } - A JSON response containing user details
 * @memberof AdminController
 */

 export const editMember = async(req, res) => {
    try {
        const data = [req.body.first_name, req.body.last_name, req.body.phone_number, req.params.id ]
        await processNoneData(authQueries.editMember, data)
        logger.info(`${enums.CURRENT_TIME_STAMP}, ${req.body.email}:::Info: admin successfully update member account editMember.admin.controllers.admin.js`);
        return Response.success(res, enums.MEMBER_SUCCESSFULLY_UPDATED, enums.HTTP_CREATED);
    } catch(error) {
        logger.error(`Updating member failed:::${enums.UPDATING_MEMBER_CONTROLLER}`, error.message);
    }
 }


/** 
*  Admin Delete member
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {Next} next - Call the next operation.
 * @returns { JSON } - A JSON response containing user details
 * @memberof AdminController
 */


export const deleteMember = async(req, res) => {
    const id = req.params.id;
    try {
        await processAnyData(authQueries.deleteMember, [id]);
        logger.info(`${enums.CURRENT_TIME_STAMP}, ${id} Info:
     member successfully deleted from the DB deleteMember.admin.controllers.admin.js`);
     return Response.success(res, enums.DELETE_MEMBER, enums.HTTP_OK);
    } catch(error) {
        error.label = enums.DELETE_MEMBER_CONTROLLER
        logger.error(`delete admin failed:::${enums.DELETE_MEMBER_CONTROLLER}`, error.message);
        console.log(error)
    }
;}


/** 
*  Admin Fetch members
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {Next} next - Call the next operation.
 * @returns { JSON } - A JSON response containing user details
 * @memberof AdminController
 */

export const fetchMembers = async(req, res, next) => {
    try {
        const {query} = req;
        const payload = MemberPayload.fetchMembers(query);
        // const getMembersCount = await processAnyData(authQueries.getAllMembersCount, [membersCount])
        const [ members, [ membersCount ] ] = await Promise.all([
            processAnyData(authQueries.getAllMembers, payload),
            processAnyData(authQueries.getAllMembersCount, payload)
          ]);
        logger.info(`${enums.CURRENT_TIME_STAMP},Info: successfully fetched all members from the DB fetchMembers.admin.controllers.role.js`);
        const data = {
            page: parseFloat(req.query.page) || 1,
            total_count: Number(membersCount.total_count),
            total_pages: Helpers.calculatePages(Number(membersCount.total_count), Number(req.query.per_page) || 10),
            members
          };
          return Response.success(res, enums.MEMBERS_FETCHED_SUCCESSFULLY, enums.HTTP_OK, data);
    } catch (error) {
        error.label = enums.FETCH_MEMBERS_CONTROLLER;
        logger.error(`fetching roles in the DB failed:::${enums.FETCH_MEMBERS_CONTROLLER}`, error.message);
        return next(error);
      }
};

export const fetchAllMembersWithClockInAndClockOut = async(req, res, next) =>{
    try {
        const {query} = req;
        const payload = MemberPayload.fetchMembers(query);
        // const getMembersCount = await processAnyData(authQueries.getAllMembersCount, [membersCount])
        console.log(payload)
        const [ members, [ membersCount ] ] = await Promise.all([
            processAnyData(authQueries.getAllMembersWithCheckInAndCheckOut, payload),
            processAnyData(authQueries.getAllMembersWithCheckInAndCheckOutCount, payload)
          ]);
        logger.info(`${enums.CURRENT_TIME_STAMP},Info: successfully fetched all members  with clock-in time and clock-out time from the DB fetchAllMembersWithClockInAndClockOut.admin.controllers.role.js`);
        const data = {
            page: parseFloat(req.query.page) || 1,
            total_count: Number(membersCount.total_count),
            total_pages: Helpers.calculatePages(Number(membersCount.total_count), Number(req.query.per_page) || 10),
            members
          };
          return Response.success(res, enums.MEMBERS_FETCHED_WITH_CLOCKIN_AND_CLOCKOUT_SUCCESSFULLY, enums.HTTP_OK, data);
    } catch (error) {
        console.log(error)
        error.label = enums.MEMBERS_FETCHED_WITH_CLOCKIN_AND_CLOCKOUT_SUCCESSFULLY_CONTROLLER;
        logger.error(`fetching clock-in and clock-out time in the DB failed:::${enums.MEMBERS_FETCHED_WITH_CLOCKIN_AND_CLOCKOUT_SUCCESSFULLY_CONTROLLER}`, error.message);
        return next(error); 
    }
}

export const getTotal = async(req, res, next) => {
    try {
        const [getTotalNumberOfClockIn, getTotalNumberOfClockOut, getTotalNumberOfMembers] = await Promise.all([
            processAnyData(authQueries.getTotalNumberOfClockIn),
            processAnyData(authQueries.getTotalNumberOfClockOut),
            processAnyData(authQueries.getTotalNumberOfMembers)
        ]);
        logger.info(`${enums.CURRENT_TIME_STAMP},Info: successfully fetched all totals from the DB getTotal.admin.controllers.role.js`);
        const data = {
            getTotalNumberOfClockIn,
            getTotalNumberOfClockOut,
            getTotalNumberOfMembers
        };
        return Response.success(res, enums.FETCHED_TOTAL_SUCCESSFULLY, enums.HTTP_OK, data);
    } catch (error) {
        error.label = enums.FETCH_TOTALS_CONTROLLER;
        logger.error(`fetching totals in the DB failed:::${enums.FETCH_TOTALS_CONTROLLER}`, error.message);
        return next(error);
      }
}

export const recentlyAddedMembers = async(req, res, next) => {
    try {
        const recentlyAddedMembers = await processAnyData(authQueries.recentlyAddedMembers)
        logger.info(`${enums.CURRENT_TIME_STAMP},Info: successfully fetched all recently added member from the DB recentlyAddedMembers.admin.controllers.role.js`);
        return Response.success(res, enums.RECENTLY_MEMBERS_FETCHED_SUCCESSFULLY, enums.HTTP_OK, recentlyAddedMembers);
    } catch (error) {
        error.label = enums.FETCH_RECENTLY_CONTROLLER;
        logger.error(`fetching recently added members in the DB failed:::${enums.FETCH_RECENTLY_CONTROLLER}`, error.message);
        console.log(error)
        return next(error);
      }
}

export const recentlyClockInMembers = async(req, res, next) => {
    try {
        const recentlyClockInMembers = await processAnyData(authQueries.recentlyClockInMembers)
        logger.info(`${enums.CURRENT_TIME_STAMP},Info: successfully fetched all recently clock-in member from the DB recentlyAddedClockIn.admin.controllers.role.js`);
        return Response.success(res, enums.RECENTLY_CLOCK_IN_MEMBERS_FETCHED_SUCCESSFULLY, enums.HTTP_OK, recentlyClockInMembers);
    } catch (error) {
        error.label = enums.FETCH_RECENTLY_CLOCK_IN_CONTROLLER;
        logger.error(`fetching recently clock-in members in the DB failed:::${enums.FETCH_RECENTLY_CLOCK_IN_CONTROLLER}`, error.message);
        console.log(error)
        return next(error);
      }
}


export const changeAdminPassword = async(req, res, next) => {
    try {
        const email = req.body.email;
        const new_password = req.body.new_password;
        const old_password = req.body.old_password;
        const confirm_password = req.body.confirm_password;
        const {admin} = req;
        if(new_password === confirm_password){
            const comparepassword = await Hash.compareData(old_password, admin.password);
            if (comparepassword){
                const hash = await Hash.hashData(new_password.trim());
                logger.info(`${enums.CURRENT_TIME_STAMP}, ${admin.email}:::Info: New password hashed Successfully changeAdminPassword.admin.controllers.auth.js`);
                const [setNewPassword] = await processAnyData(authQueries.setNewAdminPassword, [hash, email]);
                logger.info(`${enums.CURRENT_TIME_STAMP}, ${admin.email}:::Info: New password saved in the DB setPassword.admin.controllers.auth.js`);
                return Response.success(res, enums.PASSWORD_SET_SUCCESSFULLY, enums.HTTP_OK, setNewPassword);
            }
            logger.info(`${enums.CURRENT_TIME_STAMP},Info: Check the Old Password you Provided changeAdminPassword.admin.controllers.role.js`);
            return Response.error(res, enums.PASSWORD_SET_UNSUCCESSFULLY, enums.HTTP_UNPROCESSABLE_ENTITY);
        } else {
            logger.info(`${enums.CURRENT_TIME_STAMP},Info: Your new password and comfirm password are not the same  changeAdminPassword.admin.controllers.role.js`);
            return Response.error(res, enums.PASSWORD_SET_UNCONFIRMED, enums.HTTP_UNPROCESSABLE_ENTITY);
        }
    } catch (error) {
        error.label = enums.SET_NEW_PASSWORD_CONTROLLER;
        logger.error(`Setting New Password DB failed:::${enums.SET_NEW_PASSWORD_CONTROLLER}`, error.message);
        console.log(error)
        return next(error);
      }
}