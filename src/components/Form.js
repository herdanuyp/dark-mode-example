import React, { useContext } from 'react'
import { useFormik } from 'formik'

import {
  Form,
  Label,
  Input,
  Button,
  Text,
  InnerContainer
} from '../assets/styles/main'
import { FormSchema } from '../utils/formValidation'
import { IdeaContext } from '../context/ideaStateProvider'
import MemorizedIdeas from './Idea'
import Search from './Search'

function FormContent() {
  const { addIdeaHandler, filteredIdeaHandler, statusHandler } = useContext(
    IdeaContext
  )

  const formik = useFormik({
    initialValues: { idea: '', description: '', need: '' },
    validationSchema: FormSchema,
    onSubmit: (values) => {
      addIdeaHandler(values)
    }
  })

  return (
    <InnerContainer>
      <Form onSubmit={formik.handleSubmit}>
        <Label htmlFor='idea'>
          Idea/Project
          {formik.touched.idea && formik.errors.idea && (
            <Text color='red'>{formik.errors.idea}</Text>
          )}
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.idea}
            type='text'
            name='idea'
            border={formik.errors.idea && '1px solid red'}
          />
        </Label>

        <Label htmlFor='description'>
          Description
          {formik.touched.description && formik.errors.description && (
            <Text color='red'>{formik.errors.description}</Text>
          )}
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            type='text'
            name='description'
            border={formik.errors.description && '1px solid red'}
          />
        </Label>

        <Label htmlFor='need'>
          Need
          {formik.touched.need && formik.errors.need && (
            <Text color='red'>{formik.errors.need}</Text>
          )}
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.need}
            type='text'
            name='need'
            border={formik.errors.need && '1px solid red'}
          />
        </Label>

        <Button type='submit'>Share your briliant thought!</Button>
        {statusHandler()}
      </Form>

      <Search onLoadingIdeas={filteredIdeaHandler} />
      <MemorizedIdeas />
    </InnerContainer>
  )
}

const FormComponent = React.memo(FormContent)
export default FormComponent
