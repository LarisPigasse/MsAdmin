import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import {
    Field,
    FormikErrors,
    FormikTouched,
    FieldProps,
    FieldInputProps,
} from 'formik'
import type { ComponentType } from 'react'
import type { InputProps } from '@/components/ui/Input'

type FormFieldsName = {
    tipo: string
    scheda: string
    stato: string
    tags: string
    sku: string
}

type PricingFieldsProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
}

const PriceInput = (props: InputProps) => {
    return <Input {...props} value={props.field.value} prefix="$" />
}

const NumberInput = (props: InputProps) => {
    return <Input {...props} value={props.field.value} />
}

const TaxRateInput = (props: InputProps) => {
    return <Input {...props} value={props.field.value} />
}

const NumericFormatInput = ({
    onValueChange,
    ...rest
}: Omit<NumericFormatProps, 'form'> & {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    form: any
    field: FieldInputProps<unknown>
}) => {
    return (
        <NumericFormat
            customInput={Input as ComponentType}
            type="text"
            autoComplete="off"
            onValueChange={onValueChange}
            {...rest}
        />
    )
}

const PricingFields = (props: PricingFieldsProps) => {
    const { touched, errors } = props

    return (
        <AdaptableCard divider className="mb-4">
            <h5>(scheda, tipo, tags, sku, stato)</h5>
            <p className="mb-6">Sezione per configurare i parametri di vendita</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Sku"
                        invalid={(errors.sku && touched.sku) as boolean}
                        errorMessage={errors.sku}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="sku"
                            placeholder="sku"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Scheda"
                        invalid={(errors.scheda && touched.scheda) as boolean}
                        errorMessage={errors.scheda}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="scheda"
                            placeholder="scheda"
                            component={Input}
                        />
                    </FormItem>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="col-span-1 hidden">
                    <FormItem
                        label="Tipo"
                        invalid={(errors.tipo && touched.tipo) as boolean}
                        errorMessage={errors.tipo}
                    >
                        <Field name="tipo">
                            {({ field, form }: FieldProps) => {
                                return (
                                    <NumericFormatInput
                                        form={form}
                                        field={field}
                                        placeholder="tipo"
                                        customInput={
                                            NumberInput as ComponentType
                                        }
                                        onValueChange={(e) => {
                                            form.setFieldValue(
                                                field.name,
                                                e.value
                                            )
                                        }}
                                    />
                                )
                            }}
                        </Field>
                    </FormItem>
                </div>
                <div className="col-span-1 hidden">
                    <FormItem
                        label="stato"
                        invalid={(errors.stato && touched.stato) as boolean}
                        errorMessage={errors.stato}
                    >
                        <Field name="stato">
                            {({ field, form }: FieldProps) => {
                                return (
                                    <NumericFormatInput
                                        form={form}
                                        field={field}
                                        placeholder="stato"
                                        customInput={
                                            TaxRateInput as ComponentType
                                        }
                                        isAllowed={({ floatValue }) =>
                                            (floatValue as number) <= 100
                                        }
                                        onValueChange={(e) => {
                                            form.setFieldValue(
                                                field.name,
                                                e.value
                                            )
                                        }}
                                    />
                                )
                            }}
                        </Field>
                    </FormItem>
                </div>
            </div>
        </AdaptableCard>
    )
}

export default PricingFields
