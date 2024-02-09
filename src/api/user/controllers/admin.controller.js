import dayjs from 'dayjs';
const bcrypt = require('bcryptjs');
import authQueries from '../queries/queries.auth'
import { processAnyData, processNoneData} from '../services/services.db';
import Response from '../../../lib/http/lib.http.responses';
import enums from '../../../lib/enums';
import * as Helpers from '../../../lib/utils/admin/lib.utils.admin.helper'
import MemberPayload from '../../../lib/payloads/admin/lib.payload.admin.admin'


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