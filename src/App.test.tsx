import React from 'react';
import App from '../src/AppBackup';
import { mount } from 'enzyme';

describe('App', () => {
    it('should render button', () => {
        const wrapper = mount(<App/>)
        expect(wrapper.find('button').exists()).toBe(true)
    })

});