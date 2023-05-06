import React from "react";
import "./Test.css";
function Test() {
  return (
    <section className="container">
      <main>
        <section className="form-block" id="signUpForm">
          <h2>Create Account</h2>
          <form>
            <label htmlFor="user_name">Name</label>
            <input type="text" id="user_name" />
            <label htmlFor="user_email_signup">Email</label>
            <input type="email" id="user_email_signup" />
            <label htmlFor="user_password_signup">Password</label>
            <input type="password" id="user_password_signup" />
            <button type="submit" className="btn">
              Sign Up
            </button>
          </form>
        </section>
        <section className="form-block" id="signInForm">
          <h2>Login</h2>
          <form>
            <label htmlFor="user_email_signin">Email</label>
            <input type="email" id="user_email_signin" />
            <label htmlFor="user_password_signin">Password</label>
            <input type="password" id="user_password_signin" />
            <button type="submit" className="btn">
              Sign In
            </button>
          </form>
        </section>
      </main>
      <aside>
        <section className="login-block">
          <h2>Already a User?</h2>
          <button type="submit" id="login-btn" className="btn">
            Sign In
          </button>
        </section>
        <section className="register-block">
          <h2>New User?</h2>
          <button type="submit" id="register-btn" className="btn">
            Sign Up
          </button>
        </section>
      </aside>
    </section>
  );
}

export default Test;
