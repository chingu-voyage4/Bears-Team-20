import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Login } from './Login';

Enzyme.configure({ adapter: new Adapter() });



describe('Login Component', () => {
    let wrapper;
    // our mock login function to replace the one provided by mapDispatchToProps
    let mockLoginCallback;
    
    beforeEach(() => {
        // pass the mock function as the login prop 
        mockLoginCallback = jest.fn();
        wrapper = Enzyme.shallow(<Login onSubmitLogin={mockLoginCallback}/>)
    });
    
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Login />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    
    
    it('renders an input for the email', () => {
        const emailInputList = wrapper.find('#login-textfield-email');
        expect(emailInputList.length).toEqual(1);
        const emailInput = emailInputList.first();
        expect(emailInput.prop('name')).toEqual('email');
    });
    
    it('renders an input for the password', () => {
        const passwordInputList = wrapper.find('#login-textfield-password');
        expect(passwordInputList.length).toEqual(1);
        const passwordInput = passwordInputList.first();
        expect(passwordInput.prop('name')).toEqual('password');
    });
    
    it('should called the onSubmit callback when login button is clicked', () => {
        wrapper.find('#login-button').simulate('click');
        expect(mockLoginCallback).toHaveBeenCalledTimes(1);
    })
});
