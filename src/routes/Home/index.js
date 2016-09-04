import {injectReducer} from '../../store/reducers'

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Punctuality = require('./containers/HomeContainer').default
      const reducer = require('./modules/roster').default

      /*  Add the reducer to the store on key 'roster'  */
      injectReducer(store, {key: 'roster', reducer})

      /*  Return getComponent   */
      cb(null, Punctuality)

      /* Webpack named bundle   */
    }, 'Home')
  }
})
