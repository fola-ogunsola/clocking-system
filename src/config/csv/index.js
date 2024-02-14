const fs = require("fs");
const fastcsv = require("fast-csv");
import { processNoneData} from '../../api/user/services/services.db';
// import { db } from '../db/index';
import authQueries from '../../api/user/queries/queries.auth';
import enums from '../../lib/enums';
import Response from '../../lib/http/lib.http.responses';


export const uploadCsvFile = async(req, res, next) => {

    const data = req.body.data;

    try {
        data.forEach(async row => {
            await processNoneData(authQueries.addMember, [row.first_name, row.last_name, row.email, row.phone_number, row.profile_image])
            logger.info(`${enums.CURRENT_TIME_STAMP}, ${req.body.email}:::Info: admin successfully add member signUpMember.admin.controllers.admin.js`);
        });
        return Response.success(res, enums.MEMBER_SUCCESSFULLY_ADDED, enums.HTTP_CREATED, data);

    } catch (error) {
        logger.info(`${enums.CURRENT_TIME_STAMP}, Failed to upload members`);
        console.log(error)
    }

}

