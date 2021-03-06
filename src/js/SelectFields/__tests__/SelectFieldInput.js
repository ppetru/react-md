/* eslint-env jest */
/* eslint-disable max-len */
import React from 'react';
import { shallow, mount } from 'enzyme';

import SelectFieldInput from '../SelectFieldInput';
import IconSeparator from '../../Helpers/IconSeparator';
import FontIcon from '../../FontIcons/FontIcon';

jest.useFakeTimers();

const PROPS = {
  id: 'test-field',
  name: 'something-select',
  value: 3,
  dropdownIcon: <FontIcon>arrow_drop_down</FontIcon>,
};

describe('SelectFieldInput', () => {
  it('should render correctly', () => {
    const field = shallow(<SelectFieldInput {...PROPS} />);
    expect(field.render()).toMatchSnapshot();

    field.setProps({ style: { height: 150 }, className: 'test-name' });
    expect(field.render()).toMatchSnapshot();

    field.setProps({ activeLabel: 'Something' });
    expect(field.render()).toMatchSnapshot();

    field.setProps({ placeholder: 'Nothing' });
    expect(field.render()).toMatchSnapshot();

    field.setProps({ disabled: true });
    expect(field.render()).toMatchSnapshot();

    field.setProps({ below: true });
    expect(field.render()).toMatchSnapshot();

    field.setProps({ disabled: false });
    expect(field.render()).toMatchSnapshot();
  });

  it('should apply the transition name when a new value occurs for the input', () => {
    const props = {
      ...PROPS,
      transitionName: 'test-drop',
      transitionTime: 200,
      value: 'a',
    };

    const input = mount(<SelectFieldInput {...props} />);
    let separator = input.find(IconSeparator).get(0);
    expect(separator.props.labelClassName).toBe(null);

    input.setProps({ value: 'b' });
    separator = input.find(IconSeparator).get(0);
    expect(separator.props.labelClassName).toBe(`${props.transitionName}-enter`);

    jest.runOnlyPendingTimers();
    separator = input.find(IconSeparator).get(0);
    expect(separator.props.labelClassName).toBe(`${props.transitionName}-enter ${props.transitionName}-enter-active`);

    jest.runOnlyPendingTimers();
    separator = input.find(IconSeparator).get(0);
    expect(separator.props.labelClassName).toBe(null);
  });
});
