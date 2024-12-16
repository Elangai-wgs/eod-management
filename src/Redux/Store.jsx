import { configureStore } from "@reduxjs/toolkit";
import {persistStore, persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage";
import {combineReducers} from "redux";
import trainerReducer from './TrainerRedux';
import PermissionRedux from "./PermissionRedux";

const persistConfig = {
    key:"root",
    storage
};

const rootReducer = combineReducers({
    trainer: persistReducer(persistConfig, trainerReducer),
    Permissions: persistReducer(persistConfig, PermissionRedux)
});

const store = configureStore({reducer:rootReducer});

const persistor = persistStore(store);

export {store, persistor};