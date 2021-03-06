/**
 * @author: Yang Dongnan
 * 2021年11月17日
 */

import { RoutesMicroApp, MicroAppsConfigOption } from '../typings';

const getActiveRule = (hash: string) => (location: Location) => location.hash.startsWith(hash);

/**
 * 设置路由激活
 * @param {string} mode 必须 mode | history
 * @param name 必须 test-app
 * @returns router.path
 */
export const activeRuleCheck = (mode: 'hash' | 'history', name: string) => {
  return mode === 'hash' ? getActiveRule(`#/${name.split('-')[0]}`) : `/${name.split('-')[0]}`;
};

/**
 * @param {RoutesMicroApp[]} microApps 注册的微应用集合
 * @param {Option} option 环境配置和容器节点配置
 */
export function registerMicroAppsConfig(microApps: RoutesMicroApp[], option: MicroAppsConfigOption) {
  const { mode, container = '#micro-app-container', env = 'dev', devParam = [] } = option;
  microApps.forEach((apps: RoutesMicroApp) => {
    const entry = env === 'dev' && devParam && devParam.find(({ key, url }: any) => key === apps.name) || null;
    apps.activeRule = activeRuleCheck(mode, apps.name);
    apps.container = container;
    apps.entry = entry && env ? entry.url : `/${apps.name}/`;
  });
}
