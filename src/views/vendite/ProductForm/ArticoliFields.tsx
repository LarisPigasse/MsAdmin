import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'

type FormFieldsName = {
    prezzo_listino: number
    prezzo_offerta: number
    prezzo_minimo: number
    note: string
}

type ArticoliFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
}

const ArticoliFields = (props: ArticoliFields) => {
    const { touched, errors } = props

    return (
        <AdaptableCard divider className="mb-4">
            <h5>Articoli fields (listino, offerta, minimo, note)</h5>
            <p className="mb-6">Sezione per configurare le informazioni basilari del prodotto</p>
            <FormItem
                label="prezzo_listino"
                invalid={(errors.prezzo_listino && touched.prezzo_listino) as boolean}
                errorMessage={errors.prezzo_listino}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="prezzo_listino"
                    placeholder="prezzo_listino"
                    component={Input}
                />
            </FormItem>

            <FormItem
                label="prezzo_offerta"
                invalid={(errors.prezzo_offerta && touched.prezzo_offerta) as boolean}
                errorMessage={errors.prezzo_offerta}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="prezzo_offerta"
                    placeholder="prezzo_offerta"
                    component={Input}
                />
            </FormItem>

            <FormItem
                label="prezzo_minimo"
                invalid={(errors.prezzo_minimo && touched.prezzo_minimo) as boolean}
                errorMessage={errors.prezzo_minimo}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="prezzo_minimo"
                    placeholder="prezzo_minimo"
                    component={Input}
                />
            </FormItem>

            <FormItem
                label="note"
                invalid={(errors.note && touched.note) as boolean}
                errorMessage={errors.note}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="note"
                    placeholder="note"
                    component={Input}
                />
            </FormItem>
        </AdaptableCard>
    )
}

export default ArticoliFields
