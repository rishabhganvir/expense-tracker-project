export const useGetUserInfo = () => {
  const { usersProfileName, userPfp, userID, userIsAuth } =
    JSON.parse(localStorage.getItem("auth")) || {};

  return { usersProfileName, userPfp, userID, userIsAuth };
};
