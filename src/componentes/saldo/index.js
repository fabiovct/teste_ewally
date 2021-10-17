
import api from '../../service/api';
import { useEffect,useState } from 'react';



 function SaldoConta() {

    const [saldo, setSaldo] = useState([]);

    useEffect(() => {
    const data = {
        'token': localStorage['token'],
    };
        
    async function loadSaldo() {
        await api.get('account/balance',data ,{})
        .then(function(response){
            setSaldo(response.data)
        }).catch(err => {
            alert('Sessão expirada. Por favor faça login novamente')
            window.location.href = '/';
        })
        // console.log(response.data)
        
    }

    loadSaldo();

    },
    []
    )
    return saldo

}

export default SaldoConta;
