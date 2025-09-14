import React from "react";

import Auth from "./auth";
import Slack from './slack'

const Icons = React.lazy(() => import('./icon/Icons'))
const NotFound = React.lazy(() => import('./NotFound'))

const Page = {
    Auth,
    Icons,
    NotFound,
    Slack,
}

export default Page