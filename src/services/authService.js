/**
 * XSandbox Local Auth Service
 * Pure local authentication service without AWS dependencies
 */

const STORAGE_KEY = 'xsandbox_user_session';

export const getCurrentUserFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};

export const saveUserSession = (userObj) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userObj));
};

export const clearUserSession = () => {
  localStorage.removeItem(STORAGE_KEY);
};

/**
 * Sign up user locally
 */
export const signUpUser = ({ username, email, password }) => {
  return new Promise((resolve) => {
    const userObj = {
      username: username || email.split('@')[0],
      email: email,
      isVerified: true,
      authProvider: 'XSandbox Engine',
      createdAt: new Date().toISOString()
    };
    saveUserSession(userObj);
    resolve({ user: userObj, success: true });
  });
};

/**
 * Sign in user locally
 */
export const signInUser = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    if (!username || !password) {
      reject(new Error('Username and password are required'));
      return;
    }
    const userObj = {
      username: username,
      email: username.includes('@') ? username : `${username}@xsandbox.io`,
      authProvider: 'XSandbox Engine',
      isVerified: true,
      loginTime: new Date().toISOString()
    };
    saveUserSession(userObj);
    resolve(userObj);
  });
};

/**
 * Sign out user
 */
export const signOutUser = () => {
  clearUserSession();
};
