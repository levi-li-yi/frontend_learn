import {createStore} from 'vuex';

interface State {
  useName: string
}

export default createStore({
  state(): State {
    return {
      useName: ''
    }
  }
})