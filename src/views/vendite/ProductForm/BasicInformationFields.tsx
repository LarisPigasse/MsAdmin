import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'

type FormFieldsName = {
    prodotto: string
    codice: string
    descrizione: string
}

type BasicInformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
}

const BasicInformationFields = (props: BasicInformationFields) => {
    const { touched, errors } = props

    return (
        <AdaptableCard divider className="mb-4">
            <h5>Informazioni di base (prodotto, descrizione e codice)</h5>
            <p className="mb-6">Sezione per configurare le informazioni basilari del prodotto</p>
            <FormItem
                label="Nome"
                invalid={(errors.prodotto && touched.prodotto) as boolean}
                errorMessage={errors.prodotto}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="prodotto"
                    placeholder="Prodotto"
                    component={Input}
                />
            </FormItem>

            <FormItem
                label="Codice univoco"
                invalid={(errors.codice && touched.codice) as boolean}
                errorMessage={errors.codice}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="codice"
                    placeholder="Codice prodotto"
                    component={Input}
                />
            </FormItem>
            
            <FormItem
                label="Descrizione"
                labelClass="!justify-start"
                invalid={(errors.descrizione && touched.descrizione) as boolean}
                errorMessage={errors.descrizione}
            >
                <Field name="descrizione">
                    {({ field, form }: FieldProps) => (
                        <RichTextEditor
                            value={field.value}
                            onChange={(val) =>
                                form.setFieldValue(field.name, val)
                            }
                        />
                    )}
                </Field>
            </FormItem>
        </AdaptableCard>
    )
}

export default BasicInformationFields
