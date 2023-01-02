import "./App.css";
import { Switch, Route } from "react-router-dom";
import PrivateRouter from "components/PrivateRouter";
import { LoginComponent } from "auth/login";
import { SignupComponent } from "auth/signup";
import { CUPostsComponent } from "layout/cu-post/index";
import { HomeComponent } from "layout/home/index";
import { SignUpSucess } from "auth/signup-sucess";
import { PostsComponent } from "layout/post";
import { AccountComponent } from "layout/account";

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
        <Route path={"/posts/:postsId"}>
          <PostsComponent />
        </Route>
        <Route path={"/"} exact>
          <HomeComponent />
        </Route>
        <Route path={"/home"} exact>
          <HomeComponent />
        </Route>
        <Route path={"/account"} exact>
          <AccountComponent />
        </Route>
      </Switch>
    </>
  );
}

export default App;
