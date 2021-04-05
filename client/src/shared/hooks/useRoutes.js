import {Redirect, Route, Switch} from "react-router-dom";
import Auth from "../../pages/Auth";
import routes from "../constants/routes";
import {roles} from "../constants";
import Home from "../../pages/client/Home";
import Categories from "../../pages/client/Categories";
import CategoryDetail from "../../pages/client/CategoryDetail";
import Order from "../../pages/client/Order";
import OrderConfirm from "../../pages/client/OrderConfirm";
import OrderPubic from "../../pages/client/OrderPubic";
import Chats from "../../pages/client/Chats";
import Chat from "../../pages/client/Chat";
import Profile from "../../pages/client/Profile";
import About from "../../pages/client/About";
import {lazy, Suspense} from "react";
import Loading from "../components/Loading";

const Tasks = lazy(() => import('../../pages/specialist/Tasks'))

export const useRoutes = (isAuthenticated, role) => {
  if (isAuthenticated) {
    switch (role) {
      case roles.CLIENT:
        return (
          <Switch>
            <Route path={routes.CATEGORIES} component={Categories} exact/>
            <Route path={routes.CATEGORY} component={CategoryDetail} exact/>
            <Route path={routes.ORDER} component={Order} exact/>
            <Route path={routes.ORDERCONFIRM} component={OrderConfirm} exact/>
            <Route path={routes.ORDERPUBLIC} component={OrderPubic} exact/>
            <Route path={routes.CHATS} component={Chats} exact/>
            <Route path={routes.CHAT} component={Chat} exact/>
            <Route path={routes.PROFILE} component={Profile} exact/>
            <Route path={routes.ABOUT} component={About} exact/>
            <Route path={routes.HOME} component={Home} exact/>
            <Redirect to={routes.HOME}/>
          </Switch>
        )
      case roles.SPECIALIST:
        return (
          <Suspense fallback={<Loading/>}>
            <Switch>
              <Route path={routes.HOME} component={Tasks} exact/>
              <Route path={routes.PROFILE} component={Profile} exact/>
              <Redirect to={routes.HOME}/>
            </Switch>
          </Suspense>
        )
    }
  }
  return (
    <Switch>
      <Route path={routes.HOME} component={Home} exact/>
      <Route path={routes.CATEGORIES} component={Categories} exact/>
      <Route path={routes.CATEGORY} component={CategoryDetail} exact/>
      <Route path={routes.AUTH} component={Auth} exact/>
      <Redirect to={routes.AUTH}/>
    </Switch>
  )
}
