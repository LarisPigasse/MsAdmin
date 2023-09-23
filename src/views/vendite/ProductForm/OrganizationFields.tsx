import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import CreatableSelect from 'react-select/creatable'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'

type Options = {
    label: string
    value: string
}[]

type FormFieldsName = {
    id_categoria : string
    id_sottocategoria : Options
    id_produttore : Options
    id_aliquota : Options
}

type OrganizationFieldsProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        tags: Options
        [key: string]: unknown
    }
}

const categories = [
    { label: 'Abbigliamento uomo', value: 1 },
    { label: 'Abbigliamento donna', value: 2 },
    { label: 'Abbigliamento bambino', value: 3 },
    { label: 'Sport e tempo libero', value: 4 },
    { label: 'Altro', value: 5 },
]

const aliquote = [
    { label: 'IVA 22%', value: 22 },
    { label: 'IVA 10%', value: 10 },
    { label: 'IVA 4%', value: 4 }
]

const produttori = [
    { label: 'Produttore 1', value: 1 },
    { label: 'Produttore 2', value: 2 },
    { label: 'Produttore 3', value: 3 }
]

const tags = [
    { label: 'trend', value: 'trend' },
    { label: 'unisex', value: 'unisex' },
]

const OrganizationFields = (props: OrganizationFieldsProps) => {
    const { 
            values = {
                id_categoria: '', 
                id_sottocategoria: [],
                id_produttore: [],
                id_aliquota: [],
         }, touched, errors 
    } = props

    return (
        <AdaptableCard divider isLastChild className="mb-4">
            <h5>Altre info (id_categoria,id_sottocategoria,id_produttore,id_aliquota)</h5>
            <p className="mb-6">Sezione per configurare altre caratteristiche del prodotto</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Categoria"
                        invalid={
                            (errors.id_categoria && touched.id_categoria) as boolean
                        }
                        errorMessage={errors.id_categoria}
                    >
                        <Field name="id_categoria">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={categories}
                                    value={categories.filter(
                                        (category) =>
                                            category.value === values.id_categoria
                                    )}
                                    onChange={(option) =>
                                        form.setFieldValue(
                                            field.name,
                                            option?.value
                                        )
                                    }
                                />
                            )}
                        </Field>
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Sottocategoria"
                        invalid={
                            (errors.id_sottocategoria && touched.id_sottocategoria) as unknown as boolean
                        }
                        errorMessage={errors.id_sottocategoria as string}
                    >
                        <Field name="id_sottocategoria">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    componentAs={CreatableSelect}
                                    field={field}
                                    form={form}
                                    options={categories}
                                    value={categories.filter(
                                        (category) =>
                                            category.value === values.id_sottocategoria
                                    )}
                                    onChange={(option) =>
                                        form.setFieldValue(
                                            field.name,
                                            option?.value
                                        )
                                    }
                                />
                            )}
                        </Field>
                    </FormItem>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Produttore"
                        invalid={
                            (errors.id_produttore && touched.id_produttore) as unknown as boolean
                        }
                        errorMessage={errors.id_produttore as string}
                    >
                        <Field name="id_produttore">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    componentAs={CreatableSelect}
                                    field={field}
                                    form={form}
                                    options={produttori}
                                    value={produttori.filter(
                                        (produttore) =>
                                            produttore.value === values.id_produttore
                                    )}
                                    onChange={(option) =>
                                        form.setFieldValue(
                                            field.name,
                                            option?.value
                                        )
                                    }
                                />
                            )}
                        </Field>
                    </FormItem>
                </div>
                <div className="col-span-1">
                <FormItem
                        label="Aliquota"
                        invalid={
                            (errors.id_aliquota && touched.id_aliquota) as unknown as boolean
                        }
                        errorMessage={errors.id_aliquota as string}
                    >
                        <Field name="id_aliquota">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    componentAs={CreatableSelect}
                                    field={field}
                                    form={form}
                                    options={aliquote}
                                    value={aliquote.filter(
                                        (aliquota) =>
                                            aliquota.value === values.id_aliquota
                                    )}
                                    onChange={(option) =>
                                        form.setFieldValue(field.name, option?.value)
                                    }
                                />
                            )}
                        </Field>
                    </FormItem>
                </div>
            </div>
        </AdaptableCard>
    )
}

export default OrganizationFields
