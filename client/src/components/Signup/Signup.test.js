import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SignupComponent as Signup } from './index';

Enzyme.configure({ adapter: new Adapter() });



describe('Signup Component', () => {
    let wrapper;
    // our mock signup function to replace the one provided by mapDispatchToProps
    let mockSignupCallback;
    
    beforeEach(() => {
        // pass the mock function as the signup prop 
        mockSignupCallback = jest.fn();
        wrapper = Enzyme.shallow(<Signup signupRequest={mockSignupCallback}/>)
    });
    
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Signup />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    
    it('renders an input for the username', () => {
        const usernameInputList = wrapper.find('#signup-textfield-username');
        expect(usernameInputList.length).toEqual(1);
        const usernameInput = usernameInputList.first();
        expect(usernameInput.prop('name')).toEqual('username');
    });
    
    it('renders an input for the email', () => {
        const emailInputList = wrapper.find('#signup-textfield-email');
        expect(emailInputList.length).toEqual(1);
        const emailInput = emailInputList.first();
        expect(emailInput.prop('name')).toEqual('email');
    });
    
    it('renders an input for the password', () => {
        const passwordInputList = wrapper.find('#signup-textfield-password');
        expect(passwordInputList.length).toEqual(1);
        const passwordInput = passwordInputList.first();
        expect(passwordInput.prop('name')).toEqual('password');
    });

    it('should change the state parameter "username" after editing input' , () => {
        const usernameInput = wrapper.find('#signup-textfield-username');
        const passwordInput = wrapper.find('#signup-textfield-password');
        const testString = 'testUsernameasdasd';
        usernameInput.simulate('change', {
            target: {
                name: 'username',
                type: 'input',
                value: testString
            }
        })
        expect(wrapper.state('username')).toEqual(testString);
    })

    it('should change the state parameter "email" after editing input' , () => {
        const emailInput = wrapper.find('#signup-textfield-email');
        const passwordInput = wrapper.find('#signup-textfield-password');
        const testString = 'testEmail@asdasd';
        emailInput.simulate('change', {
            target: {
                name: 'email',
                type: 'input',
                value: testString
            }
        })
        expect(wrapper.state('email')).toEqual(testString);
    })

    it('should change the state parameter "password" after editing input' , () => {
        const emailInput = wrapper.find('#signup-textfield-email');
        const passwordInput = wrapper.find('#signup-textfield-password');
        const testString = 'passwordTESTString';
        emailInput.simulate('change', {
            target: {
                name: 'password',
                type: 'input',
                value: testString
            }
        })
        expect(wrapper.state('password')).toEqual(testString);
    })

    it('should call the signup callback after button click', () => {
        wrapper.find('#signup-button').simulate('click');
        expect(mockSignupCallback).toHaveBeenCalledTimes(1);
    })
});
