import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import PasswordConfirm from '../PasswordConfirm';

import styled from 'styled-components';


const SignUpPage = () => (
  <div style={{ marginTop: "7em", marginBottom: '7em', fontWeight: 'bold' }}>
   <div className="signup">
    <h3 style= {{marginBottom: '1.5em' }}
    className="signin">SignUp Page</h3>
    <p>Fill in all requested information below.</p>
   <SignUpForm />
   </div>
  </div>
);

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  dev: "",
  passwordOne: "",
  passwordTwo: "",
  github: "",
  isAdmin: false,
  error: null
};
const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";
const ERROR_MSG_ACCOUNT_EXISTS = `
  
//   An account with this email address already exists. 
  
//   Please sign in instead. 
  
// `;

const Button = styled.button`
  cursor: pointer;
  background: blue;
  font-size: 16px;
  border-radius: 25px;
  color: white;
  margin-left: 12px;
  margin-right: 20px; 
  padding: .75em .75em;
  transition: 0.5s all ease-out;
 
  &:hover {
    background-color: white;
    color: black;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  alignItems: flex-start;
  justify-content: center;

  form {
    margin: 4rem 2rem; 
    padding: 10px;

  }

.fieldset {
    width: 100%; 
    margin: 2rem 0; 
    position: relative; 
    display: flex; 
    flexWrap: wrap; 
    alignItems: center; 
    justifyContent: flex-start; 
} 
`
const span = styled.div`
  width: fit-content;
  margin: 0;
  padding: 1rem 1rem;
  display: flex;
  align-items: center;
  border-top-left-radius: 0.25em;
  border-bottom-left-radius: 0.25em; 
  border-top-right-radius: 0;
  border-bottom-right-radius: 0; 
  border: 0.0625rem solid #ced4da; 
  font-size: 1rem; 
  font-weight: 400; 
  line-height: 1.5; 
  color: #495057; 
  text-align: center; 
  background-color: e9ecef;
  } 
`
const i = styled.div`
  color: black;
  padding: 5px;
  
  }
`
const inputwrapper = styled.div`
    flexGrow: 1; 
    minHeight: 2rem; 
    padding: 0.375rem 0.75rem;                         
    display: block; 
    border-top-left-radius: .75em; 
    border-bottom-left-radius: 2em;
    border-top-right-radius: 0.25em;
    border-bottom-right-radius: 0.25em; 
    border: 0.0625rem solid #ced4da; 
    border-left: 0, fontSize: 1rem;
    fontWeight: 100; 
    lineHeight: 1.75; 
    color: #495057;
  }
`; 
const hr = styled.div`
  border-color: black;
  }
`;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };   //refer to lines 19 and 32
  }
  onSubmit = event => {
    console.log('hello world');
    const { firstName, lastName, email, dev, github, passwordOne, passwordTwo, isAdmin,  } = this.state;
   const roles = {};
    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN
    }
    // else {
    //   roles[ROLES.NONADMIN] = ROLES.NONADMIN;
    // }
    console.log("roles: ", roles);
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set(
          {
            firstName,
            lastName,
            dev,
            github,
            email,
            passwordOne,
            passwordTwo,
          },
          { merge: true }
        );
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }
        this.setState({ error });
      });
    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };
  render() {
    const {
      firstName,
      lastName,
      github,
      dev,
      email,
      passwordOne,
      passwordTwo,
      error,
     
    } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      github === "";

      return (
        <FormWrapper>
          {/* <form action="get"> */}
          <form onSubmit={this.onSubmit} className="col-6 form-control">
            <div className="fieldset">
              <div className="input-wrapper"> 
                <span className="icon"> 
                  <i className="fas fa-portrait fa-1x"/></span>
                  &nbsp;&nbsp;      {/* adding non-breaking spaces to separate icon and input line */}
                  &nbsp;&nbsp;
                  <input name="firstName" onChange={this.onChange} type="text" value={this.state.firstname} placeholder="First Name" 
                    id="fname" required>
                  </input>            
              </div>
            </div>

            <div className="fieldset">
              <div className="input-wrapper"> 
                <span className="icon"> 
                  <i className="fas fa-portrait fa-1x"/></span>
                  &nbsp;&nbsp;
                  &nbsp;&nbsp;
                  <input name="lastName" onChange={this.onChange} type="text" value={this.state.lastname} placeholder="Last Name" 
                    id="lname" required></input>            
              </div>
            </div>
              
            <div className="fieldset">
              <div className="input-wrapper"> 
              <span className="icon"> 
                  <i className="fas fa-database fa-1x"/></span>
                  &nbsp;&nbsp;
                  &nbsp;&nbsp;
                <input list="dev" id="dev-choice" name="dev-choice" placeholder='Main Tech Stack' required/>
                    <datalist id="dev">
                        <option value="Frontend" />
                        <option value="Backend" />
                        <option value="Full Stack" />
                     </datalist>
              </div>
            </div>   

            <div className="fieldset">
              <div className="input-wrapper"> 
                <span className="icon"> 
                  <i className="fab fa-github-square fa-1x"/></span>
                  &nbsp;&nbsp;
                  &nbsp;&nbsp;
                  <input className="col-6 form-control" name="Github" onChange={this.onChange} type="text" value={github}
                    placeholder="Github" id="username" autocomplete="off" required></input> 
              </div>
            </div>

            <div className="fieldset">
              <div className="input-wrapper"> 
              <span className="icon"> 
                  <i className="fas fa-envelope fa-1x"/></span>
                  &nbsp;&nbsp;
                  &nbsp;&nbsp;
                <input className="col-6 form-control" name="email" onChange={this.onChange} type="text" value={email} placeholder="Email Address" required></input> 

                
              </div>
            </div>
            <hr />
            {/* {error && <p>{error.message}</p>}  */}
          <PasswordConfirm />
        </form>
      </FormWrapper> 
   
    )
 };
};



const SignUpLink = () => (
  <p>
    Don't have an account? 
    <Link className="linkstyle" to=
    {ROUTES.SIGNUP}>Sign Up</Link>
  </p>
);
const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export default SignUpPage;
export { SignUpForm, SignUpLink }