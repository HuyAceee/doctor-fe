import { createAsyncThunk } from "@reduxjs/toolkit";
import markdownApi from "store/api/markdownApi";
import { IMarkdownBody } from "store/types";

export const handleMarkdown = createAsyncThunk(
  "home/markdown",
  async (body: IMarkdownBody) => {
    const res = await markdownApi.handleMarkdown(body);
    return res;
  }
);
