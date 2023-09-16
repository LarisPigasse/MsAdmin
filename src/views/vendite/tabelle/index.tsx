import Tabs from '@/components/ui/Tabs'
import AliquoteTable from './components/AliquoteTable'
import VariantiTable from './components/VariantiTable'
import CategorieTable from './components/CategorieTable'
import OperatoriTable from './components/OperatoriTable'
import CategoriaTest from './components/CategoriaTest'

const { TabNav, TabList, TabContent } = Tabs

const Tabelle = () => {
    return (
        <div>
            <div className="flex flex-col gap-4 text-lg font-bold border-b pb-8">Tabelle di base modulo vendite</div>
            <Tabs defaultValue="tabCategorie">
                <TabList>
                    <TabNav value="tabCategorie">Categorie</TabNav>
                    <TabNav value="tabVarianti">Varianti</TabNav>
                    <TabNav value="tabAliquote">Aliquote</TabNav>
                    <TabNav value="tabProva">Prova</TabNav>
                </TabList>
                <div className="p-4">
                    <TabContent value="tabCategorie">
                        <CategorieTable/>
                    </TabContent>
                    <TabContent value="tabVarianti">
                        <VariantiTable/>
                    </TabContent>
                    <TabContent value="tabAliquote">
                        <AliquoteTable/>
                    </TabContent>
                    <TabContent value="tabProva">
                        <CategoriaTest/>
                    </TabContent>
                </div>
            </Tabs>
        </div>
    )
}


export default Tabelle