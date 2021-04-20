function orderAsc(dados){          
    return dados.sort(function(a, b){
        return (a.nome.trim().toLowerCase() > b.nome.trim().toLowerCase())?1
        :((b.nome.trim().toLowerCase() > a.nome.trim().toLowerCase())?-1
        :0);
      })
}
export default orderAsc;