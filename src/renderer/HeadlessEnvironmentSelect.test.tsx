
/**
 * @jest-environment
 */

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { Checkbox } from '@getflywheel/local-components';
import { HeadlessEnvironmentSelect } from './HeadlessEnvironmentSelect';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Adapter from 'enzyme-adapter-react-16';
import * as LocalRenderer from '@getflywheel/local/renderer';

Enzyme.configure({ adapter: new Adapter() });

describe('HeadlessEnvironmentSelect', () => {
	const props = {
		siteInfo: { siteName: 'Jacks Flapjacks' },
	};

	it('renders a </Checkbox> with correct label text', () => {
		const componentNode = mount(
			<Provider store={store}>
				<HeadlessEnvironmentSelect
					/* eslint-disable react/jsx-props-no-spreading */
					{...props}
					/* eslint-enable react/jsx-props-no-spreading */
				/>,
			</Provider>,
		);

		const checkboxLabelText = 'Use Atlas framework to build this site headless (beta)';

		const checkbox = componentNode.find(Checkbox);

		expect(checkbox).toBeTruthy();

		expect(checkbox.props().label).toBe(checkboxLabelText);

		expect(componentNode).toMatchSnapshot();
	});

	it('correctly updates state when checked', () => {
		const componentNode = mount(
			<Provider store={store}>
				<HeadlessEnvironmentSelect
					/* eslint-disable react/jsx-props-no-spreading */
					{...props}
					/* eslint-enable react/jsx-props-no-spreading */
				/>,
			</Provider>,
		);

		const checkbox = componentNode.find('input');

		const { siteName } = props.siteInfo;

		checkbox.simulate('change', { checked: true });

		const state = componentNode.props().store.getState();

		expect(state.addHeadlessEnvironment[siteName]).toBeTruthy();

		expect(LocalRenderer.ipcAsync).toHaveBeenCalledTimes(1);
	});
});
