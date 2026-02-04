import axiosInstance from "../Interceptor/AxiosInterceptor";

const uploadMedia = async (data: any) => {
  const formData =new FormData();
  formData.append("file", data);  
  return axiosInstance
    .post("/media/upload", formData, { headers: { "Content-Type": "multipart/form-data" } })
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const getMedia = async (id: any) => {
  return axiosInstance
    .get(`/media/${id}`)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export { uploadMedia, getMedia };
