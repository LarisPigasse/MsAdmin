import { useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import Select from '@/components/ui/Select'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import { apiGetSottocategorie } from '@/services/CategorieSottocategorieService';

type Options = {
    label: string
    value: string
}[]

type FormFieldsName = {
    id_categoria : Options
    id_sottocategoria : Options
}

type FieldSottocategorie = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        [key: string]: unknown
    }
    id_categoria: any
}

const FieldSottocategorie = (props: FieldSottocategorie) => {
    const { touched, errors, values, id_categoria } = props
   
    const [sottocategorie, setSottocategorie] = useState([ { label : 'Predefinita', value: 0} ]);
    const getSottocategorie = async (id : any)=>{
        let response = await apiGetSottocategorie(id);
        let data :any = await response.data;
         let _sottocat = await data.map(
             (sottocat : any) => ( { label : sottocat.sottocategoria, value: sottocat.id_sottocategoria} )
         )
             console.log(_sottocat)
         setSottocategorie(_sottocat)
    }

    useEffect(() => {
        getSottocategorie(id_categoria);
    }, [])
    

    return (
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
                            options={sottocategorie}
                            value={sottocategorie.filter(
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
    )
}

export default FieldSottocategorie
