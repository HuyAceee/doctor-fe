export interface IGetUserDetailBody {
  id: string;
}

export interface IUserDetail {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  gender: string;
  roleId: string;
  phoneNumber: string;
  positionId: string;
  image: string;
  createAt: string;
  updateAt: string;
}

export interface IDoctorInfo {
  id: string;
  doctorId: string;
  priceId: string;
  provinceId: string;
  paymentId: string;
  addressClinic: string;
  nameClinic: string;
  note: string;
  count: string;
}
