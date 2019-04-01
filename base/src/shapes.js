import PropTypes from 'prop-types'

const BaseFieldShape = {
  label: PropTypes.string.isRequired,
}

const TextField = PropTypes.shape({
  ...BaseFieldShape,
  type: PropTypes.oneOf(['text']).isRequired,
})

const LayoutField = PropTypes.shape({
  type: PropTypes.oneOf(['field']).isRequired,
  field: PropTypes.string.isRequired,
})
const LayoutText = PropTypes.shape({
  type: PropTypes.oneOf(['text']).isRequired,
  text: PropTypes.string.isRequired,
})
const LayoutTypes = [
  LayoutField,
  LayoutText,
]
LayoutTypes.push(PropTypes.oneOfType(LayoutTypes))

const SubformFieldShape = {
  type: PropTypes.oneOf(['subform']).isRequired,
  iterations: PropTypes.number,
  extensible: PropTypes.bool,
  maxIterations: PropTypes.number,
  // form: is added after FormShape is defined
}

const FormShape = {
  layout: PropTypes.arrayOf(PropTypes.oneOfType(LayoutTypes)),
  fields: PropTypes.objectOf(PropTypes.oneOfType([
    TextField,
    PropTypes.shape(SubformFieldShape),
  ])).isRequired,
}

// recurse subform config
SubformFieldShape.form = PropTypes.shape(FormShape).isRequired
const Form = PropTypes.shape(FormShape)

export default {
  Form: Form,
}
