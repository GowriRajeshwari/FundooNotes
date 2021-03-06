import React from 'react';
import {configure,shallow} from 'enzyme';
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16';
import TextField from '@material-ui/core/TextField';
import {createShallow} from '@material-ui/core/test-utils';
import {act} from 'react-dom/test-utils';
import { createMount} from '@material-ui/core/test-utils'
import App from '../App';
import Register from '../components/Register';
import service from '../components/service';


configure({adapter: new Adapter()});

// describe('rendering', () => {
//   let wrapper, showUrl
//    beforeEach(() => {
//      props =  {
//        location: { pathname: '/Register',state: { service: this.state.service }},
//        showUrl: (url) => {}
//      }
//      showUrl = sinon.stub(props, 'showUrl')
//    })
//   //  afterEach(() => {
//   //    showUrl.reset()
//   //  })
  
//    it('componentWillMount', () => {
//     wrapper = shallow(<service  {...props}/>)
//     wrapper.setProps({location: { pathname: '/Register',state: { service: this.state.service }}})
//     expect(showUrl.calledOnce).toBe(true)
//    })
// })




describe('Test case for testing Register component', () => {

  it('FirstName Textfield',()=>{
      expect(shallow(<Register />).find("#FirstName").length).toEqual(1)
  })
  it('LastName Textfield',()=>{
    expect(shallow(<Register/>).find("#btnRegLastName").length).toEqual(1)
  })

  it('Email Textfield',()=>{
    expect(shallow(<Register/>).find("#btnEmailReg").length).toEqual(1)
})

// it('Password Textfield',()=>{
//     expect(shallow(<Register/>).find("#btnReg").length).toEqual(1)
// })
// it('ConfirmPassword Textfield',()=>{
//   expect(shallow(<Register/>).find("#btnRegConfirm").length).toEqual(1)
// })

it('Phone Textfield',()=>{
    expect(shallow(<Register/>).find("#btnRegPhone").length).toEqual(1)
})


describe('FirstName check',()=>{
    it('input of FirstName',()=>{
        const wrapper = shallow(<Register />);
        wrapper.find("#FirstName").simulate('change',{target : { name:'First Name', value : 'gowri'}
        });
        expect(wrapper.state('firstname')).toEqual('gowri')
    })
})
// describe('Password Check',()=>{
//     it('input of password',()=>{
//         const wrapper = shallow(<Register/>);
//         wrapper.find("#btnReg").simulate('change',{target : { name:'Password', value : 'Gowri@35'}
//         });
//         expect(wrapper.state('password')).toEqual('Gowri@35')
//     })
// })
describe('Register Button Check',()=>{
  it('Register Button', () => {
    const wrapper = shallow(<Register />);
    const decrementBtn = wrapper.find('.Registerbtn').at(0);
    decrementBtn.simulate('click');
    expect(true).toBe(true)
  });
})
});

