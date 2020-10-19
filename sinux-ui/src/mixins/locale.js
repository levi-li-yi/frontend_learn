import { t } from 'sinux-ui/src/locale'

export default {
  methods: {
    t(...args) {
      return t.apply(this, args)
    }
  }
}
