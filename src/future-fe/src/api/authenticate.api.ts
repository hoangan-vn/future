import axiosService from "./axios-service";

const API = "/api/v1";

const ENDPOINT = "authenticate";
const URL = `${API}/${ENDPOINT}`;

interface UserAuthenticate {
  token: string;
  name: string;
}
interface UserInfoRes {
  _id: string;
  name: string;
}
export const authenticateApi = {
  login: async (body: AuthenticateLogin) => {
    const response = await axiosService.post<
      IResponseSuccess<UserAuthenticate>
    >(`${URL}/login`, body);

    return response.data.data;
  },
  sendCode: async (body: EmailVerify) => {
    const response = await axiosService.post<IResponseSuccess<string>>(
      `${URL}/send-code-email`,
      body
    );

    console.log(response.data);
    return response.data.data;
  },
  register: async (body: UserInfoLogin) => {
    const response = await axiosService.post<IResponseSuccess<UserInfoRes>>(
      `${URL}/register`,
      body
    );
    console.log(response);
    return response.data.data;
  },
};
