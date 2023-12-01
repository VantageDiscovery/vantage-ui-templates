import axios, { AxiosResponse } from "axios";

const mockPath = "http://localhost:3000/api";

const apiCall = async (): Promise<string> =>
  axios
    .get(`${mockPath}/`)
    .then((response: AxiosResponse) => response.data)
    .catch(() => "This api call yet doesnt exist");

const mockService = {
  apiCall,
};

export default mockService;
