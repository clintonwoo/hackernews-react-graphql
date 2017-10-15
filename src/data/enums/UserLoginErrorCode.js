const UserLoginErrorCode = {
  INCORRECT_PASSWORD: 'pw',
  INVALID_ID: 'invalid_id',
  LOGGED_IN: 'loggedin',
  LOGIN_UNSUCCESSFUL: 'unsuccessful',
  LOGIN_UPVOTE: 'up',
  USERNAME_TAKEN: 'id',
};
UserLoginErrorCode.messages = {
  [UserLoginErrorCode.INCORRECT_PASSWORD]: 'Incorrect password.',
  [UserLoginErrorCode.INVALID_ID]: 'User ID must be between 3 and 32 characters.',
  [UserLoginErrorCode.LOGGED_IN]: 'Logged in user must logout before logging in again.',
  [UserLoginErrorCode.LOGIN_UNSUCCESSFUL]: 'Login unsuccessful.',
  [UserLoginErrorCode.LOGIN_UPVOTE]: 'You have to be logged in to vote.',
  [UserLoginErrorCode.USERNAME_TAKEN]: 'Username is taken.',
};

export default UserLoginErrorCode;
