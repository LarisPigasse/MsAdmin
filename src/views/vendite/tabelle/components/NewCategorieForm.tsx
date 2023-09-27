import { useState, useEffect } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Avatar from '@/components/ui/Avatar'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import hooks from '@/components/ui/hooks'
import { Field, Form, Formik, FieldProps } from 'formik'
import { HiCheck } from 'react-icons/hi'
import { components, MultiValueGenericProps, OptionProps } from 'react-select'
import {
    toggleNewCategoriaDialog,
    useAppDispatch,
    useAppSelector,
    insertCategoria,
    getCategorie
} from '../store'
import cloneDeep from 'lodash/cloneDeep'
import * as Yup from 'yup'

type FormModel = {
    categoria: string
    descrizione: string
}

const { MultiValueLabel } = components

const validationSchema = Yup.object().shape({
    categoria: Yup.string().min(3, 'Too Short!').required('Title required'),
    descrizione: Yup.string().required('Title required')
})

const NewProjectForm = () => {
    const dispatch = useAppDispatch()

   // const members = useAppSelector((state) => state.projectList.data.allMembers)

    // useEffect(() => {
    //     dispatch(getMembers())
    // }, [dispatch])

    // const { pageIndex, pageSize, sort, query, total } = useAppSelector(
    //     (state) => state.venditeTabelle.data.tableData
    // )

    const onSubmit = (
        formValue: FormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        setSubmitting(true)

        const { categoria, descrizione } = formValue
        
        const values = {
            categoria,
            descrizione
        }

        dispatch(insertCategoria(values))
        dispatch(toggleNewCategoriaDialog(false))
        dispatch(getCategorie())
        //dispatch(getOperatori({ pageIndex, pageSize, sort, query }))
        
        toast.push(
            <Notification
                title="Categoria inserita con successo."
                type="success"
                duration={3500}
            >
                qualcosa...
            </Notification>,
            {
                placement: 'top-center',
            }
        )
    }

    return (
        <Formik
            initialValues={{
                categoria: '',
                descrizione: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onSubmit(values, setSubmitting)
            }}
        >
            {({ touched, errors, values }) => (
                <Form>
                    <FormContainer>
                       
                        <FormItem
                            label="Categoria"
                            invalid={errors.categoria && touched.categoria}
                            errorMessage={errors.categoria}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="categoria"
                                placeholder="Enter title"
                                component={Input}
                            />
                        </FormItem>

                        <FormItem
                            label="Descrizione"
                            invalid={errors.descrizione && touched.descrizione}
                            errorMessage={errors.descrizione}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="descrizione"
                                placeholder="Enter title"
                                component={Input}
                            />
                        </FormItem>

                        <Button block variant="solid" type="submit">
                            Salva
                        </Button>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
}

export default NewProjectForm
