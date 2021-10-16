
import api from '../../service/api';
import { useEffect,useState } from 'react';



 function SaldoConta() {

    const [saldo, setSaldo] = useState([]);

    useEffect(() => {
    const data = {
        'token': localStorage['token'],
    };
        
    async function loadSaldo() {
        const response = await api.get('account/balance', data, {

        });
        // console.log(response.data)
        setSaldo(response.data)
    }

    loadSaldo();

    },
    []
    )
    return saldo

}

export default SaldoConta;
