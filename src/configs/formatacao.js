

    export function formatarMoeda($valor){
        let moeda = Number($valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
         return moeda
    }