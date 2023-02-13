import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import PrivateRouter from "components/PrivateRouter";
import { LoginComponent } from "auth/login";
import { SignupComponent } from "auth/signup";
import { CUPostsComponent } from "layout/cu-post/index";
import { HomeComponent } from "layout/home/index";
import { SignUpSucess } from "auth/signup-sucess";
import { PostsComponent } from "layout/post";
import { AccountComponent } from "layout/account";
import { VerifySuccess } from "auth/verify-success";
import { PostWithTagComponent } from "layout/post-with-tag";
import { CreateNewPasswordComponent } from "auth/create-new-password";
import { ForgotPasswordComponent } from "auth/forgot-password";
import { UpdatePasswordSuccess } from "auth/update-password-success";

function App() {
  return (
    <>
      <Switch>
        <Route path={"/login"} exact>
          <LoginComponent />
        </Route>
        <Route path={"/signup"} exact>
          <SignupComponent />
        </Route>
        <Route path={"/signup-sucess"} exact>
          <SignUpSucess />
        </Route>
        <Route path={"/create-posts"} exact>
          <CUPostsComponent />
        </Route>
        <Route path={"/update-posts/:postId"} exact>
          <CUPostsComponent />
        </Route>
        <Route path={"/posts/:slug"}>
          <PostsComponent />
        </Route>
        <Route path={"/"} exact>
          <HomeComponent />
        </Route>
        <Route path={"/home"} component={HomeComponent} />
        <Route path={"/search-tags"} exact>
          <PostWithTagComponent />
        </Route>
        <Route path={"/account"} exact>
          <AccountComponent />
        </Route>
        <Route path={"/verify/:verifyToken"} exact>
          <VerifySuccess />
        </Route>
        <Route path={"/forgot-password"} exact>
          <ForgotPasswordComponent />
        </Route>
        <Route path={"/create-new-password/:verifyPassword"} exact>
          <CreateNewPasswordComponent />
        </Route>
        <Route path={"/update-password-success"} exact>
          <UpdatePasswordSuccess />
        </Route>
        {/* <Redirect from="/" to="/home" /> */}
      </Switch>
    </>
  );
}

export default App;
