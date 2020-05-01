$(document).ready(function(){
    var bConfirmed = document.getElementById('confirmedCases');
    var bDeaths = document.getElementById('deaths');
    var bRecovered = document.getElementById('recovereds');
    var card = document.getElementById('cardBody');
    var datetime = new Date();
    var date = datetime.getDate();
    var month = datetime.getMonth();
    var year = datetime.getFullYear();
    var selectCountry = document.querySelector('#selectCountry');
    var paisName = document.getElementById('paisName');
    var dateString = year + "-0" + (month + 1) + "-" + date; 
    var dateStringFrom = year + "-0" + (month+1) + "-" + (date-1);
    console.log("La fecha de hoy es " + dateString);
    
    obtainInfo("argentina");

    $('#selectCountry').change(function(){
        var id = $(this).val();
        obtainInfo(id)
        console.log("Obteniendo datos para: "+id);
        var nombre =  $("#selectCountry option:selected").html();
        paisName.innerHTML = nombre;
    })
    
    function obtainInfo(country){
        var str = 'https://api.covid19api.com/country/'+country+'?from='+dateStringFrom+'T00:00:00Z&to='+dateString+'T00:00:00Z';
        $.get(str, function(response) { 
            var data = response[0];
            console.log("Obteniendo datos para "+country);
            if (data){
                //Existe el usuario:
                bConfirmed.innerHTML = data.Confirmed;
                bDeaths.innerHTML = data.Deaths;
                bRecovered.innerHTML = data.Recovered;
            }
            else{
              //No existe el usuario...
            console.log("ERROR WITH COVID19 API");
            }
          });
    }
    
})

function getCountries(){
    var str = '';
    var aC = [];
        $.get('https://api.covid19api.com/countries', function(response) { 
        var data = response.data;
        console.log(data);
        /*let result = data.map(a => a.Country);
        //console.log(result)
        for(var i; i < result.length; i++){
            aC.push(result[i]);
        } */
        return aC;
    })
    return aC;
}