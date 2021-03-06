import { registerRouteConfig } from './registerRouteConfig';
import subject from '../common/rxjs';
class UseMicroApp {
    constructor({ version = '2', option, Vue, render, VueRouter }, isLogs) {
        const { history, routes = [], name, component, store, local = false } = option;
        if (!component) {
            throw new Error('component is not define');
        }
        const self = this;
        self.$version = version;
        self.$log = isLogs;
        self.$name = name;
        self.$history = history;
        self.$routes = routes;
        self.$component = component;
        self.$activeRule = `${name.split('-')[0]}`;
        self.$local = local ? '/' : `${name}`;
        self.$vue = Vue;
        self.app = render;
        self.$vueRouter = VueRouter;
        self.$store = store;
    }
    render(appProps = {}) {
        const self = this;
        const { container, props = {} } = appProps;
        const routeOption = registerRouteConfig(self.$routes, {
            history: self.$history,
            component: self.$component,
            activeRule: self.$activeRule,
            local: self.$local
        });
        if (self.$vueRouter === void 0) {
            self.$router = null;
        }
        else {
            self.$router = new self.$vueRouter(routeOption);
        }
        if (self.$log) {
            console.log(`Init ${self.$name} Instance ==> `, {
                dom: container,
                props
            });
        }
        Number(self.$version) === 2 ? self.v2(container, props) : self.v3(container, props);
    }
    updateProps(updateProps = {}) {
        const { props = {} } = updateProps;
        const self = this;
        if (self.$log) {
            console.log(`Update ${self.$name} Props =>`, props);
        }
        subject.next(props);
    }
    bootstrap() {
        return Promise.resolve();
    }
    mount(props) {
        const self = this;
        self.render(props);
    }
    unmount() {
        const self = this;
        if (self.$version === '2') {
            self.instance.$destroy();
            self.instance.$el.innerHTML = '';
        }
        else {
            self.instance.unmount();
        }
        self.instance = null;
        self.$router = null;
        self.$store = null;
    }
    update(props) {
        const self = this;
        self.updateProps(props);
    }
    start() {
        const self = this;
        if (window.__POWERED_BY_QIANKUN__) {
            __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
        }
        if (!window.__POWERED_BY_QIANKUN__) {
            self.render();
        }
        if (self.$log) {
            console.log('Start Micro App', `${self.$name} ==>`, {
                ??????????????????: window.__POWERED_BY_QIANKUN__,
                ????????????: self.$name,
                vue??????: self.$version,
                ????????????Log: self.$log,
                ????????????????????????: self.$local,
                ???????????????: self.$component,
                ????????????store: self.$store ? true : false,
                ??????????????????: self.$vueRouter ? true : false,
                ????????????: self.$history,
                ????????????: self.$activeRule
            });
        }
    }
    v2(container, props) {
        const self = this;
        self.instance = new self.$vue({
            router: self.$router,
            store: self.$store || null,
            render: (h) => h(self.app)
        });
        self.instance.$mount(container ? container.querySelector('#app') : '#app');
        subject.next(props);
    }
    v3(container, props) {
        const self = this;
        self.instance = self.$vue(self.app);
        if (self.$router) {
            self.instance.use(self.$router);
        }
        if (self.$store) {
            self.instance.use(self.$store);
        }
        self.instance.mount(container ? container.querySelector('#app') : '#app');
        subject.next(props);
    }
}
export default UseMicroApp;
