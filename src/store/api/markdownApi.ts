import axiosClient from "services/axios";
import { IMarkdownBody } from "store/types";

class MarkdownApi {
  handleMarkdown = (body: IMarkdownBody) => {
    const url = "/api/markdown";
    return axiosClient.post(url, body);
  };
}
const markdownApi = new MarkdownApi();
export default markdownApi;
