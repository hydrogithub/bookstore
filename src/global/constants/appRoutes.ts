export const APP_ROUTES = {
  home: "/",
  login: "/login",
  signUp: "/signup",
  manage: "/manage",
  createBook: "/manage/create",
  updateBook: (id: string) => `/manage/update/${id}`,
};
