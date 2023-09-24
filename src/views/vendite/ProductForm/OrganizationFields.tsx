import { useEffect, useState } from 'react'
import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Select from '@/components/ui/Select'
import CreatableSelect from 'react-select/creatable'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'

import { apiGetCategorie,apiGetSottocategorie } from '@/services/CategorieSottocategorieService';
import { apiGetAliquote, apiGetProduttori } from '@/services/HelperService';

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

const OrganizationFields = (props: OrganizationFieldsProps) => {
    
    const [categorie, setCategorie] = useState([ { label : 'Predefinita', value: 0} ]);
    const [sottocategorie, setSottocategorie] = useState([ { label : 'Predefinita', value: 0} ]);
    const [aliquote, setAliquote] = useState([ { label : 'Predefinita', value: 0} ]);
    const [produttori, setProduttori] = useState([ { label : '', value: 0} ]);

    const initComponente =  async () => {

        let response = await apiGetAliquote();
        let data : any = await response.data;

        let _aliquote = await data.map(
            (iva : any) => ( { label : iva.aliquota, value: iva.id_aliquota} )
        )

        setAliquote(_aliquote)

        response = await apiGetCategorie();
        data = await response.data;
        
        let _categorie = await data.map(
            (category : any) => ( { label : category.categoria, value: category.id_categoria} )
        )

        setCategorie(_categorie)

        response = await apiGetProduttori();
        data = await response.data;
        
        let _produttori = await data.map(
            (pro : any) => ( { label : pro.produttore, value: pro.id_produttore} )
        )

        setProduttori(_produttori)
    }

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
        initComponente();
    }, [])
    
    const { 
            values = {
                id_categoria: [], 
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
                                    options={categorie}
                                    value={categorie.filter(
                                        (category : any) =>
                                            category.value === values.id_categoria
                                    )}
                                    onChange={(option) =>
                                        {
                                            getSottocategorie(option?.value)
                                            return form.setFieldValue(
                                                field.name,
                                                option?.value
                                            )
                                        }
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
