export default {
    fetchMembers: (query) => [
      query.search ? `%${query.search.trim()}%` : null,
      query.date,
    //   query.to_date,
      query.page ? (query.page - 1) * (query.per_page || 10) : 0,
      query.per_page ? query.per_page : '10'
    ],

    // clockMembers: (body) => {
    //     query.search ? `%${query.search.trim()}%` : null,
    //     body.first_name.trim().toLowerCase(), 
    //     body.last_name.trim().toLowerCase(), 
    //     body.email.trim().toLowerCase()
    // }
 };

