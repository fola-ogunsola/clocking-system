export default {
    loginAdmin : `SELECT id, full_name FROM admin WHERE email = $1`,
    getAdminByEmail : `SELECT * FROM admin WHERE email = $1`,
    fetchAdminPassword: `
    SELECT id, email, password
    FROM admin
    WHERE email = $1`,
    forgotAdminPassword: `
    UPDATE admin 
    SET reset_password_token = $1 
    WHERE trim(email)=$2
    RETURNING admin.id, admin.full_name, admin.email`,
    verifyPasswordToken: `
    SELECT id, email 
    FROM admin 
    WHERE email=$1 
    AND reset_password_token=$2 `,
    getAdminByEmail: `
    SELECT id, email, full_name , password
    FROM admin
    WHERE email = $1`,
    setNewAdminPassword: `
    UPDATE admin 
    SET password=$1, updated_at=now() 
    WHERE email=$2 `,
    addMember: `
    INSERT INTO members(
        first_name,
        last_name,
        email,
        phone_number,
        profile_image
    ) VALUES($1, $2, $3, $4, $5)
    `,
    getMemberByEmail: `
    SELECT first_name, email
    FROM members
    WHERE email = $1`,
    deleteMember: `
    DELETE 
    FROM members
    WHERE id = $1`,
    editMember: `
    UPDATE members
    SET first_name = $1, last_name = $2, phone_number = $3 WHERE id = $4`,
    getMemberById: `
    SELECT id 
    FROM members
    WHERE id = $1`,
    getAllMembers: `
    SELECT 
    id , profile_image, 
    first_name , last_name ,
    email, phone_number, created_at AS date_added
    FROM members
    WHERE (TRIM(CONCAT(first_name, ' ', last_name)) ILIKE TRIM($1)
    OR TRIM(CONCAT(last_name, ' ', first_name)) ILIKE TRIM($1)
    OR (email ILIKE $1 OR $1 IS NULL)
    AND (created_at::DATE = $2 OR $2 IS NULL)`,
    getAllMembersCount: `
    SELECT
    COUNT(id) AS total_count
    FROM members
    WHERE (TRIM(CONCAT(first_name, ' ', last_name)) ILIKE TRIM($1)
    OR TRIM(CONCAT(last_name, ' ', first_name)) ILIKE TRIM($1)
    OR $1 IS NULL)
    AND (created_at::DATE = $2
    OR $2 IS NULL)`,
    getMember: `
    SELECT 
    id , profile_image, 
    first_name , last_name ,
    email, phone_number, created_at AS date_added
    FROM members
    WHERE (TRIM(CONCAT(first_name, ' ', last_name)) ILIKE TRIM($1)
    OR TRIM(CONCAT(last_name, ' ', first_name)) ILIKE TRIM($1)
    OR first_name ILIKE TRIM($1)
    OR last_name ILIKE TRIM($1)
    OR email ILIKE $1
    OR $1 IS NULL)`,
    clockInMember: `
    INSERT INTO "clock-history"(
        member_id
    ) 
    VALUES($1)
    RETURNING "clock-history".id, "clock-history".clock_in, "clock-history".clock_in_time`,
    updateClockInMember: `
    UPDATE "clock-history" 
    SET clock_in = false
    WHERE member_id = $1`,
    clockOutMember: `
    UPDATE "clock-history" 
    SET clock_out = true, clock_out_time = NOW()
    WHERE member_id = $1 AND DATE_TRUNC('day', created_at) = CURRENT_DATE`,
    ifMemberClockForTheDay: `
    SELECT id , clock_in, clock_out 
    FROM "clock-history" 
    WHERE member_id = $1 AND DATE_TRUNC('day', created_at) = CURRENT_DATE`,
    getTotalNumberOfClockIn: `
    SELECT count(clock_in) 
    FROM "clock-history"
    WHERE clock_in = 'true'`,
    getTotalNumberOfClockOut: `
    SELECT count(clock_out) 
    FROM "clock-history"
    WHERE clock_out = 'false'`,
    getTotalNumberOfMembers: `
    SELECT count(*)        
    FROM "members"`,
    recentlyAddedMembers: `
    SELECT first_name, last_name, email, profile_image, created_at 
    FROM "members" 
    ORDER BY created_at DESC
    LIMIT 10;`,
    recentlyClockInMembers: `
    SELECT 
    members.id,
    CONCAT(members.first_name, ' ', members.last_name) AS full_name,
    members.email,
    members.profile_image, 
    "clock-history".clock_in, 
    "clock-history".created_at 
    FROM members 
    LEFT JOIN "clock-history" 
    ON "clock-history".member_id = members.id 
    WHERE "clock-history".clock_in = 'true'
    ORDER BY "clock-history".created_at DESC
    LIMIT 5;`,
    getAllMembersWithCheckInAndCheckOut:`
    SELECT
        members.id,
        members.profile_image, 
        CONCAT(members.first_name, ' ', members.last_name) AS full_name,
        members.email, members.phone_number, 
        "clock-history".clock_in_time, "clock-history".clock_out_time, "clock-history".created_at AS date_added
    FROM members LEFT JOIN "clock-history" ON "clock-history".member_id = members.id
    WHERE 
        TRIM(CONCAT(members.first_name, ' ', members.last_name)) ILIKE TRIM($1)
        OR 
        TRIM(CONCAT(members.last_name, ' ', members.first_name)) ILIKE TRIM($1)
        OR 
        (members.email ILIKE $1 OR $1 IS NULL)
        AND ("clock-history".created_at::DATE = $2 OR $2 IS NULL)`,
    getAllMembersWithCheckInAndCheckOutCount: `
    SELECT
        COUNT(members.id) AS total_count
    FROM members LEFT JOIN "clock-history" ON "clock-history".member_id = members.id
    WHERE 
        TRIM(CONCAT(members.first_name, ' ', members.last_name)) ILIKE TRIM($1)
        OR 
        TRIM(CONCAT(members.last_name, ' ', members.first_name)) ILIKE TRIM($1)
        OR 
        (members.email ILIKE $1 OR $1 IS NULL)
        AND ("clock-history".created_at::DATE = $2 OR $2 IS NULL)`,
        
}

