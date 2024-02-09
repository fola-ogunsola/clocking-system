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
    SELECT id, email, full_name
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
    OR email ILIKE $1
    OR $1 IS NULL)
    AND (created_at::DATE = $2
    OR $2 IS NULL)`,
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
    // updateClockInMember: `
    // UPDATE clock-history 
    // SET clock_in = true 
    // WHERE member_id = $1`,
    clockOutMember: `
    UPDATE "clock-history" 
    SET clock_out = true 
    WHERE member_id = $1`,
    ifMemberClockInForTheDay: `
    SELECT id , clock_in, clock_out 
    FROM "clock-history" 
    WHERE member_id = $1 
    AND DATE_TRUNC('day', created_at) = CURRENT_DATE`

}