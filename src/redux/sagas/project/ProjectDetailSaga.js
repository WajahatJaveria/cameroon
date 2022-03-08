import { call, put } from "redux-saga/effects";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../../../constants/Network";
import { RestClient } from "../../../network/RestClient";
import {
  LOADING_END,
  POPULATE_PROJECT_DETAIL,
  POPULATE_SAVED_PROJECTS,
} from "../../../constants/Routes";
import { getItem } from "../../../localStorage/LocalStorage";

export function* projectDetailSaga({ payload }) {
  try {
    const params = {
      userId: getItem("userid"),
      projectId: payload,
    };

    const response = yield call(() =>
      RestClient.get(API_ENDPOINTS.projectDetail, params)
    );
    const { data } = response;
    yield put({ type: LOADING_END, payload: false });
    if (data) {
      yield put({ type: LOADING_END, payload: false });
      yield put({ type: POPULATE_PROJECT_DETAIL, payload: data });
    } else {
      yield put({ type: LOADING_END, payload: false });
      toast.error("Validation", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  } catch (error) {
    yield put({ type: LOADING_END, payload: false });
    toast.error("Error", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}