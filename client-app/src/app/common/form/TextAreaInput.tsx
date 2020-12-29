import React from 'react'

import { FieldRenderProps } from 'react-final-form'
import { Form, FormFieldProps, Label } from 'semantic-ui-react'

interface IProps extends FieldRenderProps<string, HTMLTextAreaElement>, FormFieldProps { }

const TextAreaInput: React.FC<IProps> = ({
    input, width, rows, placeholder, meta: { touched, error }
}) => {
    return (
        <Form.Field error={touched && !!error} width={width} >
            <textarea {...input} placeholder={placeholder} rows={rows} />
            {touched && error && (
                <Label style={{ margin: '.3em .14285714em' }} basic color='red'>{error}</Label>
            )}
        </Form.Field>
    )
}
export default TextAreaInput
