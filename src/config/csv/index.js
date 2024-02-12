const fs = require("fs");
const fastcsv = require("fast-csv");
import { db } from '../db/index';
import authQueries from '../../api/user/queries/queries.auth'


export const uploadCsvFile = async(req, res, next) => {
    try {
        let stream = fs.createReadStream("members.csv");
        let csvData = [];
        let csvStream = fastcsv
        .parse()
        .on("data", function(data) {
            csvData.push(data);
        })
        .on("end", function() {
            // remove the first line: header
            csvData.shift();
            const data = req.body.data;
            const uploadCsvFile = processNoneData(authQueries.addMember, data);
            db.connect((err, client, done) => {
                if (err) throw err;
                try {
                csvData.forEach(row => {
                    client.query(query, row, (err, res) => {
                    if (err) {
                        console.log(err.stack);
                    } else {
                        console.log("inserted " + res.rowCount + " row:", row);
                    }
                    });
                });
                } finally {
                done();
                }
            })
            logger.info(`${enums.CURRENT_TIME_STAMP}, ${req.body.email}:::Info: admin successfully add bulk members signUpMember.admin.controllers.admin.js`);
            return Response.success(res, uploadCsvFile);
        })
        stream.pipe(csvStream);
        } catch(error){
            logger.error('Adding csv members failed'); 
            console.log(error)
        }
}

