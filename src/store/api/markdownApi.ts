import axiosClient from "services/axios";
import { IGetMarkdownBody, IMarkdownBody } from "store/types";

class MarkdownApi {
  handleMarkdown = (body: IMarkdownBody) => {
    const url = "/api/markdown";
    return axiosClient.post(url, body);
  };
  getMarkdown = (params: IGetMarkdownBody) => {
    const url = "/api/markdown";
    return axiosClient.get(url, { params });
  };
}
const markdownApi = new MarkdownApi();
export default markdownApi;
