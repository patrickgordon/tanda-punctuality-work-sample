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

      var roster = require('./modules/roster').default
      var shift = require('./modules/shift').default

      /*  Add the reducers to the store on key 'roster' and 'shift'  */
      injectReducer(store, {key: 'roster', reducer: roster})
      injectReducer(store, {key: 'shift', reducer: shift})

      /*  Return getComponent   */
      cb(null, Punctuality)

      /* Webpack named bundle   */
    }, 'Home')
  }
})
