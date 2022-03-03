import { RedirectDuplicateTokenIdsV2 } from 'pages/AddLiquidityV2/redirects'
import PoolV2 from 'pages/Pool/v2'
import PoolFinder from 'pages/PoolFinder'
import RemoveLiquidity from 'pages/RemoveLiquidity'
import HomeScreen from 'pages/Screen/HomeScreen'
import Swap from 'pages/Swap'
import { RedirectPathToSwapOnly, RedirectToSwap } from 'pages/Swap/redirects'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
export default function Routes() {
  return (
    <Switch>
      <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
      <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
      <Route exact strict path="/swap" component={Swap} />
      <Route exact strict path="/pool/v2/find" component={PoolFinder} />
      <Route exact strict path="/pool/v2" component={PoolV2} />
      <Route exact strict path="/add/v2/:currencyIdA?/:currencyIdB?" component={RedirectDuplicateTokenIdsV2} />
      <Route exact strict path="/remove/v2/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
      <Route exact strict path="/" component={HomeScreen} />
    </Switch>
  )
}
