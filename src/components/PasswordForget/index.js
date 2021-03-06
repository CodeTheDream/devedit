import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const password = () => (

      
    
        <div className="wrapper">
            <p style={{ fontSize: "28px" }}>PasswordForget </p>
            <h3 style={{marginTop:"2em"}}> Password Reset</h3>

                 <PasswordForgetForm />
               
                 
            </div>
        );

        const INITIAL_STATE = {
          email: '',
          error: null,
        };
        
        class PasswordForgetFormBase extends Component {
          constructor(props) {
            super(props);
        
            this.state = { ...INITIAL_STATE };
          }
        
          onSubmit = event => {
            const { email } = this.state;
        
            this.props.firebase
              .doPasswordReset(email)
              .then(() => {
                this.setState({ ...INITIAL_STATE });
              })
              .catch(error => {
                this.setState({ error });
              });
        
            event.preventDefault();
          };
        
          onChange = event => {
            this.setState({ [event.target.name]: event.target.value });
          };
        
          render() {
            const { email, error } = this.state;
        
            const isInvalid = email === '';
        
              return (
                  <div className="view-container-signup">
                   
                <form onSubmit={this.onSubmit} className="form">
               
                <input
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Email Address"
                />
                    <button disabled={isInvalid} type="submit" className="button-tertiary">
                  Reset My Password
                </button>
        
                {error && <p>{error.message}</p>}
                      </form>
                      </div>
            );
          }
        }
        
        {/* const PasswordForgetLink = () => (
        
             
          <p>
            <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
                </p>
              
        );*/}
        
        export default password;
        const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
        
        export { PasswordForgetForm};
        export { PasswordForgetFormBase };
    



