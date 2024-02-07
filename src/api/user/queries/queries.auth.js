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
    SET first_name = $1, last_name = $2, phone_number = $3 WHERE id = $4`
     
}