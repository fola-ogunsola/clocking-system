import dayjs from 'dayjs';
const bcrypt = require('bcryptjs');
import authQueries from '../queries/queries.auth'
import { processAnyData, processOneOrNoneData} from '../services/services.db';
import Response from '../../../lib/http/lib.http.responses';
import enums from '../../../lib/enums';
import MemberPayload from '../../../lib/payloads/admin/lib.payload.admin.admin'

/** 
*  Admin Fetch One members
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {Next} next - Call the next operation.
 * @returns { JSON } - A JSON response containing user details
 * @memberof MemberController
 */


export const fetchOneMenber = async(req, res, next) =>  {
    try {
        console.log(req.query);
        const getMember = await processAnyData(authQueries.getMember, [ req.query.search ? `%${req.query.search.trim()}%` : null ]);
        logger.info(`${enums.CURRENT_TIME_STAMP}, Info: successfully fetched member from the DB memberClockIn.admin.controllers.admin.js`);
        const data = {
            getMember
          };
          return Response.success(res, enums.EXPORT_MEMBER_TO_CLOCK_IN_SUCCESSFULLY, enums.HTTP_OK, data);
    }  catch (error) {
        error.label = enums.FETCH_ONE_MEMBERS_CONTROLLER ;
        logger.error(`fetching one member in the DB failed:::${enums.FETCH_ONE_MEMBERS_CONTROLLER }`, error.message);
        return next(error);
      }
    
};



/**
 * clock-in Member
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {Next} next - Call the next operation.
 * @returns {object} - Returns admin login details.
 * @memberof MemberController
 */
export const clockInMember = async(req, res, next) => {
    const id = req.params.id;
    try {
        const [ ifMemberClockInForTheDay ] = await processAnyData(authQueries.ifMemberClockInForTheDay, [id])
        if(ifMemberClockInForTheDay){
            logger.info(`${enums.CURRENT_TIME_STAMP}, ${id} Info:
            member already clock in clockInMember.admin.controllers.admin.js`);
            return Response.error(res, enums.MEMBER_ALREADY_CLOCK_IN, enums.HTTP_CONFLICT); 
        }
        const response = await processOneOrNoneData(authQueries.clockInMember, [id]);
        console.log(response)
        logger.info(`${enums.CURRENT_TIME_STAMP}, ${id} Info:
        member successfully clock in clockInMember.admin.controllers.admin.js`);
        return Response.success(res, enums.CLOCK_IN_MEMBER, enums.HTTP_OK, response);
    }
    catch(error) {
        error.label = enums.CLOCK_IN_MEMBER_CONTROLLER
        logger.error(`failed to clock in member:::${enums.CLOCK_IN_MEMBER_CONTROLLER}`, error.message);
        console.log(error)
    }
};


/**
 * clock-out Member
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {Next} next - Call the next operation.
 * @returns {object} - Returns admin login details.
 * @memberof MemberController
 */
export const clockOutMember = async(req, res, next) => {
    const id = req.params.id;
    try {
        // const ifMemberClockInForTheDay  = await processOneOrNoneData(authQueries.ifMemberClockInForTheDay, [id])
        // if(ifMemberClockInForTheDay.clock_out  == false ){
        //     logger.info(`${enums.CURRENT_TIME_STAMP}, ${id} Info:
        //     you are yet to clock in, kindly check in  clockOutMember.member.controllers.admin.js`);
        //     return Response.error(res, enums.MEMBER_ALREADY_CLOCK_IN, enums.HTTP_CONFLICT); 
        // }
        await processAnyData(authQueries.clockOutMember, [id]);
        logger.info(`${enums.CURRENT_TIME_STAMP}, ${id} Info:
        member successfully clock out from the DB clockOutMember.admin.controllers.admin.js`);
        return Response.success(res, enums.CLOCK_OUT_MEMBER, enums.HTTP_OK);
       } catch(error) {
           error.label = enums.CLOCK_OUT_MEMBER_CONTROLLER 
           logger.error(`clock out member failed:::${enums.CLOCK_OUT_MEMBER_CONTROLLER }`, error.message);
           console.log(error)
       }
};