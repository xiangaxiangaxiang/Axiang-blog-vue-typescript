import service from "./index";

export function login(data):Promise<object> {
  return service.post("/front/user/test", data, {
    headers: {
      'Content-type': 'multipart/form-data'
    }
  });
}
