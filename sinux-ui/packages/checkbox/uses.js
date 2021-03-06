import { isArray } from '@vue/shared'
import {
  computed,
  ref,
  onMounted,
  getCurrentInstance,
  inject,
  nextTick
} from 'vue'
import { useEmitter } from 'sinux-ui/src/use/emitter'
import { usePropUtils } from 'sinux-ui/src/use/prop-utils'

export function useModel() {
  // core
  const { emit, props } = getCurrentInstance()
  const elCheckboxGroup = inject('elCheckboxGroup', { props: {} })
  const { dispatch } = useEmitter()

  const model = computed({
    get() {
      const modelValue = elCheckboxGroup.props.modelValue || props.modelValue // If the parent element is ChceckboxGroup use its modelValue
      return modelValue
      // BUG: if the Checkbox list and modelValue are an object, this causes the object element to be deleted.
      // Resolve: `isArray(modelValue) ? [...modelValue] : modelValue`, but doing so will invalidate the `checked` prop.
    },
    set({ label, checked }) {
      if (label && isArray(model.value)) {
        // when modelValue or elCheckboxGroup.modeValue is array
        const modelValue = model.value
        const labelIndex = modelValue.indexOf(label)
        labelIndex === -1 && checked === true && modelValue.push(label)
        labelIndex !== -1 &&
          checked === false &&
          modelValue.splice(labelIndex, 1)
        emit('update:modelValue', modelValue)
        dispatch('update:modelValue', modelValue)
      } else {
        emit('update:modelValue', checked ? props.trueLabel : props.falseLabel)
      }
    }
  })

  async function handleChange() {
    await nextTick()
    emit('change', model.value)
    dispatch('change', model.value)
  }

  return { model, handleChange }
}

export function useAria() {
  const { props, vnode } = getCurrentInstance()
  onMounted(() => {
    if (props.indeterminate) {
      vnode.el.setAttribute('aria-controls', props.controls)
    }
  })
}

export function useCheckSelected({ model }) {
  const { props } = getCurrentInstance()
  const { isAfferentProp } = usePropUtils()
  const checkbox = ref(null)

  onMounted(() => {
    isAfferentProp('checked') &&
      (model.value = { label: props.label, checked: props.checked })
  })

  const isChecked = computed(() => {
    const _isChecked = isArray(model.value)
      ? model.value.indexOf(props.label) !== -1
      : model.value === props.trueLabel
    checkbox.value && (checkbox.value.checked = _isChecked)
    return _isChecked
  })
  return { isChecked, checkbox }
}

export function useSize() {
  const elCheckboxGroup = inject('elCheckboxGroup', { props: {}, ctx: {} })
  const { props, ctx } = getCurrentInstance()
  const checkboxSize = computed(() => {
    return (
      props.size ||
      elCheckboxGroup.ctx.checkboxGroupSize ||
      (ctx.$ELEMENT || {}).size
    )
  })
  return checkboxSize
}

export function useLimit({ model }) {
  const elCheckboxGroup = inject('elCheckboxGroup', { props: {}, ctx: {} })
  const { props } = getCurrentInstance()
  const isLimit = computed(() => {
    if (elCheckboxGroup.props.modelValue) {
      // if elCheckboxGroup exist
      const modelValueLength = elCheckboxGroup.props.modelValue.length
      const min = elCheckboxGroup.props.min
      const max = elCheckboxGroup.props.max
      return (
        (modelValueLength <= min && model.value.indexOf(props.label) !== -1) ||
        (modelValueLength >= max && model.value.indexOf(props.label) === -1)
      )
    } else {
      return false
    }
  })
  return isLimit
}

export function useDisabled({ isLimit }) {
  const elCheckboxGroup = inject('elCheckboxGroup', { props: {}, ctx: {} })
  const { props } = getCurrentInstance()
  const isDisabled = computed(() => {
    return (
      props.disabled ||
      elCheckboxGroup.ctx.checkboxGroupDisabled ||
      isLimit.value
    )
  })
  return isDisabled
}

export function useBorder() {
  const elCheckboxGroup = inject('elCheckboxGroup', { props: {}, ctx: {} })
  const { props } = getCurrentInstance()
  const isBorder = computed(() => {
    return props.border || elCheckboxGroup.props.border
  })
  return isBorder
}

export function useActiveStyle() {
  const elCheckboxGroup = inject('elCheckboxGroup', { props: {}, ctx: {} })

  return {
    backgroundColor: elCheckboxGroup.props.fill || '',
    borderColor: elCheckboxGroup.props.fill || '',
    color: elCheckboxGroup.props.textColor || '',
    'box-shadow': '-1px 0 0 0 ' + elCheckboxGroup.props.fill
  }
}
