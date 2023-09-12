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
    toggleNewOperatoriDialog,
    useAppDispatch,
    useAppSelector,
    getOperatori,
    insertOperatore
} from '../store'
import cloneDeep from 'lodash/cloneDeep'
import * as Yup from 'yup'

type FormModel = {
    operatore: string
    email: string
    telefono: string
    // assignees: {
    //     img: string
    //     name: string
    //     label: string
    // }[]
}

const { MultiValueLabel } = components

const CustomSelectOption = ({
    innerProps,
    label,
    data,
    isSelected,
}: OptionProps<{ img: string }>) => {
    return (
        <div
            className={`flex items-center justify-between p-2 ${
                isSelected
                    ? 'bg-gray-100 dark:bg-gray-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            {...innerProps}
        >
            <div className="flex items-center">
                <Avatar shape="circle" size={20} src={data.img} />
                <span className="ml-2 rtl:mr-2">{label}</span>
            </div>
            {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
        </div>
    )
}

const CustomControlMulti = ({ children, ...props }: MultiValueGenericProps) => {
    const { img } = props.data

    return (
        <MultiValueLabel {...props}>
            <div className="inline-flex items-center">
                <Avatar
                    className="mr-2 rtl:ml-2"
                    shape="circle"
                    size={15}
                    src={img}
                />
                {children}
            </div>
        </MultiValueLabel>
    )
}

const validationSchema = Yup.object().shape({
    operatore: Yup.string().min(3, 'Too Short!').required('Title required'),
    email: Yup.string().required('Title required'),
    telefono: Yup.string().min(3, 'Too Short!').required('Telefono required'),
})

const NewProjectForm = () => {
    const dispatch = useAppDispatch()

   // const members = useAppSelector((state) => state.projectList.data.allMembers)

    // useEffect(() => {
    //     dispatch(getMembers())
    // }, [dispatch])

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.sistemaOperatori.data.tableData
    )

    const onSubmit = (
        formValue: FormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        setSubmitting(true)

        const { operatore, email, telefono } = formValue
        
        const values = {
            operatore,
            email,
            telefono,
            stato: 'ATTIVO',
            data_creazione: '2023-09-08'
        }

        dispatch(insertOperatore(values))
        dispatch(toggleNewOperatoriDialog(false))
        dispatch(getOperatori({ pageIndex, pageSize, sort, query }))
        
        toast.push(
            <Notification
                title="Operatore inserito con successo."
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
                operatore: '',
                email: '',
                telefono: ''
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
                            label="Operatore"
                            invalid={errors.operatore && touched.operatore}
                            errorMessage={errors.operatore}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="operatore"
                                placeholder="Enter title"
                                component={Input}
                            />
                        </FormItem>

                        <FormItem
                            label="Telefono"
                            invalid={errors.telefono && touched.telefono}
                            errorMessage={errors.telefono}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="telefono"
                                placeholder="Enter telefono"
                                component={Input}
                            />
                        </FormItem>

                        <FormItem
                            label="Email"
                            invalid={errors.email && touched.email}
                            errorMessage={errors.email}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="email"
                                placeholder="Enter email"
                                component={Input}
                            />
                        </FormItem>


                        <Button block variant="solid" type="submit">
                            Submit
                        </Button>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
}

export default NewProjectForm
