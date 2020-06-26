$(document).ready(function() {
  $('#send').click(function(e) {
    e.preventDefault();
    var grad = $('#grad_value').val();
    if (grad !== '') {
      $.ajax({
        type: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + grad + '&appid=f7b256b67b8cabbff6f83b5e91572bad&units=metric',
        dataType: 'jsonp',
        success: function(response)
        {
          main(response);
        }
      })
    }
  });
});

function main(data)
{
  console.log(data);
  var niz=data.list,
    danas=new Date(),
    duzinaNiza=niz.length
    sutraVrijeme=[],
    prekosutraVrijeme=[],
    zakosutraVrijeme=[],
    cetvrtiDanVrijeme=[],
    petiDanVrijeme=[],
    brojacTaba=1,
    tabs=$("#tabs");//Izabere sve tabove i HTMLa(svaki TAB je DIV)
  danas=danas.getDate();//Postavlja danasni dan, koji ce se kasnije sluziti za poredenje
  for (var i=0; i<duzinaNiza;i++) 
  {
    var danasPrognoza=niz[i].dt_txt.split(" ")[0];//dobije se dan prognoze
    danasPrognoza=danasPrognoza.split('-')[2];//dobije se dan prognoze
    if(danas!=danasPrognoza)//Uslov da ignorise danasnji dan
    {
      if(danasPrognoza==danas+1) sutraVrijeme.push(niz[i]);
      if(danasPrognoza==danas+2) prekosutraVrijeme.push(niz[i]);
      if(danasPrognoza==danas+3) zakosutraVrijeme.push(niz[i]);
      if(danasPrognoza==danas+4) cetvrtiDanVrijeme.push(niz[i]);
      if(danasPrognoza==danas+5) petiDanVrijeme.push(niz[i]);
    }
    //console.log(sutraVrijeme);
  }
  function vratiSate(vrijeme)
  {
    var sat=vrijeme.split(" ")[1];//dobije se dan prognoze
    sat=sat.split(':')[0];
    return sat;
  }

  function tabele(dan) 
  {
    //Uzme tab, ide redosljedom, (tab1, tab2...)
    var tab="#tabs-"+brojacTaba;
    tab=$(tab),
    duzina=dan.length;
    //////////////////////////////////////////////
    var table=$("<table class='table table-hover'></table>"),//Napravi tabelu
    //Postavlja head tabele, i appenda
        tableHead=$("<thead></thead>"),
        tableHeadRow=$("<tr></tr>"),
        tableHeadRowSat=$("<th>Sat</th>"),
        tableHeadRowPrognoza=$("<th>Prognoza</th>"),
        tableHeadRowTemp=$("<th>Temperatura</th>"),
        tableHeadRowVlaznost=$("<th>Vlaznost</th>"),
        tableHeadRowVjetar=$("<th>Vjetar</th>");

    $(tableHeadRow).append(tableHeadRowSat);
    $(tableHeadRow).append(tableHeadRowPrognoza);
    $(tableHeadRow).append(tableHeadRowTemp);
    $(tableHeadRow).append(tableHeadRowVlaznost);
    $(tableHeadRow).append(tableHeadRowVjetar);
    $(tableHead).append(tableHeadRow);
    $(table).append(tableHead);
    ////////////////////////////////////////////
    var tableBody=$("<tbody></tbody>");
    for (var i=0;i<duzina;i++)
    {
      var redPodataka=$("<tr></tr>"),
          satSadrzaj=$("<td></td>"),
          prognozaSadrzaj=$("<td></td>"),
          tempSadrzaj=$("<td></td>"),
          vlaznostSadrzaj=$("<td></td>"),
          vjetarSadrzaj=$("<td></td>");

      var sat, prognoza, temp, vlaznost, vjetar;
      //Postavlja sate
      sat="<p>"+vratiSate(dan[i].dt_txt)+"</p>";
      satSadrzaj.append(sat);
      $(redPodataka).append(satSadrzaj);
      ////////////////
      //Postavlja sliku za prognozu
      prognoza=$("<img>");
      var linkSlike="https://openweathermap.org/img/w/" + dan[i].weather[0].icon + ".png";
      prognoza.attr(
      {
        "src":linkSlike,
        "width":50
      });
      $(prognozaSadrzaj).append(prognoza);
      $(redPodataka).append(prognozaSadrzaj);
      /////////////////////////////
      //Postavlja temperaturu
      temp="<p>"+Math.round(dan[i].main.temp)+"</p>";
      $(tempSadrzaj).append(temp);
      $(redPodataka).append(tempSadrzaj);
      /////////////////////////
      //Postavi vlaznost
      vlaznost="<p>"+dan[i].main.humidity+"%</p>";
      $(vlaznostSadrzaj).append(vlaznost);
      $(redPodataka).append(vlaznostSadrzaj);
      //////////////////
      //Postavlja vjetar
      var vjetarRotacija=0;
      vjetarRotacija=Math.round(dan[i].wind.deg);
      vjetarRotacija="rotate("+vjetarRotacija+"deg)";//Unaprijed postavi rotaciju vjetra
      vjetar="<img src='https://image.flaticon.com/icons/png/512/21/21207.png' style='width:50px;height:50px;transform:"+vjetarRotacija+"'>";
      //$(vjetar).css("transform",vjetarRotacija); Ne radi, loool
      vjetar=vjetar+"<br>"+dan[i].wind.speed+"m/s";
      $(vjetarSadrzaj).append(vjetar);
      $(redPodataka).append(vjetarSadrzaj);
      //////////////////
      $(tableBody).append(redPodataka);
    }

    $(table).append(tableBody);
    $(tab).append(table);//Doda tabelu u tab
    brojacTaba++;//Na kraju funkcije poveca brojac tabova, tako da moze pozvati iduci
  }
  tabele(sutraVrijeme);
  tabele(prekosutraVrijeme);
  tabele(zakosutraVrijeme);
  tabele(cetvrtiDanVrijeme);
  tabele(petiDanVrijeme);
}