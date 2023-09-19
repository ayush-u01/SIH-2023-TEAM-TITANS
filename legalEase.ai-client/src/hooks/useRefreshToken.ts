import axios from "axios";

const useRefreshToken = () => {
  const refresh = async () => {
    const token = localStorage.getItem("refreshToken");
    console.log("token: ", token);

    const response = await axios.post(
      "https://ec2-13-232-131-158.ap-south-1.compute.amazonaws.com/api/auth/refreshToken",
      {
        refreshToken: token,
      }
    );

    console.log(response?.data.data.accessToken);
    localStorage.setItem("accessToken", response?.data.data.accessToken);
    return response?.data.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
