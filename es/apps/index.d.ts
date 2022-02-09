import { UseMicroAppParam } from '../typings';
declare class UseMicroApp {
    constructor({ version, option, Vue, render, VueRouter }: UseMicroAppParam, isLogs?: boolean);
    render(appProps?: any): void;
    bootstrap(): Promise<void>;
    mount(props: any): void;
    unmount(): void;
    update(props: any): Promise<any>;
    start(): void;
    v2(container: any, props: {
        [T: string]: any;
    }): void;
    v3(container: any, props: {
        [T: string]: any;
    }): void;
}
export default UseMicroApp;
