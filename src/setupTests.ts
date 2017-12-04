window.requestAnimationFrame = function (callback: Function) {
    setTimeout(callback, 0);
    return 0;
};

import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });