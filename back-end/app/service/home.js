'use strict';

const Service = require('egg').Service;
const date = require('../utils/date.js')
class HomeService extends Service {

  async userProfile(id) {
    const { app } = this;

    try {
      const result = await app.mysql.get('user_profile', { users_id: id });
      result.birthday = date.dateFormat('yyyy-MM-dd', new Date(result.birthday));
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateProfile_basic(id, first_name, last_name, age, gender, preferred_language, nationality, birthday,
                            relationship_status, profession, education, city, latitude, longitude) {
    const { app } = this;
    const row = {
      first_name: first_name,
      last_name: last_name,
      age: age,
      gender: gender,
      preferred_language: preferred_language,
      nationality: nationality,
      birthday: birthday,
      relationship_status: relationship_status,
      profession: profession,
      education: education,
      city: city,
      latitude: latitude,
      longitude: longitude,
      updated_at: app.mysql.literals.now, // `now()` on db server
    };

    const options = {
      where: {
        users_id: id,
      },
    };

    try {
      const result = await app.mysql.update('user_profile', row, options);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateProfile_covid(id, c_status, vac) {
    const { app } = this;
    const row = {
      covid_status: c_status,
      vaccinated: vac,
      updated_at: app.mysql.literals.now, // `now()` on db server
    };

    const options = {
      where: {
        users_id: id,
      },
    };

    try {
      const result = await app.mysql.update('user_profile', row, options);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async user(u_name) {
    const { app } = this;

    try {
      const result = await app.mysql.get('user', { username: u_name });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async addUser(u_name, pass) {
    const { app } = this;
    let check;
    const uid = app.uuint.uuid();

    // first we need to check if this user has been registered, either same username or email <- not used
    // const sql = `select * from users where username = ? or email = ?`;
    const sql = 'select * from user where username = ?';
    try {
      // By using placeholders, the malicious SQL will be escaped and treated as a raw string, not as actual SQL code.
      // SELECT * FROM Repository WHERE TAG = 'javascript';--' AND public = 1; before
      // SELECT * FROM Repository WHERE TAG = `javascript';--` AND public = 1; after
      check = await app.mysql.query(sql, [ u_name ]);
      // if exist
      if (!check.length == 0) {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }

    const row1 = {
      _uid: uid,
      username: u_name,
      password: pass, // hashed password
      created_at: app.mysql.literals.now, // `now()` on db server
      updated_at: app.mysql.literals.now, // `now()` on db server
    };

    try {
      await app.mysql.insert('user', row1); // add user
    } catch (error) {
      console.log(error);
      return null;
    }

    const row2 = {
      users_id: uid,
      created_at: app.mysql.literals.now, // `now()` on db server
      updated_at: app.mysql.literals.now, // `now()` on db server
    };

    try {
      const final = await app.mysql.insert('user_profile', row2); // initialise user profile
      return final;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
module.exports = HomeService;
