import cookies from "js-cookie";

const { VITE_AUTH_NAMESPACE } = import.meta.env;

export const setAuthCookie = (payloads, expires) => {
  cookies.set(VITE_AUTH_NAMESPACE, payloads, {
    expires,
  });
};

export const getAuthCookie = () => {
  const adminAuth = cookies.get(VITE_AUTH_NAMESPACE);
  return adminAuth;
};

export const removeAuthCookie = () => {
  cookies.remove(VITE_AUTH_NAMESPACE);
};
