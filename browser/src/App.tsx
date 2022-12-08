import "./App.css";
import { Switch, Route } from "react-router-dom";
import PrivateRouter from "components/PrivateRouter";
import { LoginComponent } from "auth/login";
import { SignupComponent } from "auth/signup";
import { PostsComponent } from "layout/blog-post/posts";
import { HomeComponent } from "layout/home/index";
import { SignUpSucess } from "auth/signup-sucess";

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
        <Route path={"/posts"} exact>
          <PostsComponent />
        </Route>
        <Route path={"/"} exact>
          <HomeComponent />
        </Route>
        <Route path={"/home"} exact>
          <HomeComponent />
        </Route>
      </Switch>
    </>
  );
}

export default App;
