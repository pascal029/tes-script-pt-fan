class Query {
  static queryFindUser(email) {
    const query = `
        SELECT 
            u.*
            FROM "Users" u
            WHERE u."email" ILIKE '%${email}%'
    `;

    return query;
  }

  static findByPk(id) {
    const query = `
      SELECT
        u.*
        FROM "Users" u
        WHERE u."id" = ${id}
    `;
    return query;
  }

  static insertPresence(input) {
    const query = `
      INSERT INTO "Epresence"("id_users", "type",  "waktu") VALUES ${input}
    `;
    return query;
  }

  static findAllUsers(spv_id) {
    const query = `
      SELECT *
        FROM "Users" u
        WHERE u.npp_supervisor = ${spv_id}
    `;
  }

  static getData(id_users) {
    const query = `
      SELECT 
        e.*,
        u.*
        FROM "Epresence" e JOIN "Users" u ON e.id_users = u.id
    `;
    return query;
  }
}

module.exports = Query;
