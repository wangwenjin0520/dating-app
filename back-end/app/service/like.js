'use strict';

const Service = require('egg').Service;

class LikeService extends Service {

  async getLikeStatus(from_id, to_id) {
    const { app } = this;

    try {

      const result = await app.mysql.get('my_like', { from_id, to_id });

      if (result == null) {
        // record not exist, create a new record with status 0
        await app.mysql.insert('my_like', { from_id, to_id, like_status: 0 });
        return 0;
      }
      return result.like_status;


    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async likeUser(from_id, to_id) {
    const { app } = this;
    try {
      const { changedRows } = await app.mysql.update('my_like', { like_status: 1 }, { where: { from_id, to_id } });
      return changedRows == 1 ? 1 : -1;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async dislikeUser(from_id, to_id) {
    const { app } = this;

    try {
      const { changedRows } = await app.mysql.update('my_like', { like_status: 2 }, { where: { from_id, to_id } });
      return changedRows == 1 ? 2 : -1;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async normalUser(from_id, to_id) {
    const { app } = this;
    console.log(from_id, to_id);
    try {
      const { changedRows } = await app.mysql.update('my_like', { like_status: 0 }, { where: { from_id, to_id } });

      return changedRows == 1 ? 0 : -1;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
module.exports = LikeService;
