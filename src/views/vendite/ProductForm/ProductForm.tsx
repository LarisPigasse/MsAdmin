import { forwardRef, useState } from 'react'
import { FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import hooks from '@/components/ui/hooks'
import StickyFooter from '@/components/shared/StickyFooter'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Form, Formik, FormikProps, Field } from 'formik'
import BasicInformationFields from './BasicInformationFields'
import PricingFields from './PricingFields'
import OrganizationFields from './OrganizationFields'
import ArticoliFields from './ArticoliFields'
import ProductImages from './ProductImages'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type FormikRef = FormikProps<any>

type InitialData = {
    file?: string | null ,
    uuid_prodotto?: string,
    prodotto?: string,
    descrizione?: string,
    scheda?: string,
    tipo?: string,
    tags?: string,
    codice?: number,
    sku?: number,
    id_categoria?: number,
    id_sottocategoria?: number,
    id_produttore?: number,
    id_aliquota?: number,
    stato?: string,
    prezzo_listino?: number,
    prezzo_offerta?: number,
    prezzo_minimo?: number,
    note?: string
    img?: string
    imgList?: {
        id: string
        name: string
        img: string
    }[]
}

export type FormModel = Omit<InitialData, 'tags'> & {
    tags: { label: string; value: string }[] | string[]
}

export type SetSubmitting = (isSubmitting: boolean) => void

export type OnDeleteCallback = React.Dispatch<React.SetStateAction<boolean>>

type OnDelete = (callback: OnDeleteCallback) => void

type ProductForm = {
    initialData?: InitialData
    type: 'edit' | 'new'
    onDiscard?: () => void
    onDelete?: OnDelete
    onFormSubmit: (formData: any, setSubmitting: SetSubmitting) => void
}

const { useUniqueId } = hooks

const validationSchema = Yup.object().shape({
    prodotto: Yup.string().required('Il nome del prodotto è necessario'),
    descrizione: Yup.string().required('La descrizione è necessaria'),
    codice: Yup.number().required('Il codice del prodotto è necessario'),
})

const DeleteProductButton = ({ onDelete }: { onDelete: OnDelete }) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    const onConfirmDialogOpen = () => {
        setDialogOpen(true)
    }

    const onConfirmDialogClose = () => {
        setDialogOpen(false)
    }

    const handleConfirm = () => {
        onDelete?.(setDialogOpen)
    }

    return (
        <>
            <Button
                className="text-red-600"
                variant="plain"
                size="sm"
                icon={<HiOutlineTrash />}
                type="button"
                onClick={onConfirmDialogOpen}
            >
                Delete
            </Button>
            <ConfirmDialog
                isOpen={dialogOpen}
                type="danger"
                title="Delete product"
                confirmButtonColor="red-600"
                onClose={onConfirmDialogClose}
                onRequestClose={onConfirmDialogClose}
                onCancel={onConfirmDialogClose}
                onConfirm={handleConfirm}
            >
                <p>
                    Sei sicuro di voler eliminare questo prodotto? Anche tutti i record relativi
                    saranno eliminati. Questa azione non può essere annullata.
                </p>
            </ConfirmDialog>
        </>
    )
}

const ProductForm = forwardRef<FormikRef, ProductForm>((props, ref) => {
    const {
        type,
        initialData = {
            file:[],
            uuid_prodotto: '',
            prodotto: '',
            descrizione: '',
            scheda: '',
            tipo: '',
            tags: '',
            codice: 0,
            sku: 0,
            img: '',
            imgList: [],
            id_categoria: 0,
            id_sottocategoria: 0,
            id_produttore: 0,
            id_aliquota: 1,
            stato: '',
            prezzo_listino: 0,
            prezzo_offerta: 0,
            prezzo_minimo: 0,
            note: ''
        },
        onFormSubmit,
        onDiscard,
        onDelete,
    } = props

    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={{
                    ...initialData
                    // tags: initialData?.tags
                    //     ? initialData.tags.map((value) => ({
                    //           label: value,
                    //           value,
                    //       }))
                    //     : [],
                }}
                validationSchema={validationSchema}
                onSubmit={(values: any, { setSubmitting }) => {
                    const formData = cloneDeep(values)

                    let dati : any = new FormData();
                    for (const [key, value] of Object.entries(values)) {
                        dati.append(key, value);
                    }

                    let _files = values?.file ?? 0 ;

                    if(_files.length>0){
                        for (let i = 0; i < _files.length; i++) {
                            dati.append(`file[]`, _files[i]);
                        }
                    }

                    // values.imgList.forEach((file : any, index : any) => {

                    //     const blob = new Blob([JSON.stringify(file)], { type: 'application/json' });

                    //     dati.append(`file[]`, blob);

                    //     console.log(blob)
                    // });

                    // formData.tags = formData.tags.map((tag) => {
                    //     if (typeof tag !== 'string') {
                    //         return tag.value
                    //     }
                    //     return tag
                    // })
                    if (type === 'new') {
                        //formData.id = newId
                        if (formData.imgList && formData.imgList.length > 0) {
                            formData.img = formData.imgList[0].img
                        }
                    }
                    onFormSubmit?.(dati, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting, handleChange, setFieldValue }) => (
                    <Form encType="multipart/form-data" >
                        <FormContainer>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2">
                                    <BasicInformationFields
                                        touched={touched}
                                        errors={errors}
                                    />
                                    <PricingFields
                                        touched={touched}
                                        errors={errors}
                                    />
                                    <OrganizationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    />
                                    <ArticoliFields
                                        touched={touched}
                                        errors={errors}
                                    />
                                </div>
                                <div className="lg:col-span-1">
                                    <ProductImages values={values} />
                                </div>
                            </div>
                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
                                <div>
                                    {type === 'edit' && (
                                        <DeleteProductButton
                                            onDelete={onDelete as OnDelete}
                                        />
                                    )}
                                </div>
                                <div className="md:flex items-center">
                                    <Button
                                        size="sm"
                                        className="ltr:mr-3 rtl:ml-3"
                                        type="button"
                                        onClick={() => onDiscard?.()}
                                    >
                                        Annulla
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        loading={isSubmitting}
                                        icon={<AiOutlineSave />}
                                        type="submit"
                                    >
                                        Salva
                                    </Button>
                                </div>
                            </StickyFooter>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
})

ProductForm.displayName = 'ProductForm'

export default ProductForm
