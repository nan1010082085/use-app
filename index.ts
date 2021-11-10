import {
  start,
  loadMicroApp,
  prefetchApps,
  initGlobalState,
  MicroAppStateActions,
  addGlobalUncaughtErrorHandler,
  removeGlobalUncaughtErrorHandler
} from 'qiankun';
import { QKOption, UseMicroAppOption } from './src/typings';
import UseMicroApp from './src/microApps';
import UseApp from './src/container';

export type QkMicroAppStateActions = MicroAppStateActions;

export {
  start,
  initGlobalState,
  loadMicroApp,
  prefetchApps,
  addGlobalUncaughtErrorHandler,
  removeGlobalUncaughtErrorHandler
};

export const QKRegisterApp = (option: QKOption) => new UseApp(option);

export const QKRegisterMicroApp = (option: UseMicroAppOption) => new UseMicroApp(option);
