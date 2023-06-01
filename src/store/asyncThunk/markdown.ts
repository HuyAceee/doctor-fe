import { createAsyncThunk } from "@reduxjs/toolkit";
import markdownApi from "store/api/markdownApi";
import { IGetMarkdownBody, IMarkdownBody } from "store/types";

export const handleMarkdown = createAsyncThunk(
  "home/markdown",
  async (body: IMarkdownBody) => {
    const res = await markdownApi.handleMarkdown(body);
    return res;
  }
);

export const getMarkdown = createAsyncThunk(
  "home/markdown",
  async (parmas: IGetMarkdownBody) => {
    const res = await markdownApi.getMarkdown(parmas);
    return res;
  }
);
