export const ROUTES = {
  login: {
    index: "/login",
  },
  home: "/",
  booking: {
    new: "/booking/new",
    vetify: "/booking/vetify",
  },
  notfound: "/404",
  system: {
    index: "/system",
    user: {
      index: "/system/user-management",
      create: "/system/user-management/new",
      edit: "/system/user-management/edit",
    },
    doctor: {
      index: "/system/doctor-management",
      create: "/system/doctor-management/new",
      edit_info: "/system/doctor-management/edit_info",
      plan: {
        index: "/system/doctor/plan",
        create: "/system/doctor/plan/new",
      },
    },
  },
};
export const messageError = "error.message_input_required";
export const linearGradient =
  "bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%";
