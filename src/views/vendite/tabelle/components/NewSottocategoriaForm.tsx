
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
    toggleNewSottocategoriaDialog,
    useAppDispatch,
    useAppSelector,
    insertSottocategoria,
    updateSottocategoria,
    getSottocategorie,
    setIdCategoria
} from '../store'
import cloneDeep from 'lodash/cloneDeep'
import * as Yup from 'yup'
import { useEffect } from 'react'

type FormModel = {
    sottocategoria: string
    descrizione: string
    id_sottocategoria: number | null
    id_categoria: number | null
}

const validationSchema = Yup.object().shape({
    sottocategoria: Yup.string().min(3, 'Too Short!').required('Title required'),
    descrizione: Yup.string().required('Title required')
})

const NewSottocategorieForm = () => {
    const dispatch = useAppDispatch()

    let id_categoria = useAppSelector(
        (state) => state.venditeTabelle.data.id_categoria
    )

    const datiSottocategoria = useAppSelector(
        (state) => state.venditeTabelle.data.datiSottocategoria
    )

    const onSubmit = (
        formValue: FormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        setSubmitting(true)
        const { sottocategoria, descrizione,id_sottocategoria } = formValue
        
        if(id_sottocategoria === null){
            let values = {
                sottocategoria,
                descrizione,
                id_categoria,
                id_sottocategoria
            }
            dispatch(insertSottocategoria(values))
        }else{
            id_categoria = formValue.id_categoria
            let values = {
                sottocategoria,
                descrizione,
                id_sottocategoria,
                id_categoria,
            }

            dispatch(updateSottocategoria(values))
        }
        
        setTimeout(() => {
            dispatch(getSottocategorie(id_categoria))
        }, 128);
        
        dispatch(toggleNewSottocategoriaDialog(false))
        toast.push(
            <Notification
                title="Sottocategoria inserita con successo."
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
                sottocategoria:datiSottocategoria.sottocategoria,
                descrizione:datiSottocategoria.descrizione,
                id_sottocategoria: datiSottocategoria.id_sottocategoria,
                id_categoria: datiSottocategoria.id_categoria
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
                            label="Sottocategoria"
                            invalid={errors.sottocategoria && touched.sottocategoria}
                            errorMessage={errors.sottocategoria}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="sottocategoria"
                                placeholder="Sottocategoria..."
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
                                placeholder="Descrizione..."
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

export default NewSottocategorieForm
