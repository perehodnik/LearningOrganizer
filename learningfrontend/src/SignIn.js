import React, {Component} from 'react';
import { withRouter } from "react-router-dom";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email:'',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password, email } = this.state;
        if (this.props.signUp) {
            if (username && password && email) {
                this.props.handleSignin("signup", {username, password, email});
                this.props.history.push("/");
            }
        } else {
            if (email && password) {
                this.props.handleSignin("signin", {email, password});
                this.props.history.push("/");
            }
        }
    }

    render() {
        const { email, password, submitted, username } = this.state;
        const type = (()=>this.props.signUp? "Signup":"Login")();
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>{type}</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                        {submitted && !email &&
                            <div className="help-block">Email is required</div>
                        }
                    </div>
                    {this.props.signUp && (
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                        <div className="help-block">Username is required</div>
                        }
                    </div>
                    )}
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">{type}</button>
                    </div>
                </form>
                </div>
        );
    }
}

export default withRouter(SignIn);