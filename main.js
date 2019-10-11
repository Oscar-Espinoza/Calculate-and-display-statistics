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

function createHagTable(data) {

    dataMembers = data.results[0].members;
    getTotalOf = (party) => {

    }

    let HagData = {
            'Republicans': {
                'Total':
            }
        },
        'Democrats': {

        },
        'Independents': {

        }
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
document.getElementById("HagTable").innerHTML = table;
}