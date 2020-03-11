import * as Yup from 'yup'

export const FormSchema = Yup.object().shape({
  idea: Yup.string()
    .min(2, 'Too Short!')
    .required('Required'),
  description: Yup.string()
    .min(20, 'Too Short!')
    .required('Required'),
  need: Yup.string()
    .min(10, 'Too Short!')
    .required('Required')
})
