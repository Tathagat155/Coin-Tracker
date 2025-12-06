async function getData() {
       const data=await fetch(" https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
        return data.json();
}
     
   function renderTable(arr){
              const table_body=document.querySelector("tbody")
              table_body.innerHTML="";
              arr.forEach(item=> {
                table_body.innerHTML+=`
                <tr>
                <td  class="img"><img width="30px"src="${item.image}">  ${item.name}</td>
                <td>${item.symbol.toUpperCase()}</td>
                <td>${item.current_price}</td>
                <td>${item.total_volume}</td>
                <td style="color:${item.market_cap_change_percentage_24h <0?'red':'green'}">${item.market_cap_change_percentage_24h}</td>
                <td>${item.market_cap}</td>
                </tr>
                `
              });
               
           }
    
     getData().then((data)=>{
        let arr=data;
        renderTable(arr);
        });

      const btn1=document.getElementById("btn1");
      const btn2=document.getElementById("btn2");
      const input=document.querySelector("input")
      btn1.addEventListener("click",sortPercentageCall)
      btn2.addEventListener("click",sortMarketCapCall)
      input.addEventListener("input",sortInputCall)
      async function sortPercentageCall(){
               const arr=await getData();
        sortPercentage(arr);   
      }

   function sortPercentage(arr){
       const sortedarr=[...arr].sort((a,b)=>a.market_cap_change_percentage_24h - b.market_cap_change_percentage_24h);
       renderTable(sortedarr)
   }
    function sortMarketCapCall(){
        getData().then((data)=>{
        sortMarketCap(data);
        });
   }
   function sortMarketCap(data){
      const sortedarr=[...data].sort((a,b)=>a.market_cap-b.market_cap);
      renderTable(sortedarr);
   }
    function sortInputCall(){
       getData().then((data)=>{
        sortInput(data);
        });
    }

    function sortInput(arr){
    let text = input.value.trim().toLowerCase();
    if (!text) {
        renderTable(arr); 
        return;
    }

    // Har item ka score calculate karenge
    const scored = arr.map(item => {
        let name = item.name.toLowerCase();
        let symbol = item.symbol.toLowerCase();
        let score = 0;

        // Exact match highest
        if (name === text || symbol === text) score = 100;

        // Starts with (good match)
        else if (name.startsWith(text) || symbol.startsWith(text)) score = 70;

        // Contains inside (medium match)
        else if (name.includes(text) || symbol.includes(text)) score = 40;

        // No match (0)
        return { ...item, score };
    });

    // Ab score ke base par descending sort
    scored.sort((a, b) => b.score - a.score);

    renderTable(scored);
}

    










