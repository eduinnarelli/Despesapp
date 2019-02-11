import authReducer from '../../reducers/auth';

test('should set default logout state', () => {
  
  const state = authReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual({});

});

test('should set user id in login', () => {

  const uid = 'awes23eas';

  const state = authReducer({}, {
    type: 'LOGIN',
    uid
  });

  expect(state).toEqual({uid});

});

test('should clear user id in logout', () => {

  const state = authReducer({uid: 'asd213'}, {type: 'LOGOUT'});
  expect(state).toEqual({});

});

