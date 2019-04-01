export default {
  fields: {
    foo: {
      type: 'text',
      label: 'Foo text field',
      placeholder: 'Fooooo',
    },
    setOneCompliance: {
      type: 'subform',
      fields: {
        thingo: {
          type: 'assessment',
          label: 'Is this thingo compliant?',
        },
        majig: {
          type: 'assessment',
          label: 'Is this majig compliant?',
        },
      },
      layout: [
        {
          type: 'assessment-header',
          text: 'First set of compliance',
        },
        {
          type: 'field',
          field: 'thingo',
        },
        {
          type: 'field',
          field: 'majig',
        },
      ],
    },
    setTwoCompliance: {
      type: 'subform',
      style: 'outline',
      fields: {
        signs: {
          type: 'assessment',
          label: 'Are the signs right?',
        },
        lights: {
          type: 'assessment',
          label: 'The lights compliant?',
        },
        subset: {
          type: 'subform',
          fields: {
            'one': {
              type: 'assessment',
              label: 'Subform one',
            },
            'othertype': {
              type: 'text',
              placeholder: 'This is a decoy',
            },
            'two': {
              type: 'assessment',
              label: 'Subform two',
            },
          },
        },
      },
      layout: [
        {
          type: 'assessment-header',
          bold: true,
          text: 'Second set of compliance:',
        },
        {
          type: 'field',
          field: 'signs',
        },
        {
          type: 'field',
          field: 'lights',
        },
        {
          type: 'field',
          field: 'subset',
        },
      ],
    },
    bar: {
      type: 'text',
      label: 'The bar text field',
      placeholder: 'Barr',
    },
    blob: {
      type: 'text',
      label: 'A blob of a text field',
      placeholder: 'Blob',
    },
    supervisor: {
      type: 'subform',
      style: 'cards',
      fields: {
        firstName: {
          type: 'text',
          label: 'Supervisor name',
          placeholder: 'Janet',
        },
        lastName: {
          type: 'text',
          label: 'Supervisor surname',
          placeholder: 'Logbookian',
        },
      },
    },
    additionalTechs: {
      type: 'subform',
      style: 'cards',
      name: 'Helper Technician',
      repeats: true,
      minRepeat: 1,
      addMore: true,
      fields: {
        firstName: {
          type: 'text',
          label: 'Helper name',
          placeholder: 'Bob',
        },
        lastName: {
          type: 'text',
          label: 'Helper surname',
          placeholder: 'Cabinet',
        },
      },
    },
    description: {
      type: 'textarea',
      label: 'Big ol description',
      placeholder: 'Type meni lines in here',
    },
    inspected: {
      type: 'checkbox',
      label: 'Has the site been thoroughly inspected?',
    },
  },
  layout: [
    {
      type: 'container',
      style: 'card',
      title: 'All details',
      contents: [
        {
          type: 'field',
          field: 'foo',
        },
        {
          type: 'field',
          field: 'setOneCompliance',
        },
        {
          type: 'field',
          field: 'setTwoCompliance',
        },
        {
          type: 'field',
          field: 'description',
        },
        {
          type: 'container',
          style: 'outline',
          contents: [
            {
              type: 'text',
              text: 'This is separating text',
            },
            {
              type: 'field',
              field: 'bar',
            },
          ],
        }
      ],
    },
    {
      type: 'field',
      field: 'supervisor',
    },
    {
      type: 'field',
      field: 'additionalTechs',
    },
    {
      type: 'field',
      field: 'inspected',
    },
  ],
}