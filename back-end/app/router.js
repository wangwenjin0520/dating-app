'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/profile/basic-info/get', controller.profile.userProfile);
  router.get('/profile/looks/get', controller.profile.userLooks);
  router.get('/profile/hobbies/get', controller.profile.userHobbies);
  router.get('/profile/covid/get', controller.profile.userCovid);
  router.post('/profile/basic-info/update', controller.profile.updateProfileBasicInfo);
  router.post('/profile/looks/update', controller.profile.updateLooks);
  router.post('/profile/hobbies/update', controller.profile.updateHobbies);
  router.post('/profile/covid/update', controller.profile.updateCovid);
  // router.post('/update_profile_covid', controller.home.updateProfile_covid);

  router.get('/validate_user', controller.home.validateUser);
  router.post('/add_user', controller.home.addUser);

  /* Login */
  router.post('/login/signup', controller.login.signup);
  router.post('/login/signup/code', controller.login.signup_verify);
  router.post('/login/login', controller.login.usernamePasswordCheck);
  router.post('/login/verify', controller.login.verificationCheck);
  router.get('/login/code', controller.login.updateLoginCode)
  router.get('/login/logout', controller.login.logout);

  /* Get user list */
  router.get('/search-mate', controller.userList.getUserListInSearchMate);
  router.get('/search-mate-with-filter', controller.userList.getUserListInSearchMateWithFilter);
  router.get('/my-likes', controller.userList.getMyLikesUsers);
  router.get('/my-dislikes', controller.userList.getMyDislikesUsers);
  router.get('/who-likes-me', controller.userList.getUsersWhoLikesMe);


  /* Like */
  router.get('/get-like-status', controller.like.getLikeStatus);
  router.post('/like-user', controller.like.likeUser);
  router.post('/dislike-user', controller.like.dislikeUser);
  router.post('/normal-user', controller.like.normalUser);

  /* Date */
  router.post('/send-date', controller.date.sendDate);
  router.get('/get-date-from-me', controller.date.getDateFromMe);
  router.get('/get-date-to-me', controller.date.getDateToMe);
  router.post('/cancel-date', controller.date.cancelDate);
  router.post('/accept-date', controller.date.acceptDate);
  router.post('/reject-date', controller.date.rejectDate);
  // router.post('/get-like-status', controller.like.getLikeStatus);

};
