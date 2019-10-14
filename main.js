function createTable(data) {
    dataMembers = data.results[0].members;

    let memberProperties = {
        'First name': 'first_name',
        'Middle name': 'middle_name',
        'Last name': 'last_name',
        'Party': 'party',
        'State': 'state',
        'Seniority': 'seniority',
        'Votes with party pct': 'votes_with_party_pct'
    };

    let tableHead = "<tr>";
    let table;
    for (let propertyName in memberProperties) {
        tableHead += "<th>" + propertyName + "</th>";
    }

    dataMembers.forEach(member => {

        if (member.middle_name == null) {
            member.middle_name = "";
        }

        member.votes_with_party_pct = member.votes_with_party_pct.toString() + " %";
        member.first_name = "<a href='" + member.url + "' target='_blank'>" + member.first_name + "</a>";

        table += "<tr>";
        for (let property in memberProperties) {
            table = table + "<td>" + member[memberProperties[property]] + "</td>";
        }
        table += "</tr>";
    });

    table = tableHead + table;
    document.getElementById("senate-data").innerHTML = table;
}

function getGlanceData(members){

    let glanceData = {
      'Republicans':{
        'party': 'Republicans',
        'total': 0,
        'votesWithParty': 0},
      'Democrats':{
        'party': 'Democrats',
        'total': 0,
        'votesWithParty': 0},
      'Independents':{
        'party':'Independents',
        'total': 0,
        'votesWithParty': 0},
      'Total':{
        'party': 'Total',
        'total': 0,
        'votesWithParty':0,
      }
    }

    const {Republicans, Democrats, Independents, Total} = glanceData

    members.forEach(member => {
      switch (member.party) {
        case 'D':
          Democrats.total += 1;
          Democrats.votesWithParty += member.votes_with_party_pct;
        break;

        case 'R':
          Republicans.total += 1;
          Republicans.votesWithParty += member.votes_with_party_pct;
        break;

        default:
          Independents.total += 1;
          Independents.votesWithParty += member.votes_with_party_pct;
        break;
      }
    })

    for (let party in glanceData){
      if (glanceData[party].total != 0) {
        glanceData[party].votesWithParty /= glanceData[party].total  
      }      
    }
    
    Total.total = Independents.total + Democrats.total + Republicans.total
    Total.votesWithParty = Independents.votesWithParty + Democrats.votesWithParty + Republicans.votesWithParty

    return glanceData
}

function createGlanceTable(data) {

  const dataMembers = data.results[0].members;
  const tableData = getGlanceData(dataMembers);
  let tableHead = "<tr>";
  let tableProperties = {
        'Party': 'party',
        'Number of Representants': 'total',
        '% Votes with party': 'votesWithParty'
    };

  for (let propertyName in tableProperties) {
      tableHead += "<th>" + propertyName + "</th>";
  }

  tableHead+="</tr>";

let table = "";

for (party in tableData){  
  table+="<tr>";
  for(let property in tableProperties){
    property = tableProperties[property];
    table += `<td>${tableData[party][property]}`;
  }
  table+="</tr>";
}

table = tableHead + table;
document.getElementById("GlanceTable").innerHTML = table;
}