import moment from 'moment';

function parseCompaniesJSON(companiesList, selectedDate) {
    let selectedCompanies = [];
    let counter = 0;

    for(let i = 0; i < companiesList.length; i++) {
      counter++;
        let obj = companiesList[i];
        // https://momentjs.com/docs/#/query/is-same/
        if(moment(selectedDate).isSame(obj.registrationDate, 'day')) {
            selectedCompanies.push(obj);
        }
    }

    if(companiesList.length === counter) {
        return selectedCompanies;
    } else {
        console.log("List not parsed fully");
    }

}

const Helper = { parseCompaniesJSON };
export default Helper;
