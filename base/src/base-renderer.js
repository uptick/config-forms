import React from 'react'
import PropTypes from 'prop-types'

import Shapes from './shapes.js'

class BaseRenderer extends React.PureComponent {
  static propTypes = {
    // config: Shapes.Form.isRequired,
    value: PropTypes.object,
    editable: PropTypes.bool,
    onChange: PropTypes.func,
    subform: PropTypes.bool,
  }
  static defaultProps = {
    formRenderer: BaseRenderer,
    subform: false,
    style: 'none',
    editable: true,
  }

  onFieldChange = (key, value) => {
    let newValue = {
      ...this.props.value,
    }
    newValue[key] = value
    this.props.onChange(newValue)
  }
  onFieldGroupSet = (key, value) => {
    let field = this.props.config.fields[key]
    if (!field) {
      console.warn('Group set non existent field:', key)
      return
    }
    let type = field.type
    let newValue = {
      ...this.props.value,
    }
    let subformChanges = (fields, priorValue) => {
      let changes = {}
      let allKeys = Object.keys(fields).filter(key => fields[key].type === field.type)
      allKeys.map((key) => {
        changes[key] = value
      })
      let subformKeys = Object.keys(fields).filter(key => fields[key].type === 'subform')
      subformKeys.map((key) => {
        changes[key] = {
          ...priorValue[key],
          ...subformChanges(fields[key].fields, priorValue),
        }
      })
      return changes
    }
    newValue = {
      ...newValue,
      ...subformChanges(this.props.config.fields, this.props.value),
    }
    this.props.onChange(newValue)
  }

  render() {
    const config = this.props.config

    let renderedFields = {}
    let layoutItemIndex = 0
    let renderField = (field) => {
      if (field.key in config.fields === false) {
        console.warn('Tried to render unknown field:', field.key)
        return null
      }
      if (field.key in renderedFields) {
        console.warn('Tried to render field twice:', field.key)
        return null
      }
      renderedFields[field.key] = true

      let fieldConfig = config.fields[field.key]
      if (fieldConfig.type === 'subform') {
        let FormRenderer = this.props.formRenderer
        let ControlsRenderer = this.props.layoutRenderers.controllable
        let subforms = []
        if (fieldConfig.repeats) {
          let currentValues = this.props.value[field.key]
          if (!Array.isArray(currentValues)) {
            currentValues = []
          }
          while (currentValues.length < fieldConfig.minRepeat || 0) {
            currentValues.push({})
          }
          currentValues.map((value, subformIndex) => {
            if (this.props.editable) {
              subforms.push(
                <ControlsRenderer
                  key={`${field.key}-${subformIndex}`}
                  onRemove={() => {
                    let updatedSet = [...currentValues]
                    updatedSet.splice(subformIndex, 1)
                    this.onFieldChange(field.key, updatedSet)
                  }}
                >
                  <FormRenderer
                    subform
                    config={fieldConfig}
                    style={fieldConfig.style}
                    value={value}
                    editable={this.props.editable}
                    onChange={(newValue) => {
                      let updatedSet = [...currentValues]
                      updatedSet[subformIndex] = newValue
                      this.onFieldChange(field.key, updatedSet)
                    }}
                  />
                </ControlsRenderer>
              )
            }
            else {
              subforms.push(
                <FormRenderer
                  key={`${field.key}-${subformIndex}`}
                  subform
                  config={fieldConfig}
                  style={fieldConfig.style}
                  value={value}
                  editable={this.props.editable}
                  onChange={(newValue) => {
                    let updatedSet = [...currentValues]
                    updatedSet[subformIndex] = newValue
                    this.onFieldChange(field.key, updatedSet)
                  }}
                />
              )
            }
          })
          if (fieldConfig.addMore && this.props.editable) {
            let ButtonRenderer = this.props.layoutRenderers.button
            subforms.push(
              <ButtonRenderer
                key={`${field.key}-add`}
                onClick={() => {
                  this.onFieldChange(field.key, [...currentValues, {}])
                }}
                title={`Add ${fieldConfig.name}`}
              />
            )
          }
        }
        else {
          let currentValue = this.props.value[field.key] || {}
          subforms.push(
            <FormRenderer
              subform
              key={`${field.key}-1`}
              config={fieldConfig}
              style={fieldConfig.style}
              value={currentValue}
              editable={this.props.editable}
              onChange={(newValue) => {
                this.onFieldChange(field.key, newValue)
              }}
            />
          )
        }
        return subforms
      }
      else {
        let FieldRenderer = this.props.fieldRenderers[fieldConfig.type]
        if (!FieldRenderer) {
          console.warn('Bad field renderer for:', fieldConfig.type)
          return null
        }
        return (
          <FieldRenderer
            key={field.key}
            fieldKey={field.key}
            value={this.props.value[field.key]}
            editable={this.props.editable}
            onChange={this.onFieldChange}
            onGroupSet={this.onFieldGroupSet}
            {...fieldConfig}
          />
        )
      }
    }
    let renderLayoutChildren = (children, containerHierarchy=[]) => {
      if (!Array.isArray(children)) {
        return null
      }
      let renderedChildren = []
      children.map((child) => {
        if (child.type === 'container') {
          let ContainerRenderer = this.props.layoutRenderers['container']
          if (!ContainerRenderer) {
            console.warn('Bad layout renderer for:', child.type)
            return
          }
          layoutItemIndex += 1
          renderedChildren.push(
            <ContainerRenderer
              key={`layout-${layoutItemIndex}`}
              {...child}
              containerHierarchy={containerHierarchy}
            >
              {renderLayoutChildren(child.contents, [
                ...containerHierarchy,
                child.style,
              ])}
            </ContainerRenderer>
          )
        }
        else if (child.type === 'field') {
          let rendered = renderField({
            key: child.field,
            ...config.fields[child.field],
          })
          if (rendered) {
            renderedChildren.push(rendered)
          }
        }
        else {
          let Renderer = this.props.layoutRenderers[child.type]
          if (!Renderer) {
            console.warn('Bad layout renderer for:', child.type)
            return
          }
          layoutItemIndex += 1
          renderedChildren.push(
            <Renderer
              key={`layout-${layoutItemIndex}`}
              {...child}
            />
          )
        }
      })
      return renderedChildren
    }

    let contents = renderLayoutChildren(config.layout || [])
    if (config.fields) {
      let keys = Object.keys(config.fields).sort()
      keys.map((key) => {
        if (key in renderedFields === false) {
          let rendered = renderField({
            key: key,
            ...config.fields[key],
          })
          if (rendered) {
            contents.push(rendered)
          }
        }
      })
    }

    if (this.props.style) {
      const StyleWrapper = this.props.layoutRenderers.container
      contents = (
        <StyleWrapper style={this.props.style}>
          {contents}
        </StyleWrapper>
      )
    }
    const Container = this.props.container
    return (
      <Container
        value={this.props.value}
        subform={this.props.subform}
      >
        {contents}
      </Container>
    )
  }
}

export default BaseRenderer
