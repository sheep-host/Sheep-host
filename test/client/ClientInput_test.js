import React from 'react';
import { mount, render, shallow } from 'enzyme';
import { expect } from 'chai';

import ClientInput from '../../client/components/clientInput';

describe('Client Input', () => {
  it('should render a form', () => {
    const wrapper = render(<ClientInput />);

    expect(wrapper.find('.jumbotron')).to.have.html('<form>');
  });
});