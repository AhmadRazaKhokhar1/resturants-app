"use client";
import { useDispatch, useSelector, useStore } from "react-redux";
import { AppDispatch, AppStore } from "../store";
import { RootState } from "@reduxjs/toolkit/query";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>()